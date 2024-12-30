const mongoose = require('mongoose');

const AspirantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        match: [/^\d{10}$/, 'Invalid phone number format'],
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    address: {
        type: String,
        trim: true,
    },
    qualification: {
        type: String,
        required: true,
        enum: ['10th', '12th', 'Graduate', 'Postgraduate', 'Other'],
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
    },
    documents: [
        {
            documentType: {
                type: String,
                enum: ['Aadhar', 'PAN', 'Driving License', 'Other'],
            },
            documentURL: {
                type: String,
            },
        },
    ],
    applications: [
        {
            jobId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Job',
            },
            status: {
                type: String,
                enum: ['Pending', 'Submitted', 'Rejected', 'Accepted'],
                default: 'Pending',
            },
            paymentStatus: {
                type: String,
                enum: ['Pending', 'Paid', 'Failed'],
                default: 'Pending',
            },
            admitCard: {
                type: String,
                default: null,
            },
            receipt: {
                type: String,
                default: null,
            },
            history: [
                {
                    status: {
                        type: String,
                        enum: ['Pending', 'Submitted', 'Rejected', 'Accepted'],
                    },
                    updatedAt: {
                        type: Date,
                        default: Date.now,
                    },
                },
            ],
            appliedDate: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    isVerified: {
        type: Boolean,
        default: false,
    },
    verificationStatus: {
        type: String,
        enum: ['Pending', 'Verified', 'Rejected'],
        default: 'Pending',
    }
}, {
    versionKey: false,
    timestamps: true
});

AspirantSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Aspirant', AspirantSchema);
