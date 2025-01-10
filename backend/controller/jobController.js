const { AspirantModel } = require("../model/aspirantModel");
const { JobModel } = require("../model/jobModel");


const createJob = async (req, res) => {
    try {
        const job = new JobModel(req.body);
        await job.save();
        res.status(201).json({ message: 'Job created successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const updateJob = async (req, res) => {
    try {
        const updatedJob = await JobModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedJob) return res.status(404).json({ message: 'Job not found' });
        res.status(200).json(updatedJob);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getAllJobs = async (req, res) => {
    try {
        const filters = req.query;
        const jobs = await JobModel.find(filters);
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getJobDetails = async (req, res) => {
    try {
        const job = await JobModel.findById(req.params.id);
        if (!job) return res.status(404).json({ message: 'Job not found' });
        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



const deleteJob = async (req, res) => {
    try {
        const deletedJob = await JobModel.findByIdAndDelete(req.params.id);
        if (!deletedJob) return res.status(404).json({ message: 'Job not found' });
        res.status(200).json({ message: 'Job deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



const applyJob = async (req, res) => {
    try {
        const { jobId } = req.params;
        const aspirantId = req.user.id;
        const job = await JobModel.findById(jobId);
        const aspirant = await AspirantModel.findById(aspirantId);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        if (!aspirant) {
            return res.status(404).json({ message: 'Aspirant not found' });
        }

        if (aspirant.verificationStatusByAdmin !== 'Verified') {
            return res.status(403).json({
                message: 'You are not allowed to apply for jobs. Your account is not verified by admin. Please wait for verification.',
            });
        }

        const existingApplication = job.applicants.find(applicant => applicant.aspirantId.toString() === aspirantId);
        if (existingApplication) {
            return res.status(400).json({ message: 'You have already applied for this job' });
        }


        job.applicants.push({
            aspirantId,
            paymentStatus: 'Pending',
        });
        await job.save();


        aspirant.applications.push({
            jobId,
            status: 'Pending',
            paymentStatus: 'Pending',
        });
        await aspirant.save();

        return res.status(201).json({
            message: 'Job application submitted successfully',
            job,
            aspirant,
        });
    } catch (error) {
        console.error('Error applying for job:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};




const getJobApplicants = async (req, res) => {
    try {
        const { jobId } = req.params;

        const job = await JobModel.findById(jobId).populate({
            path: 'applicants.aspirantId',
            select: 'name email phone qualification',
        });

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        const applicants = job.applicants.map(applicant => ({
            aspirant: applicant.aspirantId,
            paymentStatus: applicant.paymentStatus,
            appliedDate: applicant.appliedDate,
            feedback: applicant.feedback,
        }));

        return res.status(200).json({
            message: 'Applicants retrieved successfully',
            job: {
                recruitmentBoard: job.recruitmentBoard,
                postName: job.postName,
                location: job.location,
            },
            applicants,
        });
    } catch (error) {
        console.error('Error retrieving job applicants:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};




module.exports = { createJob, updateJob, getAllJobs, getJobDetails, deleteJob, applyJob ,getJobApplicants};


