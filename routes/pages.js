 const express=require("express");
 const router=express.Router();
 
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
router.get('/home',(req,res)=>{
    res.render('home');
});
router.get('/logout',(req,res)=>{
    res.render('logout');
});

module.exports=router;