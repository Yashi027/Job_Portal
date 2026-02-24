import express from 'express'
import upload from '../utils/multer.js';
import { applyForJob, getUserData, getUserJobApplications, updateUserResume } from '../controllers/userController.js'
import { requireAuth } from '@clerk/express'

const router = express.Router()

router.get('/user',requireAuth(), getUserData)

router.post('/apply',requireAuth(),applyForJob)

router.get('/applications',requireAuth(), getUserJobApplications)

router.post('/update-resume',requireAuth(), upload.single('resume'),updateUserResume)

export default router