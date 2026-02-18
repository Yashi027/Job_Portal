import Company from "../models/Company.js";
import bcrypt from 'bcryptjs';


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
    } catch (error) {
        
    }

}


export const loginCompany = async (req,res) => {
    
}

export const getCompanyData = async (req,res) => {
    
}

export const jobPost = async (req,res) => {
    
}

export const getCompanyJobApplicants = async (req,res) => {
    
}

export const getCompanyPostedJobs = async (req,res) => {
    
}

export const changeJobApplicationsStatus = async (req,res) => {
    
}

export const changeVisiblity = async (req,res) => {
    
}