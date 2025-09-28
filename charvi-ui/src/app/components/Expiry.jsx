import { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Door from "../svg/Door";
import Intelligence from "../svg/Intelligence";
import useExpiry from "../hook/useExpiry.js";
import useStore from "../hook/useStore.js";
import Toast from "../utils/Toast";

export default function Expiry() {
  const [expired, setExpired] = useState();
  const checkExpiry=useExpiry()
  const sse=useStore((state)=>state.sse)
  const isPayment=useStore((state)=>state.isPayment)

  //to get expiry from db once get mounted
  // useEffect(()=>{
  //   ;(async()=>{
  //     const expiryDate=await getExpiry()

  //     if(expiryDate){ //if expiry date is true
  //       const currentdate=Date.now()
  //       if(currentdate > expiryDate){
  //         setExpired(false)
  //       }
  //       else{
  //         const expiry= new Date(expiryDate).toLocaleDateString("en-GB");
  //         setExpired(expiry)
  //       }
  //     }
  //     else{ //if any error expiry date is false
  //       setExpired(expiryDate)
  //     }
  //   })()

  // },[isPayment])


  useEffect(()=>{
   ;(async()=>{
      const expiryDate=await checkExpiry()

      const currentdate=Date.now()
      if(currentdate > expiryDate){
        setExpired(false)
      }
      else{
        const expiry= new Date(parseInt(expiryDate)).toLocaleDateString("en-GB");
        console.log(expiry)
        setExpired(expiry)
      }

   })()
  },[sse,isPayment])

  return (
    <div className="">
      {expired ? (
         <div className="expiry-button p-[5px] rounded-lg select-none">
          <p className="text-slate-50 text-[12px] px-[2px] font-semibold">
            Expiry: {expired}
          </p>
        </div>
      ) : (
         <Tooltip>
          <TooltipTrigger>
            <div className="select-none cursor-pointer expired-button p-[5px] rounded-lg">
              <p className="text-slate-50 text-[12px] px-[2px] font-semibold">
                Expired ❗️
              </p>
            </div>
          </TooltipTrigger>
          <TooltipContent
            side="right"
            align="center"
            className={`my-[5px] select-none`}
          >
            <div className="text-slaate-50">
              <div className="flex items-center justify-center gap-x-1">
                <p>Your plan is expired open panel</p>
                <div className="h-[18px] w-[18px] text-muted-foreground">
                  <Door />
                </div>
              </div>
              <div className="flex items-center gap-x-1">
                <p>Upgrade the plan</p>
                <div className="h-[18px] w-[18px] text-muted-foreground">
                  <Intelligence />
                </div>
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
}
