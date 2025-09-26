import express from 'express'
import { updateUserinfo } from '../controllers/users.controller.js'

const router=express.Router()

router.post('/upate-user-info',updateUserinfo)


export default router