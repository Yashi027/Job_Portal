import Company from "../models/Company.js";
import bcrypt from 'bcryptjs';
import {v2 as cloudinary} from 'cloudinary';
import generateToken from "../utils/generateToken.js";
import Job from "../models/Job.js";


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
        if(bcrypt.compare(password,company.password)){
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
    
}

export const changeJobApplicationsStatus = async (req,res) => {
    
}

export const changeVisiblity = async (req,res) => {
    
}