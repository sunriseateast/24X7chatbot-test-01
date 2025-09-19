import { useState } from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import Door from "../svg/Door"
import Intelligence from "../svg/Intelligence"


export default function Expiry(){
    const [expired,setExpired]=useState(true)

    return(
        <div className="">
            {expired ? 
            (
            <Tooltip>
                <TooltipTrigger>
                    <div className="select-none cursor-pointer expired-button p-[5px] rounded-lg">
                        <p className="text-slate-50 text-[12px] px-[2px] font-semibold">
                            Expired ❗️
                        </p>
                    </div>
                </TooltipTrigger>
                <TooltipContent side="right" align="center" className={`my-[5px] select-none`}>
                    <div className="text-slaate-50">
                        <div className="flex items-center justify-center gap-x-1">
                             <p>Your plan is expired open panel</p>
                             <div className="h-[18px] w-[18px] text-muted-foreground">
                                <Door/>
                             </div>
                        </div>
                        <div className="flex items-center gap-x-1">
                             <p>Upgrade the plan</p>
                             <div className="h-[18px] w-[18px] text-muted-foreground">
                                <Intelligence/>
                             </div>
                        </div>
                    </div>
                </TooltipContent>
            </Tooltip>)

            :

            (<div className="expiry-button p-[5px] rounded-lg select-none">
                <p className="text-slate-50 text-[12px] px-[2px] font-semibold">
                    Expiry: 12/6/2025
                </p>
            </div>
            )}
        </div>
    )
}