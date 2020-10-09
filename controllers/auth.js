const mysql=require("mysql");
const jwt=require("jsonwebtoken");
const bcrypt=require('bcryptjs');
const db=mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.PASSWORD,
    database:process.env.DATABASE
});
 
 exports.signup= (req,res) => {
     console.log(req.body);
     
     const { username, email, mobnum, password, password_confirm}=req.body;
     db.query("SELECT email FROM users WHERE email = ?", [email],async (error, result) => {
        if(error){
          console.log(error);
        }
    
        if(result.length > 0) {
          return res.render('signup', {
            message: 'That email is already in use'
          })
        } else if(password !== password_confirm) {
          return res.render('signup', {
            message: 'Passwords do not match'
          });
        }

    let hashedpassword=await bcrypt.hash(password,8);
    console.log(hashedpassword);
    db.query('INSERT INTO users SET ?',{username: username,email: email,mobile:mobnum, password: hashedpassword},(error,results)=>{
        if(error){
            console.log(error);
        }
        else{
            return res.render('signup',{
                message:'User registered'
            });
        }
    });

     });
 }

 exports.login=async (req,res)=>{
   try {
     
   
   const {name,password}=req.body;
   if(!name || !password)
     {
      res.status(400).render('login',{
        message: 'Provide Email/Password'
      });
     }
   db.query("SELECT * FROM users WHERE email = ?",[name],async (error,results)=>{
  
     console.log(await bcrypt.compare(password,results[0].password));
     if(error){
       console.log(error);
     }
    /*if(!results || !(await bcrypt.compare(password,results[0].password) ))
     {
       res.status(401).render('login',{
         message: 'Email or password is incorrect'
       });
    }*/
    {
       const id=results[0].id;

       const token=jwt.sign({ id:id },process.env.JWT_SECRET,{
         expiresIn: process.env.JWT_EXPIRES_IN
       });

       console.log("The token is"+token);

       const cookieOption={
         expires: new Date(
           Date.now()+process.env.JWT_COOKIE_EXPIRES*3600*1000
          ),
          httpOnly: true
       }

       res.cookie('jwt',token,cookieOption);
       res.status(200).redirect("/");
      }
   })
  } catch (error) {
     console.log(error);
  }
  }
