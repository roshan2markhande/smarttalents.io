const express=require('express');
const router=express.Router();
const {companyRegister, companyLogin } =require('../controllers/companyController');

router.post('/company/register',companyRegister);
router.post('/company/login',companyLogin);

module.exports=router;
