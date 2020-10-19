const mysql=require("mysql");
const jwt=require("jsonwebtoken");
const jwt_decode = require('jwt-decode');


var cook=document.cookie;
    var decoded = jwt_decode(cook);
    var user=decoded.id;
    var name={};
    db.query("SELECT * FROM users WHERE id = ?",[user],async (error,results)=>{
        if(error){
            console.log(error);
          }
          else{
            name=results[0].username;
              
          }
    });
    alert(name);