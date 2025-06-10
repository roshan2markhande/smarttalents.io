const company = require('../models/companyModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const companyRegister = async (req, res) => {
    try {
        console.log(req);
        const { name, email, passwordHash, branding } = req.body;
        const chkExist = await company.find({ email: email })
        if (chkExist) {
            res.status(500).json({ message: "Company is already present" })
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(passwordHash, salt);
        var myobj = { name: name, email: email, passwordHash: hash, branding: branding };
        dbo.company.insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
        });

    } catch (err) {
        console.log('Error While Registring user', err)
    }


}
const companyLogin = async (req, res) => {
    try {
        const { email, passwordHash } = req.body;
        const chkExist = await company.find({ email: email })
        if (!chkExist) {
            res.status(500).json({ message: "Company is not present please register first" })
        }

        bcrypt.compare(passwordHash, chkExist.passwordHash, function (err, result) {
            const chkPassword = result;
        });
        if (!result) {
            res.status(500).json({ message: "Wrong Password " })
        } else {
            res.status(200).json({ message: "Login Sucess " })
        }

        jwt.sign({ email: chkExist.email }, process.env.PRIVATE_KEY, { algorithm: 'RS256' }, function (err, token) {
            console.log(token);
        });

    } catch (err) {
        console.log('Error While Registring user', err)
    }


}

module.exports = { companyRegister, companyLogin }