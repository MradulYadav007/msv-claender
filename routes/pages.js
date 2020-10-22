 const express=require("express");
 const router=express.Router();
const jwt=require("jsonwebtoken");
const jwt_decode = require('jwt-decode');
const mysql=require("mysql");

const db=mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.PASSWORD,
    database:process.env.DATABASE
});
 
 router.get('/',(req,res)=>{
     res.render('index');
 });

 router.get('/signup',(req,res)=>{
    res.render('signup');
});

router.get('/index',(req,res)=>{
    res.render('index');
});
router.get('/setreminder',(req,res)=>{
    res.render('setreminder');
});
router.get('/login',(req,res)=>{
    res.render('login');
});
router.get('/home', function(req, res, next) 
{

var cook=req.cookies['jwt'];
    var decoded = jwt_decode(cook);
    var user=decoded.id;
    var name={};
    console.log(user);
    
    db.query("SELECT * FROM users WHERE id = ?",[user],(error,data)=>{
        if(error){
            console.log(error);
          }
          else{
              name=data[0].username;
            res.render('home', { title: 'home', userData: name});
              
          }
    });
    
  });
router.get('/logout',(req,res)=>{
    res.render('logout');
});

module.exports=router;