import express from 'express';
import {changeJobApplicationsStatus, changeVisiblity, getCompanyData, getCompanyJobApplicants, getCompanyPostedJobs, jobPost, loginCompany, registerCompany} from '../controllers/companyController.js'
import upload from '../utils/multer.js';

const router = express.Router()

router.post('/register',upload.single('image'),registerCompany)
router.post('/login',loginCompany)
router.get('/company',getCompanyData)
router.post('/post-job',jobPost)
router.get('/applicants',getCompanyJobApplicants)
router.get('/list-jobs',getCompanyPostedJobs)
router.post('/change-status',changeJobApplicationsStatus)
router.post('/change-visiblity',changeVisiblity)

export default router;