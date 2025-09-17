import Logout from "@/app/svg/Logout"
export default function Logoutaccount(){
    return(
        <div className="flex items-center justify-center gap-x-3 cursor-pointer p-[5px]">
             <div className="h-[20px] w-[20px] text-muted-foreground">
                <Logout/>
            </div>
            <div className="text-muted-foreground flex items-center justify-center">
                <span className="text-[15px] text-center">Logout</span>
            </div>
        </div>
    )
}