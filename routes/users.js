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
            res.render('home', { title: 'home', userData: data});
              
          }
    });
    alert("1");
  });

module.exports=router;