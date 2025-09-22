import Razorpay from 'razorpay'
import createError from "http-errors";
import asyncHandler from '../asyncHandler.js';
import { validatePaymentVerification} from "razorpay/dist/utils/razorpay-utils.js";

//To create the order
export const createOrder=asyncHandler(async (req,res,next)=>{
    const {amount}=req.body
    const plans=['499','449','399']

    if(!amount){
        const err=new createError(400,"please specify amount")
        throw err
    }
    else{
        const hasplan=plans.includes(amount)

        if(hasplan){
            const instance=new Razorpay({key_id:process.env.RZP_ID,key_secret:process.env.RZP_SECRET})
            const options={
                amount:parseInt(amount)*100,
                currency:"INR",
                receipt:"order_rcptid_11"
            }

            instance.orders.create(options, function(err, order) {
                if(err){
                    const err=new createError(400,'error while creating order')
                    throw err
                }
                else{
                    return res.status(200).json({success:true,orderId:order.id})
                }
            })
        }
        else{
            const err=new createError(400,'Invalid amount set')
            throw err
        }
    }
})

//To verify the payment
export const verifyPayment=asyncHandler((req,res,next)=>{
    const {paymentId, orderId, signature}=req.body
    const ispaymentverify=validatePaymentVerification({"order_id": orderId, "payment_id": paymentId }, signature, process.env.RZP_SECRET);

    if(ispaymentverify){
        return res.status(200).json({sucess:true,message:"plan activated"})
    }
    else{
        const err=new createError(401,"payment verification failed")
        throw err
    }
})