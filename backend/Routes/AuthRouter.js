const { signup, login, Createroom, Joinroom, Roomfetch, getRoomDetails  } = require('../Controllers/AuthController');
const { signupValidation, loginValidation} = require('../Middlewares/AuthValidation');


const router = require('express').Router();

router.post('/login', loginValidation, login);
router.post('/signup', signupValidation, signup);
router.post('/createroom', Createroom);
router.post('/dashboard', Joinroom);

router.get('/createroom', Roomfetch)
router.get('/join/:roomId', getRoomDetails);


module.exports = router;