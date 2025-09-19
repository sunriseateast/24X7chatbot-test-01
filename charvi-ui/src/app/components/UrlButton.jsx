import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import useStore from "../hook/useStore.js";
import React from "react";

function UrlButton({ nodeId, urlId }) {
  const [txturl, setTxtUrl] = useState("");
  const [linkurl, setLinkurl] = useState("");
  const addOrmurlObj = useStore((state) => state.addOrmurlObj);

  useEffect(() => {
    addOrmurlObj(nodeId, urlId, "", "");
  }, [nodeId]);

  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <input
            maxLength={20}
            defaultValue={txturl}
            readOnly
            className="outline-none"
            placeholder="Tittle..."
            style={{
              width: `${Math.max(48, Math.min((txturl.length + 1) * 8, 200))}px`,
            }}
            type="text"
          ></input>
        </PopoverTrigger>
        <PopoverContent className="text-white w-80 bg-[#303030] border border-[#3C3D37] drop-shadow-md">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="leading-none text-[#21c063] font-semibold">
                Tittle
              </h4>
              <p className="text-muted-foreground text-sm">
                Set Tittle and URL.
              </p>
            </div>
            <div className="grid gap-2">
              <div className="grid grid-cols-3 items-center gap-4">
                <label>Tittle</label>
                <Input
                  maxLength={20}
                  defaultValue={txturl}
                  className="col-span-2 h-8"
                  onChange={(e) => setTxtUrl(e.target.value)}
                  onBlur={() => addOrmurlObj(nodeId, urlId, txturl, linkurl)}
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <label>URL</label>
                <Input
                  defaultValue={linkurl}
                  maxLength={20}
                  className="col-span-2 h-8"
                  onChange={(e) => setLinkurl(e.target.value)}
                  onBlur={() => addOrmurlObj(nodeId, urlId, txturl, linkurl)}
                />
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default UrlButton;
