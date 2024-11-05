const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');

require('dotenv').config();
require('./Models/db');
const PORT = process.env.PORT || 5000;

app.get('/ping', (req, res) => {
    res.send('PONG');
});

const corsOptions = {
    origin: 'https://co-watch.vercel.app',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  };

app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use('/auth', AuthRouter);


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})