import Toast from "@/app/utils/Toast"
export default function useCreateorder(){
    const createOrder=async(amount)=>{
      try{
          const response=await fetch(`http://localhost:8000/app/order/create-order`,{
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
        // return({success:false,message:error.message})
        Toast("Something went wrong",error.message,"orderError")
      }
    }
    return createOrder
}