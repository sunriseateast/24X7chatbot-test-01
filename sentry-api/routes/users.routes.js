import express from 'express'
import { getExpiry, updateUserinfo } from '../controllers/users.controller.js'

const router=express.Router()

router.post('/upate-user-info',updateUserinfo)
router.get('/expiry-info',getExpiry)


export default router