const mysql=require("mysql");
const jwt=require("jsonwebtoken");
const jwt_decode = require('jwt-decode');

const db=mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.PASSWORD,
    database:process.env.DATABASE
});
exports.setreminder=(req,res)=>{
    var day= req.body.date;
    var task=req.body.task;
    var cook=req.cookies['jwt'];
    var decoded = jwt_decode(cook);
    var user=decoded.id;
    console.log(user);
    if(!day || !task)
     {
      res.status(400).render('setreminder',{
        message: 'Provide Date/Task'
      });
    }
    else{

    db.query('INSERT INTO todo SET ?',{user: user,date: day,work:task },(error,results)=>{
        if(error){
            console.log(error);
        }
        else{
            return res.render('setreminder',{
                message:'Task Registered'
            });
        }
    });
}
}
