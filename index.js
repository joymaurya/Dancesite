const fs=require('fs');
const http=require('http');
const path=require('path');
const express=require('express');
const app=express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/joy', {useNewUrlParser: true});
const kittySchema = new mongoose.Schema({
    name: String,
    email: String,
    address: String,
    number: String
});
var site=mongoose.model('dancesite', kittySchema);
app.use('/static', express.static('static'));
app.set('view engine', 'pug');
app.use(express.urlencoded({ extended: false }));
app.set('views',path.join(__dirname,'views'));
port=80;
app.get('/',(req,res)=>{
    res.render('idk');
});
app.post('/',(req,res)=>{
    var k=new site(req.body);
    k.save().then(()=>{
      res.send("your data has been stored");
    }).catch(()=>{
        res.status(400).send("Not stored");
    })
});
app.get('/contact',(req,res)=>{
    res.render('contact');
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})