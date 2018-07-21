const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const massive = require('massive');
const axios = require('axios');

require('dotenv').config();
const bcrypt = require('bcrypt');
const numOfSaltRounds = 12;

massive(process.env.CONNECTION_STRING).then( db => {
    console.log('connected to database');
    app.set('db',db)}).catch(error => {
        console.log('-----massiveError', error)
    });

const app=express();
app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false
}))

app.get('/api/posts/:userid', (req,res)=>{
    if(!req.session.user){
        res.json(null);
        return;
    }
    req.app.get('db').read_posts(req.session.user).then(users => {
        res.json(users[0]);
    }).catch(error => {console.log('-----getpostError', error)});
        res.json({message: 'Server error'});
})

app.post('/api/users/register', (req,res) => {
    const db = req.app.get('db');
    const { username,password,profile_pic } = req.body;
    console.log('---reg.body',req.body);
    console.log(password);
    bcrypt.hash( password,numOfSaltRounds).then( hashedPassword => {
        console.log('hashedPassword', hashedPassword);
        db.create_user([username,hashedPassword,profile_pic]).then(response =>{
            console.log(response);
            req.session.user =  {username} ;
            res.json(req.session.user)
        }).catch(error => {
            console.log('-----registrationError', error);
            res.status(500).json({ message: 'Something bad happened!😭'+ error})
        })
    }).catch(err => console.log(err));
})


app.post('/api/users/login', (req,res) => {
    console.log('hit');
    const db = req.app.get('db');
    const { username,password } = req.body;
    console.log('req.body',req.body);
    db.find_user([username]).then(user => {
        console.log('user', user)
        if(user.length){
            bcrypt.compare(password,user[0].password).then( passwordsMatched => {
                console.log("password Matched",passwordsMatched);
                if(passwordsMatched) {
                    req.session.user = { username: user[0].username};
                    console.log('req.session',req.session.user);
                    res.json({ user: req.session.user});
                }else {
                    res.status(403).json({ message: 'Wrong Password' + error})
                }
            })
        }else{
            res.status(403).json({ message: 'Please register first.'})
        }
    }) 
})

app.post('/logout', (req,res)=> {
    req.session.destroy();
    res.status(200).send();
})



const PORT = 4000;
app.listen(PORT, ()=> console.log('server now listening on port '+ PORT + ' 😍'));