const mysql=require("mysql");
const express=require("express");
const jwt=require("jsonwebtoken");
const jwt_decode = require('jwt-decode');
const { __express } = require("hbs");
const router=express.Router();

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
    
    db.query("SELECT * FROM users WHERE id = ?",[user],async (error,results)=>{
        if(error){
            console.log(error);
          }
          else{
            res.render('home', { title: 'home', userData: results});
              
          }
    });
    alert("1");
  });
  module.exports = router;