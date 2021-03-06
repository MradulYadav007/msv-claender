const express=require ("express");
const mysql=require("mysql");
const app=express();
const dotenv=require('dotenv');
const path=require('path');
const cookieParser=require('cookie-parser');

dotenv.config({ path:'./.env'});
const db=mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.PASSWORD,
    database:process.env.DATABASE
});
const publicdirectory=path.join(__dirname,'./public');

app.use(express.urlencoded({extended:false}));

app.use(express.json());
 
app.use(cookieParser());
app.use(express.static(publicdirectory));
app.set('view engine','hbs');
db.connect((error)=>{
    if(error)
    {
        console.log(error);
    }
    else
    console.log("Mysql connected...");
})
app.use('/',require('./routes/pages'));

//app.use('/',require('./routes/currentuser'));
app.use('/auth',require('./routes/auth'));
app.use('/set',require('./routes/set'));
app.listen(8000,()=>{
    console.log("Server started on port 8000");
});