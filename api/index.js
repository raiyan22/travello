const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const User = require('./models/User.js');
const app = express();

const bcryptSalt = bcrypt.genSaltSync(8);

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
    // origin: 'http://127.0.0.1:5173',
}));

// mongo pass kIiHWJYo2vAfWoDU raiyan058
// console.log(process.env.MONGO_URL);

mongoose.connect(process.env.MONGO_URL);

app.get( '/test', (req, res) => {
    res.json('test ok');
}); 

app.post( '/register',  async(req, res) => {
    const {name, email, password} = req.body;
    
    try {
        const userDoc = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt),
        });
        res.json(userDoc);
    } catch(e) {
        res.status(422).json(e);
    }
}); 

app.post('/login', async (req, res) => {
    const {email, password} = req.body;
    const userDoc = await User.findOne(email);
    if( userDoc ) {
        res.json('found user');
        const passOK = bcrypt.compareSync(password, userDoc.password);
        if( passOK ) {
            res.json('password OK');
        } else {
            res.status(422).json('password NOT OK');
        }
    } else {
        res.json('not found');
    }
});

app.listen('4000');