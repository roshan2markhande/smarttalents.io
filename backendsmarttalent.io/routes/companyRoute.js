const express=require('express');
const router=express.Router();
const {companyRegister, companyLogin } =require('../controllers/companyController');

router.post('/company',companyRegister);

module.exports=router;