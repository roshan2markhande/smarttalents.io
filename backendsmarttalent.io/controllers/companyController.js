const Company = require('../models/companyModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const companyRegister = async (req, res) => {
    try {
        const { name, email, passwordHash, branding } = req.body;

        // Check if company already exists
        const existingCompany = await Company.findOne({ email });
        if (existingCompany) {
            return res.status(400).json({ message: "Company already registered" });
        }

        // Hash password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(passwordHash, salt);

        // Create company
        const newCompany = new Company({
            name,
            email,
            passwordHash: hash,
            branding
        });

        await newCompany.save();
        res.status(201).json({ message: "Company registered successfully" });

    } catch (err) {
        console.error("Error during registration:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

const companyLogin = async (req, res) => {
    try {
        const { email, passwordHash } = req.body;

        const existingCompany = await Company.findOne({ email });
        if (!existingCompany) {
            return res.status(400).json({ message: "Company not found. Please register first." });
        }

        const passwordMatch = await bcrypt.compare(passwordHash, existingCompany.passwordHash);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Incorrect password" });
        }
        const token = jwt.sign(
            { email: existingCompany.email, id: existingCompany._id },
            process.env.PRIVATE_KEY,
            { algorithm: 'HS256', expiresIn: '1h' }
        );

        res.status(200).json({ message: "Login successful", token });

    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { companyRegister, companyLogin };
