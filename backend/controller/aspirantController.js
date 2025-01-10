const { AspirantModel } = require("../model/aspirantModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const nodemailer = require('nodemailer');
const { PutObjectCommand } = require('@aws-sdk/client-s3');
const { s3Client } = require("../utils/s3Client");
const { DeleteObjectCommand } = require('@aws-sdk/client-s3');


const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});


const registerAspirant = async (req, res) => {
    try {
        const { name, email, phone, password, qualification, dateOfBirth, gender } = req.body;

        const existingUser = await AspirantModel.findOne({ $or: [{ email }, { phone }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Email or phone already registered.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const aspirant = new AspirantModel({
            name,
            email,
            phone,
            password: hashedPassword,
            qualification,
            dateOfBirth,
            gender,
            isVerified: false,
        });

        const savedAspirant = await aspirant.save();


        const verificationToken = jwt.sign(
            { id: savedAspirant._id, email },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );


        const verificationLink = `${process.env.BASE_URL}/aspirants/verify-email/${verificationToken}`;

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Welcome to Our Platform - Verify Your Email',
            html: `<h1>Welcome, ${name}!</h1>
                   <p>Thank you for registering. Please verify your email by clicking the link below:</p>
                   <a href="${verificationLink}">Verify Email</a>`,
        });

        res.status(201).json({
            message: 'Aspirant registered successfully. Please check your email to verify your account.',
        });
    } catch (error) {
        res.status(500).json({ message: 'Error registering aspirant.', error: error.message });
    }
};



const verifyEmail = async (req, res) => {
    try {
        const { token } = req.params;

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const aspirant = await AspirantModel.findById(decoded.id);
        if (!aspirant) {
            return res.status(400).json({ message: 'Invalid verification link.' });
        }

        aspirant.isVerified = true;
        await aspirant.save();

        res.status(200).json({ message: 'Email verified successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error verifying email.', error: error.message });
    }
};



const loginAspirant = async (req, res) => {
    try {
        const { email, password } = req.body;

        const aspirant = await AspirantModel.findOne({ email });
        console.log(aspirant)
        if (!aspirant) {
            return res.status(400).json({ message: 'Invalid email or password.' });
        }

        if (!aspirant.isVerified) {
            return res.status(403).json({ message: 'Please verify your email before logging in.' });
        }

        const isMatch = await bcrypt.compare(password, aspirant.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password.' });
        }

        const token = jwt.sign({ id: aspirant._id, role: 'Aspirant' }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });

        res.status(200).json({ message: 'Login successful.', token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in aspirant.', error: error.message });
    }
};




const getProfile = async (req, res) => {
    try {
        const aspirantId = req.user.id;

        const profile = await AspirantModel.findById(aspirantId).select('-password');
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        res.status(200).json(profile);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};



const updateProfile = async (req, res) => {
    try {
        const aspirantId = req.user.id;
        const updates = req.body;
        const updatedProfiles = await AspirantModel.findByIdAndUpdate(
            aspirantId,
            updates,
            { new: true, runValidators: true }
        ).select('-password');

        if (!updatedProfiles) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        console.log(updatedProfiles)
        res.status(200).json(updatedProfiles);
    } catch (error) {
        console.error(error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: 'Server error' });
    }
};




const uploadDocument = async (req, res) => {
    try {
        const { documentType } = req.body;
        const file = req.file;
        const aspirantId = req.user.id;
        if (!file || !documentType) {
            return res.status(400).json({
                error: 'Both documentType and file are required',
            });
        }


        const validDocumentTypes = ['Aadhar', 'PAN', 'Driving License', 'Other'];
        if (!validDocumentTypes.includes(documentType)) {
            return res.status(400).json({
                error: `Invalid documentType. Valid types are: ${validDocumentTypes.join(', ')}`,
            });
        }

        const fileKey = `${Date.now()}-${file.originalname}`;


        const command = new PutObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: fileKey,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: 'public-read',
        });

        await s3Client.send(command);


        const fileUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.S3_BUCKET_REGION}.amazonaws.com/${fileKey}`;


        const updatedAspirant = await AspirantModel.findByIdAndUpdate(
            aspirantId,
            {
                $push: {
                    documents: {
                        documentType,
                        documentURL: fileUrl,
                        isAcceptable: 'Pending',
                    },
                },
            },
            { new: true }
        );

        if (!updatedAspirant) {
            return res.status(404).json({ message: 'Aspirant not found' });
        }

        res.status(200).json({
            message: 'Document uploaded successfully',
            document: {
                documentType,
                documentURL: fileUrl,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error uploading document' });
    }
};


const deleteDocument = async (req, res) => {
    try {
        const { documentId } = req.params;

        if (!documentId) {
            return res.status(400).json({ error: 'Document ID is required' });
        }

        const aspirantId = req.user.id;


        const aspirant = await AspirantModel.findById(aspirantId);
        if (!aspirant) {
            return res.status(404).json({ message: 'Aspirant not found' });
        }


        const document = aspirant.documents.id(documentId);
        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }


        if (document.isAcceptable === 'Accepted') {
            return res.status(403).json({
                message:
                    'This document has been accepted and cannot be deleted. Please contact the admin for assistance.',
            });
        }


        const command = new DeleteObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: document.documentURL.split('/').pop(),
        });
        await s3Client.send(command);

        aspirant.documents = aspirant.documents.filter(
            (doc) => doc._id.toString() !== documentId
        );

        await aspirant.save();

        res.status(200).json({ message: 'Document deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting document' });
    }
};



const getDocument = async (req, res) => {
    try {
        const aspirantId = req.user.id;
        let alldocs = await AspirantModel.findById(aspirantId)
        if (!alldocs) {
            return res.status(404).json({ message: 'Aspirant not found' });
        }
        res.status(200).json(alldocs.documents);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching documents' });
    }
}



const toggleDocumentStatus = async (req, res) => {
    try {
        const { documentId, status } = req.body;

        if (!documentId || !status) {
            return res.status(400).json({
                error: 'Both documentId and status are required',
            });
        }


        const validStatuses = ['Pending', 'Rejected', 'Accepted'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                error: `Invalid status. Valid statuses are: ${validStatuses.join(', ')}`,
            });
        }

        const aspirantId = req.user.id;


        const aspirant = await AspirantModel.findById(aspirantId);
        if (!aspirant) {
            return res.status(404).json({ message: 'Aspirant not found' });
        }


        const document = aspirant.documents.id(documentId);
        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }


        document.isAcceptable = status;


        await aspirant.save();

        res.status(200).json({
            message: 'Document status updated successfully',
            document: {
                id: documentId,
                status: document.isAcceptable,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating document status' });
    }
};


const getApplications = async (req, res) => {
    try {
        const aspirantId = req.user.id;
        const aspirant = await AspirantModel.findById(aspirantId).populate('applications.jobId');

        if (!aspirant) {
            return res.status(404).json({ message: 'Aspirant not found' });
        }

        res.status(200).json({
            message: 'Applications fetched successfully',
            applications: aspirant.applications.map(application => ({
                application
            })),
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching applications' });
    }
};









module.exports = { registerAspirant, loginAspirant, verifyEmail, getProfile, updateProfile, uploadDocument, deleteDocument, toggleDocumentStatus, getApplications, getDocument };