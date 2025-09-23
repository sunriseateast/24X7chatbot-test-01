import Logout from "@/app/svg/Logout";
import { signOut } from "supertokens-auth-react/recipe/session";
import {useNavigate } from 'react-router-dom'

export default function Logoutaccount() {
  const navigate=useNavigate()

  const logout=async()=>{
    try{
      await signOut()
       navigate("/")
    }
    catch(error){
      alert("something went wrong")
    }
  }

  return (
    <div className="flex flex-col gap-y-2">
      <div className="space-y-2">
        <div className="flex gap-x-3">
          <a
            href="https://www.google.com/"
            className="text-blue-600 visited:text-purple-600 ... underline text-[12px]"
          >
            Terms & conditions
          </a>
          <a
            href="https://www.google.com/"
            className="mx-[11px] text-blue-600 visited:text-purple-600 ... underline text-[12px]"
          >
            Privacy & Policy
          </a>
        </div>
        <p className="text-center text-[12px] text-muted-foreground">
          © 24X7chatbot
        </p>
      </div>

      <div onClick={logout} className="flex items-center justify-center gap-x-3 cursor-pointer  hover:bg-[rgba(228,90,90,0.1)] rounded-lg p-[7px]">
        <div className="h-[18px] w-[18px] text-muted-foreground">
          <Logout />
        </div>
        <div className="text-muted-foreground mr-[8px]">
          <p className="select-none text-[15px] text-center">Logout</p>
        </div>
      </div>
    </div>
  );
}
