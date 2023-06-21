const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const User = require('./models/User.js');
const app = express();

const salt = bcrypt.genSaltSync(7);
const jwtSecret = 'fhsyhuier34574ff5t73f5th734ft74ft7n834f5h7';

app.use(express.json());
app.use(cookieParser());
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
            password:bcrypt.hashSync(password, salt),
        });
        res.json(userDoc);
    } catch(e) {
        res.status(422).json(e);
    }
}); 


app.post('/login', async (req, res)=> {
    const {email,password} = req.body;
    const userDoc = await User.findOne({email});
    if( userDoc ) {
        // res.json('found');
        const passOK = bcrypt.compareSync(password, userDoc.password);
        if( passOK ) {
            jwt.sign({
                email:userDoc.email, 
                id:userDoc._id, 
            }, jwtSecret, {}, (err, tokenn)=>{
                if (err) throw err;
                res.cookie('token', tokenn).json(userDoc);

            });
        } else {
            res.status(422).json('password NOT OK');
        }
    } else {
        res.json('not found');
    }
});
  

app.get('/profile', (req, res)=>{
    console.log(req)
    const {token} = req.cookies;
    if(token){
        jwt.verify(token, jwtSecret, {}, async (err, userData)=>{
            if(err) throw err;
            // const userDoc = await User.findById(userData.id);
            // res.json({userDoc});
            const {name, email, _id} = await User.findById(userData.id);
            res.json({name, email, _id});
        });
    } else {
        res.json(null);
    }
    // res.json({token});
});

app.listen('4000');