import Lifebuoy from '@/app/svg/Lifebuoy'
import Youtube from '@/app/svg/Youtube'
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarMenuSub,
    SidebarMenuSubItem,
    useSidebar

} from '@/components/ui/sidebar'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import Next from '@/app/svg/Next'
import Intelligence from '@/app/svg/Intelligence'

import gsap from 'gsap'
gsap.registerPlugin(TextPlugin);

import { useEffect } from 'react'

export default function Content(){
    const features=["no need to create flows😇","avoid complex structure🥴","reply like your business expert🥰"]
    const {state}=useSidebar()
    const collapsed=state==="collapsed"

    useEffect(()=>{
        if(state){
            const tlMaster=gsap.timeline({repeat:-2})
            features.forEach((word)=>{
                let tlText=gsap.timeline({repeat:-1,yoyo:true})
                tlText.to(".animated-text",{duration:5,text:word})
                tlMaster.add(tlText)
            })

            const cursorAnime=gsap.to(".cursor",{
                opacity:0,
                repeat:-1,
                yoyo:true,
                duration:0.5,
                ease:"power2.inOut"
            })
            return(()=>{
                tlMaster.kill()
                cursorAnime.kill()
            })
        }
    },[features])

    return(
        <SidebarGroup className={`flex gap-y-[15px] flex-col-4 transistion-all duration-300`}>
            <div>
                <SidebarGroupLabel className={`flex items-center`}>
                    <div className='text-muted-foreground font-semibold'>
                        <span>Platform</span>
                    </div>
                </SidebarGroupLabel>
                <Collapsible defaultOpen className="group/collapsible">
                    <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                        <SidebarMenuButton className={`cursor-pointer group rounded-lg py-[18px] w-full data-[state=closed]:hover:bg-[rgb(255,255,255,0.1)] data-[state=open]:hover:bg-[rgb(255,255,255,0.1)]`}>
                            <div className='flex gap-x-2'>
                                <div className='h-[18px] w-[18px] text-muted-foreground'>
                                    <Intelligence/>
                                </div>

                                <div className='flex gap-x-30 text-slate-50 font-semibold'>
                                    <span className='text-center'>Upgrade</span>
                                    <div className='transition-transform duration-200 group-data-[state=open]:rotate-90 h-[18px] w-[18px] text-muted-foreground mt-[2px]'>
                                        <Next/>
                                    </div>
                                </div>
                            </div>
                        </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <SidebarMenuSub>
                            <SidebarMenuSubItem className={`cursor-pointer`}>
                                <div className='hover:bg-[rgb(255,255,255,0.1)] rounded-lg p-[4px] text-slate-50'>
                                    <span className='mx-[5px]'>
                                        Rs.499
                                        <span className='font-semibold text-muted-foreground text-[12px]'> (1 month)</span>
                                    </span>
                                    <a href="http://localhost:5173/" className="mx-[11px] text-blue-600 visited:text-purple-600 ... underline text-[12px]">Pay Now</a>
                                </div>
                                <div className='hover:bg-[rgb(255,255,255,0.1)] rounded-lg p-[4px] text-slate-50'>
                                    <span className='mx-[5px]'>
                                        Rs.449
                                        <span className='font-semibold text-muted-foreground text-[12px]'> (3 months)</span>
                                    </span>
                                    <a href="http://localhost:5173/" className="mx-[5px] text-blue-600 visited:text-purple-600 ... underline text-[12px]">Pay Now</a>
                                </div>
                                <div className='hover:bg-[rgb(255,255,255,0.1)] rounded-lg p-[4px] text-slate-50'>
                                    <span className='mx-[5px]'>
                                        Rs.399
                                        <span className='font-semibold text-muted-foreground text-[12px]'> (12 months)</span>
                                    </span>
                                    <a href="http://localhost:5173/" className="text-blue-600 visited:text-purple-600 ... underline text-[12px]">Pay Now</a>
                                </div>
                            </SidebarMenuSubItem>
                        </SidebarMenuSub>
                    </CollapsibleContent>
                    </SidebarMenuItem>
                </Collapsible>
            </div>

            <div className=''>
                 <SidebarGroupLabel className={`flex items-center`}>
                    <div className='text-muted-foreground font-semibold'>
                        <span>Coming Soon</span>
                    </div>
                </SidebarGroupLabel>
                <div className='select-none text-slate-50 text-[12px] w-full rounded-lg bg-black'>
                    <div className='m-[10px] p-[5px]'>
                        <p className='text-amber-500'># Ai ❤️</p>
                        <p className='text-slate-300 para'><span className='animated-text'></span><span className='cursor font-bold'>_</span></p>
                    </div>
                </div>
            </div>


            <div className=''>
                  <SidebarGroupLabel className={`flex items-center`}>
                    <div className='text-muted-foreground font-semibold'>
                        <span>Help</span>
                    </div>
                </SidebarGroupLabel>
                <SidebarGroupContent>
                    <div className='grid'>
                        <div className='p-[8px] cursor-pointer flex items-center gap-x-2 hover:bg-[rgb(255,255,255,0.1)] rounded-lg'>
                            <div className='h-[18px] w-[18px] text-muted-foreground'>
                                <Youtube/>
                            </div>
                            <span className='text-slate-50'>Tutorials</span>
                        </div>
                        <div className='p-[8px] cursor-pointer flex items-center gap-x-2 hover:bg-[rgb(255,255,255,0.1)] rounded-lg'>
                            <div className='h-[18px] w-[18px] text-muted-foreground'>
                                <Lifebuoy/>
                            </div>
                            <span className='text-slate-50'>Support</span>
                        </div>
                    </div>
                </SidebarGroupContent>
            </div>
        

        </SidebarGroup>
    )
}