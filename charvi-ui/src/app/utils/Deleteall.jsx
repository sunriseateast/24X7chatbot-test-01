import "../css/style.css";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Downarrow from "../svg/Downarrow";
import Message from "../svg/Message";
import Connection from "../svg/Connection";
import Line from "../svg/Line";
import { useReactFlow } from "@xyflow/react";
import useStore from "../hook/useStore.js";

export default function Deleteall() {
  const { getEdges, setEdges } = useReactFlow();
  const { getNodes, setNodes } = useReactFlow();
  const rmallNodes = useStore((state) => state.rmallNodes);
  const live = useStore((state) => state.live);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex items-center justify-center">
          <div className="text-[#EFEEEA] h-[15px] w-[15px]">
            <Downarrow />
          </div>
        </div>
      </PopoverTrigger>
      {live === false && (
        <PopoverContent className="flex flex-col border border-[#3C3D37] drop-shadow bg-[#303030] w-[190px] translate-y-[10px] -translate-x-[20px] rounded-xl p-[5px]">
          <div
            onClick={() => {
              setNodes([]);
              rmallNodes();
            }}
            className="flex space-x-[2px] hover:bg-[rgba(228,90,90,0.1)] active:bg-[#353535] rounded-lg p-[5px] cursor-pointer"
          >
            <div className="flex items-center relative px-[5px]">
              <div className= "text-zinc-400 h-[17px] w-[17px] flex items-center justify-center">
                <Message />
              </div>
              <div className="absolute top-1 right-1 text-red-500 h-[15px] w-[15px]">
                <Line />
              </div>
            </div>
            <span className="select-none text-slate-50 text-center text-[14px] font-semibold mb-[4px]">
              Delete messages
            </span>
          </div>

          <div
            onClick={() => setEdges([])}
            className="flex space-x-[2px] items-center active:bg-[#353535]  hover:bg-[rgba(228,90,90,0.1)] rounded-lg p-[5px] cursor-pointer"
          >
            <div className="flex items-center relative px-[5px]">
              <div className="text-zinc-400 h-[17px] w-[17px] flex items-center justify-center">
                <Connection />
              </div>
              <div className="absolute top-0 right-1  text-red-500 h-[15px] w-[15px]">
                <Line />
              </div>
            </div>
            <span className="select-none text-slate-50 text-center mb-[4px] text-[14px] font-semibold">
              Delete links
            </span>
          </div>
        </PopoverContent>
      )}
    </Popover>
  );
}
