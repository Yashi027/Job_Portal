import Company from "../models/Company.js";
import bcrypt from 'bcryptjs';
import {v2 as cloudinary} from 'cloudinary';
import generateToken from "../utils/generateToken.js";
import Job from "../models/Job.js";
import JobApplication from "../models/JobApplication.js";


export const registerCompany = async (req,res) => {
    const {name,email,password} = req.body;

    const imageFile = req.file;
    if(!name || !email || !password || !imageFile){
        return res.json({success:false, message:"Missing Details"})
    }

    try {
        const companyExists = await Company.findOne({email})
        
        if(companyExists){
            return res.json({success:false,message:"Company already registered"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,salt)

        const imageUpload = await cloudinary.uploader.upload(imageFile.path)

        const company = await Company.create({
            name,
            email,
            password:hashPassword,
            image:imageUpload.secure_url
        })

        res.json({
            success:true,
            company:{
                _id:company.id,
                name:company.name,
                email:company.email,
                image:company.image
            },
            token:generateToken(company._id)
        })
    } catch (error) {
        res.json({success:false,message:error.message})
    }

}


export const loginCompany = async (req,res) => {
    const {email,password} = req.body
    try {
        const company = await Company.findOne({email})
        if(!company){
            return res.json({success:false, message:"Invalid Email or Password"})
        }

        if(await bcrypt.compare(password,company.password)){
            res.json({
                success:true,
                company:{
                _id:company.id,
                name:company.name,
                email:company.email,
                image:company.image
            },
            token:generateToken(company._id)
            })
        }
        else{
            res.json({success:false, message:"Invalid Email or Password"})
        }
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}

export const getCompanyData = async (req,res) => {
    
    try {
        const company = req.company
        return res.json({success:true, company})
    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
    }
    
}

export const jobPost = async (req,res) => {
    const {title ,description ,location ,salary, level, category } = req.body

    const companyId = req.company._id
    
    try {
        const newJob = new Job({
            title,
            description,
            location,
            salary,
            companyId,
            date:Date.now(),
            level,
            category
        })
    
        await newJob.save()
    
        return res.status(200).json({success:true,newJob})
    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
    }
}

export const getCompanyJobApplicants = async (req,res) => {
    
}

export const getCompanyPostedJobs = async (req,res) => {
    try {
        const companyId = req.company._id
        const jobs = await Job.find({companyId})
        console.log("req.company:", req.company)
        const jobsData = await Promise.all(jobs.map(async(job) => {
            const applicants = await JobApplication.find({jobId:job._id});
            return {...job.toObject(),applicants:applicants.length}
        }))

        return res.json({success:true, jobsData})
    } catch (error) {
        return res.json({success:false,message:error.message})
    }
}

export const changeJobApplicationsStatus = async (req,res) => {
    
}

export const changeVisiblity = async (req,res) => {
    try {
        const {id} = req.body

        const companyId = req.company._id

        const job = await Job.findById(id)

        if(companyId.toString() === job.companyId.toString()){
            job.visible = !job.visible
        }

        await job.save()

        return res.json({success:true,job})
    } catch (error) {
        return res.json({success:false,message: error.message})
    }
}