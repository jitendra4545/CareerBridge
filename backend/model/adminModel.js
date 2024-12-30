const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    role: {
        type: String,
        enum: ['SuperAdmin', 'JobManager', 'Support'],
        default: 'JobManager',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const AdminModel = mongoose.model('Admin', AdminSchema);

module.exports = AdminModel;
