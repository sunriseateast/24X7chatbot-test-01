import Razorpay from 'razorpay'
import createError from "http-errors";
import asyncHandler from '../asyncHandler.js';
import { validatePaymentVerification} from "razorpay/dist/utils/razorpay-utils.js";


import { usersinfoTable } from "../models/postgres.schema.js"
import db from '../db/postgres.con.js'
import setExpiry from '../utils/setExpiry.js';
import { eq } from 'drizzle-orm';

//Razorpay instance
 const instance=new Razorpay({key_id:process.env.RZP_ID,key_secret:process.env.RZP_SECRET})

//To create the order
export const createOrder=asyncHandler(async (req,res,next)=>{
    const {amount}=req.body
    const plans=['499','449','399']

    if(!amount){
        throw createError(400,"please specify the amount")
    }
    else{
        const hasplan=plans.includes(amount)

        //convert plans into months here
        const newAmount=parseInt(amount)
        let totalAmount
        let days
        if(newAmount===449){
            totalAmount=newAmount*3
            days=90
        }
        else if(newAmount===399){
            totalAmount=newAmount*12
            days=365
        }
        else{
            totalAmount=newAmount
            days=30
        }

        if(hasplan){
            const options={
                amount:totalAmount*100,
                currency:"INR",
                notes:{
                    days:days
                }
            }

            //Wrap this callback into promise so we can throw the error
            const order= await new Promise((resolve,reject)=>{
                instance.orders.create(options,function(err,order){
                    if(err){
                         return reject(createError(400,"Error while creating order"))
                    }
                    resolve (order)
                })
            })
            return res.status(200).json({success:true,orderId:order.id})
        }
        else{
            throw createError(400,'Invalid amount set')
        }
    }
})

//To verify the payment
export const verifyPayment=asyncHandler(async(req,res,next)=>{
    const {paymentId, orderId, signature}=req.body
    const ispaymentverify=validatePaymentVerification({"order_id": orderId, "payment_id": paymentId }, signature, process.env.RZP_SECRET);

    const session=req.session
    const userId=session.getUserId()

    if(ispaymentverify){
        const orderdetails=await instance.orders.fetch(orderId);
        const {days}=orderdetails.notes
        
        //Insert expiry into users db in postgres user_info table
        try{
            const result=await db
            .select({ expiry: usersinfoTable.expiry })
            .from(usersinfoTable)
            .where(eq(usersinfoTable.userId,userId))
            const currentExpiry=result[0]?.expiry || 0

            const {activeon,expiry,duration}=setExpiry(days,currentExpiry)
            
            await db
            .update(usersinfoTable)
            .set({
                planStatus:"paid",
                duration:duration,
                activeon:activeon,
                expiry:expiry,
            })
            .where(eq(usersinfoTable.userId, userId))
        }
        catch(error){
            throw createError(503,"contact support team")
        }

        return res.status(200).json({success:true,message:"plan activated"})
    }
    else{
        throw createError(400,"payment verification failed")
    }
})