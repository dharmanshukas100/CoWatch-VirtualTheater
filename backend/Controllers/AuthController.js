const bcrypt = require('bcryptjs');
const UserModel = require("../Models/User");
const Room = require("../Models/Room");
const jwt = require('jsonwebtoken');
const crypto = require('crypto');


const signup = async (req, res) => {
    try {
        const { fname, lname, email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409)
                .json({ message: 'User is already exist, you can login', success: false });
        }
        const userModel = new UserModel({ fname, lname, email, password });
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201)
            .json({
                message: "Signup successfully",
                success: true
            })
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server errror",
                success: false
            })
    }
}


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        const errorMsg = 'Auth failed email or password is wrong';
        if (!user) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )

        res.status(200)
            .json({
                message: "Login Success",
                success: true,
                jwtToken,
                email,
                fname: user.fname,
                lname: user.lname    
            })
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server errror",
                success: false
            })
    }
}



function generateUniqueRoomId() {
  return crypto.randomBytes(8).toString('hex'); 
}


const Createroom =  async (req, res) => {
  const { roomName, platform, videoLink, creator } = req.body;
  const roomId = generateUniqueRoomId(); 

  try {
    const newRoom = new Room({
      roomId,
      roomName,
      platform,
      videoLink,
      members: [creator],
    });
    await newRoom.save();

    res.json({ roomId });
  } catch (error) {
    console.error('Error creating room:', error);
    res.status(500).json({ error: 'Failed to create room' });
  }
}




const Joinroom = async (req, res) => {
  const { roomId, userName } = req.body;

  try {
    // Find the user in the database based on their fname (userName)
    const user = await UserModel.findOne({ fname: userName });
    
    if (!user) {
      // If the user does not exist, return a 403 error
      return res.status(403).json({ error: 'User must have an account to join the room' });
    }

    // Find the room by roomId
    const room = await Room.findOne({ roomId });

    if (room) {
      // Check if the user is already in the room's members list
      if (!room.members.includes(user.fname)) {
        // Add user's fname to the members array if not already present
        room.members.push(user.fname);
        await room.save();
      }

      // Send response with updated members list
      res.json({ success: true, members: room.members });
    } else {
      // If the room is not found, return a 404 error
      res.status(404).json({ error: 'Room not found' });
    }
  } catch (error) {
    console.error('Error joining room:', error);
    res.status(500).json({ error: 'Failed to join room' });
  }
};



const Roomfetch = async (req, res) => {
try {
    const rooms = await Room.find();
    res.json(rooms);
} catch (error) {
    console.error('Error fetching rooms:', error);
    res.status(500).json({ error: 'Failed to fetch rooms' });
}
}



const getRoomDetails = async (req, res) => {
  const { roomId } = req.params;
  console.log('Room ID received:', roomId); // Log the roomId from the request

  try {
      // Find room by roomId in database
      const room = await Room.findOne({ roomId: roomId });
      console.log('Room found in database:', room); // Log the room object retrieved

      if (room) {
          console.log('Sending video link:', room.videoLink); // Log the videoLink being sent
          return res.json({ videoLink: room.videoLink }); // Returns YouTube link if room is found
      } else {
          console.log('Room not found in database'); // Log if room not found
          return res.status(404).json({ error: 'Room not found' });
      }
  } catch (error) {
      console.error('Error fetching room details:', error);
      return res.status(500).json({ error: 'Failed to fetch room details' });
  }
};




module.exports = {
    signup,
    login,
    Createroom,
    Joinroom,
    Roomfetch,
    getRoomDetails
}

