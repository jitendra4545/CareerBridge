const express = require('express');
const adminAuthMiddleware = require('../middleware/adminAuthMiddleware');
const { createJob, updateJob, getAllJobs, getJobDetails, deleteJob, applyJob, getJobApplicants } = require('../controller/jobController');
const authMiddleware = require('../middleware/authMiddleware');
const JobRouter = express.Router();

JobRouter.post('/', adminAuthMiddleware, createJob);
JobRouter.put('/:id', adminAuthMiddleware, updateJob);
JobRouter.get('/', getAllJobs);
JobRouter.get('/:id', getJobDetails);
JobRouter.delete('/:id', adminAuthMiddleware, deleteJob);
JobRouter.post('/:jobId/apply', authMiddleware, applyJob);
JobRouter.get("/:jobId/applications", adminAuthMiddleware, getJobApplicants);
module.exports = JobRouter;