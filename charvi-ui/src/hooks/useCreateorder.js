import Toast from "@/app/utils/Toast"
export default function useCreateorder(){
    const ORDER_API=`${import.meta.env.VITE_API_URL}/app/order/create-order`

    const createOrder=async(amount)=>{
      try{
          const response=await fetch(ORDER_API,{
            method:"POST",
            credentials:"include",
            headers:{
              "Content-Type":"application/json"
            },
            body:JSON.stringify({amount})
          })

          const data=await response.json()

          if(data.success==false){
            throw new Error(data.message)
          }
          else{
            return ({success:data.success,orderId:data.orderId})
          }
      }
      catch(error){
        Toast("Something went wrong",error.message,"orderError")
      }
    }
    return createOrder
}