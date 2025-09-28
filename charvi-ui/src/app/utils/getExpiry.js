import Toast from "./Toast"

export default async function getExpiry(){
    try{
        const GET_EXPIRY_API=`${import.meta.env.VITE_API_URL}/app/users/expiry-info`
        const response=await fetch(GET_EXPIRY_API,{
            method:"GET",
            credentials:"include"
        })
        
        const data=await response.json()

        if(data.success==false){
            throw new Error(data.message)
        }
        else{
            return (data.message)
        }

    }
    catch(error){
        Toast("something went wrong",error.message,"expiryError")
        return(false)
    }
}