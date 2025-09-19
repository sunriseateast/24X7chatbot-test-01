import { useState } from "react";
import "../css/style.css";
import useStore from "../hook/useStore.js";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Arrow from "../svg/Arrow";
import Beach from "../svg/Beach";
import Work from "../svg/Work";
import Toast from "../utils/Toast";

export default function Live() {
  const [islive, setIslive] = useState(false);
  const [templive, setTemplive] = useState(false);
  const getNodeObj = useStore((state) => state.getNodeObj);
  const errorArray = useStore((state) => state.errorArray);
  const setlive = useStore((state) => state.setlive);
  const temperror = [];

  const validation = (error) => {
    const allnodes = getNodeObj();
    for (const nodeID in allnodes) {
      const node = allnodes[nodeID];
      const isEmptyactiontittle = node.action.some(
        (item) => item.tittle.trim() === "",
      );
      const isEmptymenutittle = node.list.menuId && node.list.tittle === "";
      const isEmptymenurowtittle = node.list.rows.some(
        (item) => item.tittle.trim() === "",
      );
      const isEmptyurltittle = node.url.urlId && node.url.tittle === "";
      const isEmptyurllink = node.url.urlId && node.url.link === "";
      const isfilefailed = node.media.mediaId && node.media.file === "";

      if (
        isEmptyactiontittle ||
        isEmptymenutittle ||
        isEmptymenurowtittle ||
        isEmptyurltittle ||
        isEmptyurllink ||
        isfilefailed
      ) {
        error.push(nodeID);
      }
    }
    errorArray(error);
    if (Object.keys(allnodes).length === 0) {
      Toast(
        "Error Before Online",
        "Please create a flow before proceeding.",
        "Nomess",
      );
      return true;
    } else {
      if (error.length > 0) {
        Toast(
          "Error Before Online",
          <>
            <ul className="list-disc list-inside">
              <li>Add titles to all buttons.</li>
              <li>Ensure added media uploads correctly</li>
              <li>Each list row needs a title.</li>
            </ul>
          </>,
          "Err",
        );
        return error.length > 0;
      }
    }
  };

  return (
    <>
      <div
        onClick={() => {
          setTemplive((prev) => !prev);
        }}
        className="live-button-box select-none relative cursor-pointer flex items-center justify-center h-[25px] w-[60px] rounded-lg p-[10px]"
      >
        {islive ? (
          <span
            className={`text-[10px] transform-gpu transistion-all duration-300 translate-x-[9px] text-[#7A7A73] ease-in`}
          >
            online
          </span>
        ) : (
          <span
            className={`text-[10px] transform-gpu transistion-all duration-300 -translate-x-[9px] text-[#7A7A73] ease-in`}
          >
            offline
          </span>
        )}
        <button
          className={`absolute cursor-pointer drop-shadow-xl rounded-xl h-[18px] w-[18px] ${islive ? "transform-gpu bg-lime-500 live-button outline outline-lime-500 -translate-x-[18px] transistion-all duration-200 ease-in" : "live-og-circle transform-gpu translate-x-[18px] transistion-all duration-200 bg-white ease-in"}`}
        ></button>
      </div>

      {templive && (
        <AlertDialog open>
          <AlertDialogContent className="bg-[#EFEEEA] w-[400px] rounded-[25px]">
            <AlertDialogHeader>
              <AlertDialogTitle>
                {islive
                  ? "Are you sure to make ChatBot offline ?"
                  : "Are you sure to make ChatBot online ?"}
              </AlertDialogTitle>
              <AlertDialogDescription asChild>
                {islive ? (
                  <div>
                    <div className="flex items-center justify-center">
                      <div className="h-[300px] w-[300px]">
                        <Work />
                      </div>
                    </div>
                    <span className="font-semibold">
                      Once ChatBot is offline :
                    </span>
                    <div className="flex flex-col">
                      <div className="flex flex-row space-x-[7px]">
                        <div className="h-[19px] w-[18px] text-[#303030]">
                          <Arrow />
                        </div>
                        <span className="tracking-wide">
                          Messages can be edited
                        </span>
                      </div>
                      <div className="flex flex-row space-x-[7px]">
                        <div className="h-[19px] w-[18px] text-[#303030]">
                          <Arrow />
                        </div>
                        <span className="tracking-wide">
                          Connections are unlocked
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col rounded-[20px]">
                    <span className="font-semibold">
                      Once ChatBot is online :
                    </span>
                    <div className="flex space-x-20">
                      <div className="">
                        <div className="flex flex-col">
                          <div className="flex flex-row space-x-[7px]">
                            <div className="h-[19px] w-[18px] text-[#303030]">
                              <Arrow />
                            </div>
                            <span className="tracking-wide">
                              Messages cannot be edited
                            </span>
                          </div>
                          <div className="flex flex-row space-x-[7px]">
                            <div className="h-[19px] w-[18px] text-[#303030]">
                              <Arrow />
                            </div>
                            <span className="tracking-wide">
                              Connections are locked
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="">
                        <div className="h-[40px] w-[40px]">
                          <Beach />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel
                className={`hover:cursor-pointer`}
                onClick={() => {
                  if (islive == true) {
                    setIslive(true);
                    setlive(true);
                  } else {
                    setIslive(false);
                    setlive(false);
                  }
                  setTemplive(false);
                }}
              >
                Cancel
              </AlertDialogCancel>

              <AlertDialogAction
                className={`hover:cursor-pointer`}
                onClick={() => {
                  const valid = validation(temperror);
                  if (islive === true) {
                    setIslive(false);
                    setlive(false);
                  } else {
                    if (valid === true) {
                      setIslive(false);
                      setlive(false);
                    } else {
                      setIslive(true);
                      setlive(true);
                    }
                  }
                  setTemplive(false);
                }}
              >
                Confirm
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
}
