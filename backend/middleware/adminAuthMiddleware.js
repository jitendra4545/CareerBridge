const jwt = require('jsonwebtoken');
const AdminModel = require('../model/adminModel');

const adminAuthMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        // console.log(token)
        if (!token) {
            return res.status(401).json({ message: 'Authentication token is missing' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const admin = await AdminModel.findById(decoded.id);

        if (!admin) {
            return res.status(401).json({ message: 'Invalid authentication token' });
        }

        if (!['SuperAdmin', 'JobManager', 'Support'].includes(admin.role)) {
            return res.status(403).json({ message: 'Access denied: Unauthorized role' });
        }

        req.admin = { id: admin._id, role: admin.role };

        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Authentication failed' });
    }
};

module.exports = adminAuthMiddleware;
