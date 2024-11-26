// import React, { useEffect, useRef, useState } from "react";
// import socket from "../socket";
// import { useParams } from "react-router-dom";

// const VideoCall = ({ onToggleAudio, onToggleVideo }) => {
//   const { roomId } = useParams();
//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);
//   const [peerConnection, setPeerConnection] = useState(null);
//   const iceCandidateQueue = [];
//   const isNegotiating = useRef(false); // Track ongoing negotiations
  
//   useEffect(() => {
//     const pc = new RTCPeerConnection({
//       iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
//     });
//     setPeerConnection(pc);

//     // Local media setup
//     navigator.mediaDevices
//       .getUserMedia({ video: true, audio: true })
//       .then((stream) => {
//         localVideoRef.current.srcObject = stream;
//         stream.getTracks().forEach((track) => pc.addTrack(track, stream));
//         console.log("Local stream added.");
//       })
//       .catch((err) => console.error("Error accessing local media:", err));

//     // Remote stream setup
//     const remoteStream = new MediaStream();
//     remoteVideoRef.current.srcObject = remoteStream;
//     pc.ontrack = (event) => {
//       console.log("Remote track received.");
//       event.streams[0].getTracks().forEach((track) => {
//         if (!remoteStream.getTracks().includes(track)) {
//           remoteStream.addTrack(track);
//         }
//       });
//     };

//     // ICE Candidate event
//     pc.onicecandidate = (event) => {
//       if (event.candidate) {
//         console.log("Sending ICE candidate:", event.candidate);
//         socket.emit("iceCandidate", { roomId, candidate: event.candidate });
//       }
//     };

//     // Handle negotiation
//     pc.onnegotiationneeded = async () => {
//       if (isNegotiating.current) {
//         console.log("Skipping renegotiation due to ongoing negotiation.");
//         return;
//       }
//       isNegotiating.current = true;
//       try {
//         const offer = await pc.createOffer();
//         await pc.setLocalDescription(offer);
//         console.log("Offer created and sent.");
//         socket.emit("offer", { roomId, offer });
//       } catch (err) {
//         console.error("Error during negotiation:", err);
//       } finally {
//         isNegotiating.current = false;
//       }
//     };

//     // Handle incoming offer
//     socket.on("offer", async ({ offer }) => {
//       try {
//         await pc.setRemoteDescription(new RTCSessionDescription(offer));
//         console.log("Remote description set. Creating answer...");
//         const answer = await pc.createAnswer();
//         await pc.setLocalDescription(answer);
//         console.log("Answer created and sent.");
//         socket.emit("answer", { roomId, answer });
//       } catch (err) {
//         console.error("Error handling offer:", err);
//       }
//     });

//     // Handle incoming answer
//     socket.on("answer", async ({ answer }) => {
//       try {
//         await pc.setRemoteDescription(new RTCSessionDescription(answer));
//         console.log("Remote description set for answer.");
//       } catch (err) {
//         console.error("Error handling answer:", err);
//       }
//     });

//     // Handle incoming ICE candidates
//     socket.on("iceCandidate", async ({ candidate }) => {
//       try {
//         await pc.addIceCandidate(new RTCIceCandidate(candidate));
//         console.log("ICE candidate added.");
//       } catch (err) {
//         console.error("Error adding ICE candidate:", err);
//       }
//     });

//     // Cleanup on unmount
//     return () => {
//       if (pc) {
//         pc.close();
//         console.log("PeerConnection closed.");
//       }
//       socket.off("offer");
//       socket.off("answer");
//       socket.off("iceCandidate");
//     };
//   }, [roomId]);
  

  
  
//   return (
//     <div>
//       <video
//         ref={localVideoRef}
//         autoPlay
//         muted
//         style={{ width: "300px", border: "1px solid black" }}
//       />
//       <video
//         ref={remoteVideoRef}
//         autoPlay
//         style={{ width: "300px", border: "1px solid black" }}
//       />
//     </div>
//   );
// };

// export default VideoCall;
import React, { useEffect, useRef, useState } from "react";
import socket from "../socket";
import { useParams } from "react-router-dom";

const VideoCall = ({ isAudioEnabled, isVideoEnabled }) => {
  const { roomId } = useParams();
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [peerConnection, setPeerConnection] = useState(null);
  const [localStream, setLocalStream] = useState(null);
  const iceCandidateQueue = [];
  const isNegotiating = useRef(false);

  useEffect(() => {
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });
    setPeerConnection(pc);

    // Local media setup
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        localVideoRef.current.srcObject = stream;
        setLocalStream(stream);
        stream.getTracks().forEach((track) => pc.addTrack(track, stream));
        console.log("Local stream added.");
      })
      .catch((err) => console.error("Error accessing local media:", err));

    // Remote stream setup
    const remoteStream = new MediaStream();
    remoteVideoRef.current.srcObject = remoteStream;
    pc.ontrack = (event) => {
      console.log("Remote track received.");
      event.streams[0].getTracks().forEach((track) => {
        if (!remoteStream.getTracks().includes(track)) {
          remoteStream.addTrack(track);
        }
      });
    };

    // ICE Candidate event
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        console.log("Sending ICE candidate:", event.candidate);
        socket.emit("iceCandidate", { roomId, candidate: event.candidate });
      }
    };

    // Handle negotiation
    pc.onnegotiationneeded = async () => {
      if (isNegotiating.current) {
        console.log("Skipping renegotiation due to ongoing negotiation.");
        return;
      }
      isNegotiating.current = true;
      try {
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        console.log("Offer created and sent.");
        socket.emit("offer", { roomId, offer });
      } catch (err) {
        console.error("Error during negotiation:", err);
      } finally {
        isNegotiating.current = false;
      }
    };

    // Handle incoming offer
    socket.on("offer", async ({ offer }) => {
      try {
        await pc.setRemoteDescription(new RTCSessionDescription(offer));
        console.log("Remote description set. Creating answer...");
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        console.log("Answer created and sent.");
        socket.emit("answer", { roomId, answer });
      } catch (err) {
        console.error("Error handling offer:", err);
      }
    });

    // Handle incoming answer
    socket.on("answer", async ({ answer }) => {
      try {
        await pc.setRemoteDescription(new RTCSessionDescription(answer));
        console.log("Remote description set for answer.");
      } catch (err) {
        console.error("Error handling answer:", err);
      }
    });

    // Handle incoming ICE candidates
    socket.on("iceCandidate", async ({ candidate }) => {
      try {
        await pc.addIceCandidate(new RTCIceCandidate(candidate));
        console.log("ICE candidate added.");
      } catch (err) {
        console.error("Error adding ICE candidate:", err);
      }
    });

    // Cleanup on unmount
    return () => {
      if (pc) {
        pc.close();
        console.log("PeerConnection closed.");
      }
      socket.off("offer");
      socket.off("answer");
      socket.off("iceCandidate");
    };
  }, [roomId]);

  // Effect to toggle audio and video
  useEffect(() => {
    if (localStream) {
      localStream.getAudioTracks().forEach((track) => {
        track.enabled = isAudioEnabled;
      });
      localStream.getVideoTracks().forEach((track) => {
        track.enabled = isVideoEnabled;
      });
    }
  }, [isAudioEnabled, isVideoEnabled, localStream]);
  

  return (
    <div>
      <video
        ref={localVideoRef}
        autoPlay
        muted
        style={{ width: "175px", 'border-radius': "10px" }}
      />
      <video
        ref={remoteVideoRef}
        autoPlay
        style={{ width: "175px", 'border-radius': "10px" }}
      />
    </div>
  );
};

export default VideoCall;
