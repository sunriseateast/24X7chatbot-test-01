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
import {MoonLoader} from 'react-spinners'
import Crown from "../svg/Crown";
import Giftbox from "../svg/Giftbox";
import gsap from 'gsap'



export default function Expiry() {
  const [expired, setExpired] = useState();
  const [isloading,setIsloading]=useState(false)
  const [planStatus,setPlanStatus]=useState()

  const checkExpiry=useExpiry()
  const sse=useStore((state)=>state.sse)
  const isPayment=useStore((state)=>state.isPayment)

  //to get expiry from db once get mounted 
  useEffect(()=>{
    let ignore=false

   ;(async()=>{
      setIsloading(true)
      const {expiryDate,planStatus}=await checkExpiry()
      const currentdate=Date.now()

      //safety check beacuse of await 
      // if comp unmount do not update state
      if (ignore) return

      setPlanStatus(planStatus)
      if(currentdate > expiryDate){
        setIsloading(false)
        setExpired(false)
      }
      else{
        const expiry= new Date(parseInt(expiryDate)).toLocaleDateString("en-GB");
        setIsloading(false)
        setExpired(expiry)
      }
    })()

    return(()=>{
      ignore=true
    })
  },[sse,isPayment])

  //gsap animation for sticker
  useEffect(()=>{
     gsap.to(".expiry-outer-div",{
      opacity: 1,       // final opacity
      duration: 0.5,    // half a second
      ease: "power2.out"
    })

    gsap.to(".crown, .paid-text",{
      opacity: 1,       // final opacity
      duration: 0.5,    // half a second
      ease: "power2.out"
    })

  },[expired])

  return (
    <div className="flex flex-col gap-y-1 items-center">
      { 
        isloading ?(
          <div className="expiry-button p-[5px] rounded-lg select-none">
            <p className="flex gap-x-1 text-slate-50 text-[12px] px-[2px] font-semibold">
              <span>Expiry: </span> {<MoonLoader size={15}  color="#ffffff" speedMultiplier={1.2}/>}
            </p>
          </div>
        ):
        expired ? (
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
            <div className="text-slate-50">
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
      {
        expired &&
        (
          <div className="opacity-0 expiry-outer-div px-[5px] py-[3px] flex gap-x-1 max-w-[100px] items-center justify-center rounded-lg bg-slate-100">
            <div>
              {
                planStatus ==='paid' ?
                (
                  <div className="crown opacity-0 h-[12px] w-[12px]">
                    <Crown/>
                  </div>
                ):
                (
                  <div className="h-[12px] w-[12px]">
                    <Giftbox/>
                  </div>
                )
              }
            </div>

            <div>
              {
                planStatus==='paid' ?
                (
                  <p className="paid-text opacity-0 text-[9px] font-semibold select-none">premium user</p>
                ):
                (
                  <p className="text-[9px] font-semibold select-none">free trial access</p>
                )
              }
            </div>
          </div>
        )
      }
    </div>
  );
}
