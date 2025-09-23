import Razorpay from 'razorpay'
import createError from "http-errors";
import asyncHandler from '../asyncHandler.js';
import { validatePaymentVerification} from "razorpay/dist/utils/razorpay-utils.js";

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
        if(newAmount===449){
            totalAmount=newAmount*3
        }
        else if(newAmount===399){
            totalAmount=newAmount*12
        }
        else{
            totalAmount=newAmount
        }

        if(hasplan){
            const instance=new Razorpay({key_id:process.env.RZP_ID,key_secret:process.env.RZP_SECRET})
            const options={
                amount:totalAmount*100,
                currency:"INR"
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
export const verifyPayment=asyncHandler((req,res,next)=>{
    const {paymentId, orderId, signature}=req.body
    const ispaymentverify=validatePaymentVerification({"order_id": orderId, "payment_id": paymentId }, signature, process.env.RZP_SECRET);

    if(ispaymentverify){
        return res.status(200).json({success:true,message:"plan activated"})
    }
    else{
        throw createError(400,"payment verification failed")
    }
})