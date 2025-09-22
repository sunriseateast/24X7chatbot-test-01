import {useNavigate } from 'react-router-dom'

export default function Home(){
    const navigate=useNavigate()
    
    return(
        <div className="flex gap-x-5">
            <button className="cursor-pointer p-[5px] bg-lime-500 rounded-lg" onClick={()=>navigate("/app")}>Dashboard</button>
            <button className="cursor-pointer p-[5px] bg-blue-500 rounded-lg">Pay Now</button>
        </div>
    )
}