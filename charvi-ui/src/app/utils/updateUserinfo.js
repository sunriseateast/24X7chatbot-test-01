import Toast from "./Toast"

export default async function updateUserinfo(){
    const UPDATE_USER_API=`${import.meta.env.VITE_API_URL}/app/users/upate-user-info`
    try{
        const response=await fetch(UPDATE_USER_API,{
            method:"POST",
            credentials:"include",
            headers:{
              "Content-Type":"application/json"
            },
        })

        const data=await response.json()

        if(data.success===false){
            throw new Error(data.message)
        }
    }
    catch(error){
        Toast("Something went wrong",error.message,"dbError")
    }
}