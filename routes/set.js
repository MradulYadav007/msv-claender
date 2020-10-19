const express=require("express");
const authController=require('../controllers/set');
const router=express.Router();

router.post('/setreminder',authController.setreminder);

module.exports=router;