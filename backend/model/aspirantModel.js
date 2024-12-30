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
        type: String,
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
            isAcceptable: {
                type: String,
                enum: ['Pending', 'Rejected', 'Accepted'],
                default: 'Pending',
            }
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
            slot: {
                type: String,
                default: null,
            },

        },
    ],
    isVerified: {
        type: Boolean,
        default: false,
    },
    verificationStatusByAdmin: {
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

const AspirantModel = mongoose.model('Aspirant', AspirantSchema);

module.exports = { AspirantModel };
