import React, { useEffect, useRef, useState } from 'react';
import SimplePeer from 'simple-peer';
import { useParams } from 'react-router-dom';


const VideoCall = () => {
  const { roomId } = useParams();
  const [peers, setPeers] = useState([]);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const userVideo = useRef();
  const peersRef = useRef([]);
  const userStream = useRef();

  useEffect(() => {
    // Get the user's media stream
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        userVideo.current.srcObject = stream;
        userStream.current = stream;

        // Emit event to join the room
        socket.emit("joinRoom", { roomId });

        // Handle current users in the room
        socket.on("allUsers", (users) => {
          const peers = [];
          users.forEach((userId) => {
            const peer = createPeer(userId, socket.id, stream);
            peersRef.current.push({
              peerID: userId,
              peer,
            });
            peers.push(peer);
          });
          setPeers(peers);
        });

        // Handle new user joining
        socket.on("userJoined", (payload) => {
          const peer = addPeer(payload.signal, payload.callerID, stream);
          peersRef.current.push({
            peerID: payload.callerID,
            peer,
          });
          setPeers((users) => [...users, peer]);
        });

        // Handle receiving a returned signal
        socket.on("receivingReturnedSignal", (payload) => {
          const item = peersRef.current.find((p) => p.peerID === payload.id);
          if (item) {
            item.peer.signal(payload.signal);
          }
        });

        // Handle user disconnect
        socket.on("userLeft", (userId) => {
          const peerObj = peersRef.current.find((p) => p.peerID === userId);
          if (peerObj) {
            peerObj.peer.destroy();
          }
          peersRef.current = peersRef.current.filter((p) => p.peerID !== userId);
          setPeers((users) => users.filter((peer) => peer !== peerObj.peer));
        });
      })
      .catch((error) => {
        console.error("Error accessing media devices:", error);
      });

    // Clean up connections on unmount
    return () => {
      socket.disconnect();
      userStream.current?.getTracks().forEach(track => track.stop());
      peersRef.current.forEach(({ peer }) => peer.destroy());
    };
  }, [roomId]);

  // Function to create a peer
  function createPeer(userToSignal, callerID, stream) {
    const peer = new SimplePeer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socket.emit("sendingSignal", { userToSignal, callerID, signal });
    });

    return peer;
  }

  // Function to add a peer
  function addPeer(incomingSignal, callerID, stream) {
    const peer = new SimplePeer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socket.emit("returningSignal", { signal, callerID });
    });

    peer.signal(incomingSignal);

    return peer;
  }

  // Toggle audio
  const toggleAudio = () => {
    const enabled = userStream.current.getAudioTracks()[0].enabled;
    userStream.current.getAudioTracks()[0].enabled = !enabled;
    setIsAudioMuted(!enabled);
  };

  // Toggle video
  const toggleVideo = () => {
    const enabled = userStream.current.getVideoTracks()[0].enabled;
    userStream.current.getVideoTracks()[0].enabled = !enabled;
    setIsVideoMuted(!enabled);
  };

  return (
    <div>
      <div className="controls">
        <button onClick={toggleAudio}>{isAudioMuted ? "Unmute Audio" : "Mute Audio"}</button>
        <button onClick={toggleVideo}>{isVideoMuted ? "Turn On Video" : "Turn Off Video"}</button>
      </div>
      <video ref={userVideo} autoPlay playsInline muted />
      {peers.map((peer, index) => (
        <Video key={index} peer={peer} />
      ))}
    </div>
  );
};

const Video = ({ peer }) => {
  const ref = useRef();

  useEffect(() => {
    peer.on("stream", (stream) => {
      ref.current.srcObject = stream;
    });
  }, [peer]);

  return <video ref={ref} autoPlay playsInline />;
};

export default VideoCall;
