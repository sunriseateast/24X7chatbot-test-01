import Tick from "../svg/Tick"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Twoarrow from "../svg/Twoarrow"
import Logout from "../svg/Logout"
import Meta from "../svg/Meta"
import Debitcard from "../svg/Debitcard"


export default function Profile(){
    const profileUrl=`https://pps.whatsapp.net/v/t61.24694-24/480614829_1268541134246218_1778835047991490715_n.jpg?ccb=11-4&oh=01_Q5Aa2gFxp6JMOssN7zpjbIzmODLreK5GH9OcqF0DCOcVpHV8Xg&oe=68CCF87E&_nc_sid=5e03e0&_nc_cat=101`
    const phoneNumber=`9284362969`

    return(
        <div className="flex gap-x-3 items-center justify-center">
            <div>
                <div className="h-[40px] w-[40px] flex items-center justify-center">
                    <img src={profileUrl} className="object-cover rounded-3xl"/>
                </div>
            </div>
            <div className="text-white">
                <p className="">{phoneNumber}</p>
                <div className="bg-[#303030]  rounded flex items-center justify-center space-x-[2px]">
                    <div className="h-[15px] w-[15px] text-lime-500">
                        <Tick/>
                    </div>
                    <span className="select-none text-[12px] text-center text-muted-foreground font-semibold">connected</span>
                </div>
            </div>
            <Popover>
                <PopoverTrigger asChild>
                    <div className="rounded cursor-pointer h-[18px] w-[18px] bg-slate-100 flex items-center justify-center">
                        <div className="h-[17px] w-[17px] text-muted-foreground">
                            <Twoarrow/>
                        </div>
                    </div>
                </PopoverTrigger>
                <PopoverContent className="flex flex-col border border-[#3C3D37] drop-shadow bg-[#303030] w-[190px] translate-y-[10px] -translate-x-[20px] rounded-xl p-[5px]">
                    <div className="border-b border-[#3C3D37] py-[5px]">
                        <div className="flex space-x-[2px] hover:bg-[rgb(255,255,255,0.1)] rounded-lg p-[5px] cursor-pointer">
                        <div className="flex items-center relative px-[5px]">
                            <div className="text-zinc-400 h-[17px] w-[17px] flex items-center justify-center">
                                <Debitcard/>
                            </div>
                        </div>
                        <span className="select-none text-slate-50 text-center text-[14px] font-semibold mb-[4px]">Upgrade</span>
                    </div>
                    </div>

                    <Popover>
                        <PopoverTrigger>
                            <div className="mt-[5px] flex space-x-[2px] items-center  text-zinc-400 hover:text-blue-500  hover:bg-[rgb(255,255,255,0.1)] rounded-lg p-[5px] cursor-pointer">
                                <div className="flex items-center relative px-[5px]">
                                    <div className="h-[17px] w-[17px] flex items-center justify-center">
                                        <Meta/>
                                    </div>
                                </div>
                                <span className="select-none text-slate-50 text-center mb-[4px] text-[14px] font-semibold">Disconnect</span>
                            </div>
                        </PopoverTrigger>
                        <PopoverContent className="border border-[#3C3D37] drop-shadow bg-[#303030] w-[190px] translate-x-[242px] -translate-y-[38px]">
                            <p>
                                
                            </p>
                        </PopoverContent>
                    </Popover>

                    <div className="flex space-x-[2px] items-center text-zinc-400 hover:text-red-500 hover:bg-[rgb(255,255,255,0.1)] rounded-lg p-[5px] cursor-pointer">
                        <div className="flex items-center relative px-[5px]">
                            <div className=" h-[17px] w-[17px] flex items-center justify-center">
                                <Logout/>
                            </div>
                        </div>
                        <span className="select-none text-slate-50 text-center mb-[4px] text-[14px] font-semibold">Logout</span>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}