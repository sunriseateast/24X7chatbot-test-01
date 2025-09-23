//svg
import Lifebuoy from "@/app/svg/Lifebuoy";
import Youtube from "@/app/svg/Youtube";
import Next from "@/app/svg/Next";
import Intelligence from "@/app/svg/Intelligence";

//sidebar
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";


// gsap
import gsap from "gsap";
gsap.registerPlugin(TextPlugin);

// react
import { useEffect, useState } from "react";
import useCreateorder from "@parent-hooks/useCreateorder"
import usePayment from "@parent-hooks/usePayment";
import {useNavigate} from 'react-router-dom'

//Toast
import Toast from "@/app/utils/Toast";

export default function Content() {
  const features = [
    "no need to create flows😇",
    "avoid complex structure🥴",
    "reply like your business expert🥰",
  ];
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  const [onemonthplan,setOnemonthplan]=useState()
  const [threemonthplan,setThreemonthplan]=useState()
  const [oneyearplan,setOneyearplan]=useState()
  const [isPayment,setIsPayment]=useState(false)
  const navigation=useNavigate()

  const verifyPayment=usePayment()
  const RZP_ID=import.meta.env.VITE_RZP_ID

  // creating order-id
  useEffect(()=>{
    const createOrder=useCreateorder()
    ;(async()=>{
      
      //1 month plan
      const onemonthplan=await createOrder('499')
      setOnemonthplan(onemonthplan)
    
      //3 month plan
      const threemonthplan=await createOrder('449')
      setThreemonthplan(threemonthplan)

      //1 year plan
      const oneyearplan=await createOrder('399')
      setOneyearplan(oneyearplan)

    })()
  },[isPayment])

  console.log(isPayment)

  // console.log("1 Month response:",onemonthplan)
  // console.log("3 Month response:",threemonthplan)
  // console.log("1 Year response:",oneyearplan)

  
  // payment verifcation and options functions
  const paynow=(plan)=>{
    if(!plan){
      Toast("Something went wrong","please try again later","ordererr")
    }
    else{
       const  options = {
            "key": RZP_ID, // Enter the Key ID generated from the Dashboard
            "currency": "INR",
            "name": "Acme Corp", //your business name
            "description": "Test Transaction",
            "image": "",
            "order_id": plan.orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "handler": async(response)=>{
              const payment=await verifyPayment(response)
              setIsPayment(payment)
            },
            "theme": {
              "color": "#3399cc"
            },
            "prefill": {
              contact: '+9999999999'
            },
            modal: {
              ondismiss: function () {
                Toast("Payment Cancelled", "You can try again anytime", "paymentCancelled");
                navigation("/app")
              }
            }
        }
        const rzp1 = new Razorpay(options);
          rzp1.on('payment.failed', function (response){
            //on is event listerner we cannot throw into catch or fetch 
            Toast("Something went wrong",response.error.description,"verifypaymentError")
          });
          rzp1.open();
        }
  }

  // animation
  useEffect(() => {
    if (!collapsed) {
      const tlMaster = gsap.timeline({ repeat: -2 });
      features.forEach((word) => {
        let tlText = gsap.timeline({ repeat: -1, yoyo: true });
        tlText.to(".animated-text", { duration: 5, text: word });
        tlMaster.add(tlText);
      });

      const cursorAnime = gsap.to(".cursor", {
        opacity: 0,
        repeat: -1,
        yoyo: true,
        duration: 0.5,
        ease: "power2.inOut",
      });
      return () => {
        tlMaster.kill();
        cursorAnime.kill();
      };
    }
  }, [features]);

  return (
    <SidebarGroup
      className={`flex gap-y-[15px] flex-col-4 transistion-all duration-300`}
    >
      <div>
        <SidebarGroupLabel className={`flex items-center`}>
          <div className="text-muted-foreground font-semibold">
            <span>Platform</span>
          </div>
        </SidebarGroupLabel>
        <Collapsible className="group/collapsible">
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton
                className={`cursor-pointer group rounded-lg py-[18px] w-full data-[state=closed]:hover:bg-[rgb(255,255,255,0.1)] data-[state=open]:hover:bg-[rgb(255,255,255,0.1)]`}
              >
                <div className="flex gap-x-2">
                  <div className="h-[18px] w-[18px] text-muted-foreground">
                    <Intelligence />
                  </div>

                  <div className="flex gap-x-30 text-slate-50 font-semibold">
                    <span className="text-center">Upgrade</span>
                    <div className="transition-transform duration-200 group-data-[state=open]:rotate-90 h-[18px] w-[18px] text-muted-foreground mt-[2px]">
                      <Next />
                    </div>
                  </div>
                </div>
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem className={`cursor-pointer`}>
                  <div onClick={()=>paynow(onemonthplan)} className="hover:bg-[rgb(255,255,255,0.1)] rounded-lg p-[4px] text-slate-50">
                    <span className="mx-[5px]">
                      Rs.499
                      <span className="font-semibold text-muted-foreground text-[12px]">
                        {" "}
                        (1 month)
                      </span>
                    </span>
                    <span className="mx-[11px] text-blue-600 visited:text-purple-600 ... underline text-[12px]">
                      Pay Now
                    </span>
                  </div>

                  <div onClick={()=>paynow(threemonthplan)} className="hover:bg-[rgb(255,255,255,0.1)] rounded-lg p-[4px] text-slate-50">
                    <span className="mx-[5px]">
                      Rs.449
                      <span className="font-semibold text-muted-foreground text-[12px]">
                        {" "}
                        (3 months)
                      </span>
                    </span>
                    <span className="mx-[5px] text-blue-600 visited:text-purple-600 ... underline text-[12px]">
                      Pay Now
                    </span>
                  </div>

                  <div onClick={()=>paynow(oneyearplan)} className="hover:bg-[rgb(255,255,255,0.1)] rounded-lg p-[4px] text-slate-50">
                    <span className="mx-[5px]">
                      Rs.399
                      <span className="font-semibold text-muted-foreground text-[12px]">
                        {" "}
                        (12 months)
                      </span>
                    </span>
                    <span className="text-blue-600 visited:text-purple-600 ... underline text-[12px]">
                      Pay Now
                    </span>
                  </div>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      </div>

      <div className="">
        <SidebarGroupLabel className={`flex items-center`}>
          <div className="text-muted-foreground font-semibold">
            <span>Coming Soon</span>
          </div>
        </SidebarGroupLabel>
        <div className="select-none text-slate-50 text-[12px] w-full rounded-lg bg-black">
          <div className="m-[10px] p-[5px]">
            <p className="text-amber-500"># Ai ❤️</p>
            <p className="text-slate-300 para">
              <span className="animated-text"></span>
              <span className="cursor font-bold">_</span>
            </p>
          </div>
        </div>
      </div>

      <div className="">
        <SidebarGroupLabel className={`flex items-center`}>
          <div className="text-muted-foreground font-semibold">
            <span>Help</span>
          </div>
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <div className="grid">
            <div className="p-[8px] cursor-pointer flex items-center gap-x-2 hover:bg-[rgb(255,255,255,0.1)] rounded-lg">
              <div className="h-[18px] w-[18px] text-muted-foreground">
                <Youtube />
              </div>
              <span className="text-slate-50">Tutorials</span>
            </div>
            <div className="p-[8px] cursor-pointer flex items-center gap-x-2 hover:bg-[rgb(255,255,255,0.1)] rounded-lg">
              <div className="h-[18px] w-[18px] text-muted-foreground">
                <Lifebuoy />
              </div>
              <span className="text-slate-50">Support</span>
            </div>
          </div>
        </SidebarGroupContent>
      </div>
    </SidebarGroup>
  );
}
