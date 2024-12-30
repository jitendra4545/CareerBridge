const express = require('express');
const { registerAspirant, loginAspirant, verifyEmail, getProfile, updateProfile, uploadDocument, deleteDocument, toggleDocumentStatus, getApplications, submitApplicationFeedback } = require('../controller/aspirantController');
const authMiddleware = require('../middleware/authMiddleware');
const AspirantRouter = express.Router();
const multer = require('multer');
const upload = multer();

AspirantRouter.post('/register', registerAspirant);
AspirantRouter.post('/login', loginAspirant);
AspirantRouter.get('/verify-email/:token', verifyEmail);
AspirantRouter.get("/profile", authMiddleware, getProfile)
AspirantRouter.patch("/profile", authMiddleware, updateProfile)
AspirantRouter.post('/documents', authMiddleware, upload.single('file'), uploadDocument);
AspirantRouter.delete('/document', authMiddleware, deleteDocument);
AspirantRouter.put('/document/status', authMiddleware, toggleDocumentStatus);
AspirantRouter.get("/applications",authMiddleware,getApplications)
// AspirantRouter.post("/applications/:id/feedback",authMiddleware,submitApplicationFeedback)

module.exports = AspirantRouter;