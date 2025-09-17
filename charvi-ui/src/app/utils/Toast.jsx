import toast from 'react-hot-toast';
import '../css/style.css'

export function Toast(message,desc,toastId) {
  return(
     toast(
      <div className='relative m-[5px] w-full h-full text-[#EFEEEA] rounded border-l-4 p-[5px] border-red-500'>
        <button onClick={()=>toast.dismiss(toastId)} className='cursor-pointer text-muted-foreground absolute right-0 '>x</button>
        <div className='flex flex-col space-y-[2px] m-[2px] ml-[20px]'>
          <span className='select-none text-[16px]'>{message}</span>
          <span className='select-none text-muted-foreground text-[13px]'>{desc}</span>
        </div>
      </div>,
      {
        id:toastId,
        style:{
          background:'#303030',
          borderRadius:'7px',
          width:'320px',
          padding:'0px'
        }
      })
    )
}

export default Toast
