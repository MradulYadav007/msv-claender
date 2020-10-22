const express=require("express");
const authController=require('../controllers/set');
const router=express.Router();
const jwt=require("jsonwebtoken");
const jwt_decode = require('jwt-decode');

router.post('/setreminder',authController.setreminder);




module.exports=router;