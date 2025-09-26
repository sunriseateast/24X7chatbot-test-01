import Toast from "@/app/utils/Toast"
import {useNavigate} from 'react-router-dom'

export default function usePayment(){
    const navigation=useNavigate()
    const VERIFY_API=`${import.meta.env.VITE_API_URL}/app/order/verify-payment`

    const verifyPayment=async(response)=>{
        try{
            navigation("/app");
            const response2=await fetch(VERIFY_API,{
                method:"POST",
                credentials:"include",
                headers:{ "Content-Type": "application/json" },
                body:JSON.stringify({
                    paymentId:response.razorpay_payment_id,
                    orderId:response.razorpay_order_id,
                    signature:response.razorpay_signature
                })
            })
            const data=await response2.json()

            if(data.success==false){
                throw new Error(data.message)
            }   
            else{
                // navigation("/app");
                return (data.success)
            }
        }
        catch(error){
            Toast("Something went wrong",error.message,"paymentError")
            return(false)
        }
    }

    return verifyPayment
}