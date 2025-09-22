import Toast from "@/app/utils/Toast"
export default function usePayment(){

    const verifyPayment=async(response)=>{
        try{
            const response2=await fetch("http://localhost:8000/app/order/verify-payment",{
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
                window.location.href="/app"
            }
        }
        catch(error){
            Toast("Something went wrong",error.message,"paymentError")
        }
    }

    return verifyPayment
}