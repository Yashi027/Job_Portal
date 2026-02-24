import Job from "../models/Job.js"
import JobApplication from "../models/JobApplication.js"
import User from "../models/User.js"
import {v2 as cloudinary} from 'cloudinary';


//UserData
export const getUserData = async (req,res) => {
    const {userId} = req.auth()
    try {
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({success:false,message:"User Not found"})
        }

        return res.json({success:true,user})
    } catch (error) {
        return res.json({success:false,message:error.message})
    }
}

//Apply for job
export const applyForJob = async (req,res) => {
    
    const {jobId} = req.body

    const {userId} = req.auth()

    try {
        const isAlreadyApplied = await JobApplication.find({jobId,userId})

        if(isAlreadyApplied.length>0){
            return res.json({success:false, message:"Already Applied"})
        }

        const jobData = await Job.findById(jobId)

        if(!jobData){
            return res.status(404).json({success:false,message:'Job Not Found'});
        }

        await JobApplication.create({
            userId,
            companyId: jobData.companyId,
            jobId,
            date:Date.now()
        })

        return res.json({success:true,message:'Applied Successfully'})
    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
    }
}

//applied applications

export const getUserJobApplications = async (req,res) => {
    try {
        const {userId} = req.auth()
        const applications = await JobApplication.find({userId})
        .populate('companyId','name email image')
        .populate('jobId','title description location category level salary')
        .exec()

        if(!applications){
            return res.json({success:false,message:'No Job Applications found'})
        }

        return res.json({success:true,applications})
    } catch (error) {
        return res.json({success:false,message:error.message})
    }
}

//update resume
export const updateUserResume = async (req,res) => {
    try {
        const {userId} = req.auth()
        const resumeFile = req.file

        const userData = await User.findById(userId)

        if(resumeFile){
            const resumeUpload = await cloudinary.uploader.upload(resumeFile.path)
            userData.resume = resumeUpload.secure_url
        }

        await userData.save()

        return res.json({success:true, message:"Resume Updated"})
    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
    }
}