import Tick from "@/app/svg/Tick"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Setting from "@/app/svg/Setting"
import Link from "@/app/svg/Link"
import { useState } from "react"
import Whatsappbusiness from "@/app/svg/Whatsappbusiness"
import Meta from "@/app/svg/Meta"


export default function Profile(){
    const profileUrl=`https://pps.whatsapp.net/v/t61.24694-24/480614829_1268541134246218_1778835047991490715_n.jpg?ccb=11-4&oh=01_Q5Aa2gFxp6JMOssN7zpjbIzmODLreK5GH9OcqF0DCOcVpHV8Xg&oe=68CCF87E&_nc_sid=5e03e0&_nc_cat=101`
    const phoneNumber=`9284362969`
    const [logedIn,setLogedIn]=useState(false)

    return(
       <div>
            {logedIn ?
                (<div className="flex items-center gap-x-9 cursor-pointer hover:bg-[rgb(255,255,255,0.1)] rounded-lg h-full w-full p-[5px]">
                    <div className="flex gap-x-3 items-center justify-center">
                        <div>
                            <div className="h-[40px] w-[40px] flex items-center justify-center">
                                <img src={profileUrl} className="object-cover rounded-3xl"/>
                            </div>
                        </div>
                        <div className="text-slate-50">
                            <p className="">{phoneNumber}</p>
                            <div className="bg-[#303030]  rounded flex items-center justify-center space-x-[2px]">
                                <div className="h-[15px] w-[15px] text-lime-500">
                                <Tick/>
                                </div>
                                <span className="select-none text-[12px] text-center text-muted-foreground font-semibold">connected</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <div className="hover:text-red-500 text-[12px] bg-slate-100 rounded p-[5px] cursor-pointer">remove</div>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent side="right" align="start" className={`border border-[#3C3D37] drop-shadow bg-[#303030]`}>
                                <div className="select-none p-[5px] text-[12px] text-muted-foreground">
                                    <div className="flex items-center">
                                        <span className="group underline text-muted-foreground font-semibold">Open <span className="group-hover:text-lime-500">WhatsApp</span> Business App</span>
                                    </div>
                                    <div className="flex flex-col text-[12px] py-[5px]">
                                        <div className="group flex items-center gap-x-1">
                                            <span className="text-center">1. Go to settings</span>
                                            <div className="group-hover:text-yellow-500 h-[12px] w-[12px] mt-[3px]">
                                                <Setting/>
                                            </div>
                                        </div>
                                    <span>2. Click on accounts</span>
                                    <div className="group flex items-center gap-x-1">
                                            <span>3. Select Business platform</span>
                                            <div className="group-hover:text-blue-500 h-[16px] w-[16px] mt-[3px]">
                                                <Link/>
                                            </div>
                                    </div>
                                    <span>4. Click on our platform name</span>
                                    <span>5. Choose disconnect</span>
                                    </div>
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>)

            :    

                (<div className="p-[5px] relative">
                    <div className="business-login flex items-center justify-center gap-x-2 font-semibold cursor-pointer bg-slate-50 p-[10px] text-[12px] rounded-lg">
                        <div className="h-[25px] w-[25px]">
                            <Whatsappbusiness/>
                        </div>
                        <p className="text-center">
                            Login with existing account
                        </p>

                        <div className="flex items-center justify-center gap-x-1 absolute bottom-2 right-3">
                            <div className="h-[10px] w-[10px] text-blue-500 mt-[2px]">
                                <Meta/>
                            </div>
                            <span className="text-[8px] text-muted-foreground">Meta</span>
                        </div>
                    </div>
                </div>)
            }
       </div>
    )
}