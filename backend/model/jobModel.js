const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema(
    {
        recruitmentBoard: {
            type: String,
            required: true,
            trim: true,
        },
        postName: {
            type: String,
            required: true,
            trim: true,
        },
        qualification: {
            type: [String],
            required: true,
        },
        postDate: {
            type:String,
            required: true,
        },
        lastDate: {
            type: String,
            required: true,
        },
        moreInformation: {
            type: String,
            required: true,
        },
        detailsNotification: {
            type: String,
            // required: true,
        },
        location: {
            type: String,
            required: true,
            trim: true,
        },
        jobType: {
            type: String,
            enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance'],
            required: true,
        },
        salaryRange: {
            min: { type: Number },
            max: { type: Number },
        },
        experienceRequired: {
            type: String,
            enum: ['Fresher', '1-3 Years', '3-5 Years', '5+ Years'],
        },
        skills: {
            type: [String],
        },
        jobCategory: {
            type: String,
            enum: ['Government', 'Private', 'Internship', 'Freelance', 'Other'],
            required: true,
        },
        numberOfOpenings: {
            type: Number,
            default: 1,
        },
        contactEmail: {
            type: String,
            match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
        },
        contactPhone: {
            type: String,
            match: [/^\d{10}$/, 'Invalid phone number format'],
        },
        applicants: [
            {
                aspirantId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Aspirant',
                },
                paymentStatus: {
                    type: String,
                    enum: ['Pending', 'Paid', 'Failed'],
                    default: 'Pending',
                },
                appliedDate: {
                    type: Date,
                    default: Date.now,
                },
                feedback: {
                    rating: {
                        type: Number,
                        min: 1,
                        max: 5,
                        required: false,
                    },
                    comment: {
                        type: String,
                        trim: true,
                        required: false,
                    },
                },
            },
        ],
        status: {
            type: String,
            enum: ['Open', 'Closed', 'Paused'],
            default: 'Open',
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

const JobModel = mongoose.model('Job', JobSchema);

module.exports = { JobModel };
