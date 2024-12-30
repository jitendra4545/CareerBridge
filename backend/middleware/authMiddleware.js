const jwt = require('jsonwebtoken');
const { AspirantModel } = require('../model/aspirantModel');

const authMiddleware = async (req, res, next) => {
    // console.log(req.headers.authorization)
    try {
        const token = req.headers.authorization;
        // console.log("sasad", token)
        if (!token) {
            return res.status(401).json({ message: 'Authentication token is missing' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const aspirant = await AspirantModel.findById(decoded.id);
        if (!aspirant) {
            return res.status(401).json({ message: 'Invalid authentication token' });
        }

        req.user = { id: aspirant._id };
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Authentication failed' });
    }
};

module.exports = authMiddleware;