const express=require('express');
const router=express.Router();
const multer = require('multer');
const upload = multer();
const {companyRegister, companyLogin } =require('../controllers/companyController');

router.post('/company/register', upload.none(), companyRegister);
router.post('/company/login',companyLogin);

module.exports=router;
