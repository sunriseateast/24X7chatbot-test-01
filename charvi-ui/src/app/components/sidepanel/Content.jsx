import Lifebuoy from '@/app/svg/Lifebuoy'
import Youtube from '@/app/svg/Youtube'
import {SidebarGroup,SidebarGroupLabel,SidebarGroupContent} from '@/components/ui/sidebar'

export default function Content(){
    return(
        <SidebarGroup className={``}>
            <SidebarGroupLabel className={`flex items-center`}>
                <div className='text-muted-foreground font-semibold'>
                    <span>Help</span>
                </div>
            </SidebarGroupLabel>
            <SidebarGroupContent>
                <div className='grid'>
                    <div className='p-[8px] cursor-pointer flex items-center gap-x-1 hover:bg-[rgb(255,255,255,0.1)] rounded-lg'>
                        <div className='h-[18px] w-[18px] text-muted-foreground'>
                            <Youtube/>
                        </div>
                        <span className='text-slate-50'>Tutorials</span>
                    </div>
                    <div className='p-[8px] cursor-pointer flex items-center gap-x-1 hover:bg-[rgb(255,255,255,0.1)] rounded-lg'>
                        <div className='h-[18px] w-[18px] text-muted-foreground'>
                            <Lifebuoy/>
                        </div>
                        <span className='text-slate-50'>Support</span>
                    </div>
                </div>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}