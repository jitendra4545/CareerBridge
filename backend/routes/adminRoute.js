

const express = require('express');
const { registerAdmin, loginAdmin } = require('../controller/adminController');
const adminAuthMiddleware = require('../middleware/adminAuthMiddleware');
const AdminRouter = express.Router();


AdminRouter.post('/register', registerAdmin)
AdminRouter.post('/login', loginAdmin)
AdminRouter.get('/admin-only', adminAuthMiddleware, (req, res) => {
    res.json({ message: 'Welcome, Admin!', admin: req.admin });
});


module.exports = AdminRouter;