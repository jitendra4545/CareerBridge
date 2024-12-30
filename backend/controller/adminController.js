const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AdminModel = require('../model/adminModel');
require('dotenv').config();



const registerAdmin = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const existingAdmin = await AdminModel.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Email already registered.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = new AdminModel({
            name,
            email,
            password: hashedPassword,
            role,
        });

        await admin.save();
        res.status(201).json({ message: 'Admin registered successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering admin.', error: error.message });
    }
};




const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await AdminModel.findOne({ email });
        if (!admin) {
            return res.status(400).json({ message: 'Invalid email or password.' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password.' });
        }

        const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });

        res.status(200).json({ message: 'Login successful.', token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in admin.', error: error.message });
    }
};





module.exports = { registerAdmin, loginAdmin };