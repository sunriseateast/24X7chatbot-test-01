import getExpiry from "../utils/getExpiry.js"
import useStore from "./useStore.js"

export default function useExpiry(){
    const expiryDate=localStorage.getItem("date")
    const setSse=useStore((state)=>state.setSse)
    const setPayment=useStore((state)=>state.setPayment)

    const checkExpiry=async()=>{
        if(!expiryDate || expiryDate===null || expiryDate){
            //to get always fresh value from store
            const {sse}=useStore.getState()
            if(sse){
                //if sse is there it already 
                // contain date so just return the date
                const expiryDate=sse.date
                setSse(false)

                localStorage.setItem("date",expiryDate)
                return expiryDate
            }
            else{
                const {isPayment}=useStore.getState()
                if(isPayment){
                    //call to database to get expiry date
                    //store into localStorage and return over here

                    const expiryDate=await getExpiry()
                    setPayment(false)

                    localStorage.setItem("date",expiryDate)
                    return expiryDate
                }
                else{
                    if(expiryDate){
                        return expiryDate
                    }
                    else{
                        //call to database to get fresh expiry date
                        //store into localstorage and return
                        //over here 

                        const expiryDate=await getExpiry()

                        setPayment(false)
                        setSse(false)

                        localStorage.setItem("date",expiryDate)
                        return expiryDate
                    }
                }
            }
        }
    }

    return checkExpiry
}