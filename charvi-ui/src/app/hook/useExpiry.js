import getExpiry from "../utils/getExpiry.js"
import useStore from "./useStore.js"
import Session from 'supertokens-auth-react/recipe/session';

export default function useExpiry(){
    const expiryDate=sessionStorage.getItem("date")
    const localuserId=sessionStorage.getItem("userId")
    const planStatus=sessionStorage.getItem("planStatus")

    const setSse=useStore((state)=>state.setSse)
    const setPayment=useStore((state)=>state.setPayment)

    const checkExpiry=async()=>{
        const sessionuserId=await Session.getUserId();

        if(!expiryDate || expiryDate===null || expiryDate){
            //to get always fresh value from store
            const {sse}=useStore.getState()
            if(sse){
                //if sse is there it already 
                // contain date so just return the date
                const {userId,expiryDate,planStatus}=sse
                setSse(false)

                sessionStorage.setItem("date",expiryDate)
                sessionStorage.setItem("userId",userId)
                sessionStorage.setItem("planStatus",planStatus)
                return {expiryDate,planStatus}
            }
            else{
                const {isPayment}=useStore.getState()
                if(isPayment){
                    //call to database to get expiry date
                    //store into sessionStorage and return over here

                    const {expiryDate,userId,planStatus}=await getExpiry()
                    setPayment(false)

                    sessionStorage.setItem("date",expiryDate)
                    sessionStorage.setItem("userId",userId)
                    sessionStorage.setItem("planStatus",planStatus)
                    return {expiryDate,planStatus}
                }
                else{
                    if(expiryDate){
                        if(localuserId===sessionuserId){
                            return {expiryDate,planStatus}
                        }
                        else{
                            const {expiryDate,userId,planStatus}=await getExpiry()
                        
                            setPayment(false)
                            setSse(false)

                            sessionStorage.setItem("date",expiryDate)
                            sessionStorage.setItem("userId",userId)
                            sessionStorage.setItem("planStatus",planStatus)
                            return {expiryDate,planStatus}
                        }
                    }
                    else{
                        //call to database to get fresh expiry date
                        //store into sessionStorage and return
                        //over here 

                        const {expiryDate,userId,planStatus}=await getExpiry()
                        
                        setPayment(false)
                        setSse(false)

                        sessionStorage.setItem("date",expiryDate)
                        sessionStorage.setItem("userId",userId)
                        sessionStorage.setItem("planStatus",planStatus)
                        return {expiryDate,planStatus}
                    }
                }
            }
        }
    }

    return checkExpiry
}