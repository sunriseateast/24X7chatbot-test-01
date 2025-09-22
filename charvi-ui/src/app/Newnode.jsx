import { useCallback, useEffect, useState } from "react";
import Trash from "./svg/Trash";
import { useReactFlow } from "@xyflow/react";
import "./css/node.css";
import Drag from "./svg/Drag";
import TextareaAutosize from "react-textarea-autosize";
import Fileupload from "./utils/Fileupload.jsx";
import Cancel from "./svg/Cancel";
import React from "react";
import Action from "./svg/Action";
import Url from "./svg/Url";
import List from "./svg/List";
import { Handle, useUpdateNodeInternals } from "@xyflow/react";
import MenuButton from "./components/MenuButton.jsx";
import ActionButton from "./components/ActionButton.jsx";
import UrlButton from "./components/UrlButton.jsx";
import useStore from "./hook/useStore.js";
import Toast from "./utils/Toast.jsx";

function Newnode({ selected, id, data }) {
  const { deleteElements } = useReactFlow(); // To delete Node using id
  const [values, setValues] = useState([]); // Act as bowl of buttons here
  const updateNodeInternals = useUpdateNodeInternals(); // To update Nodes
  const [handleid, setHandleid] = useState(
    // To create random id
    Date.now().toString() + Math.random().toString(36).substring(2),
  );

  // This are store functions
  const addNodeObj = useStore((state) => state.addNodeObj);
  const removeNodeObj = useStore((state) => state.removeNodeObj);
  const removeActionObj = useStore((state) => state.removeActionObj);
  const addOrmMenuObj = useStore((state) => state.addOrmMenuObj);
  const addOrmurlObj = useStore((state) => state.addOrmurlObj);
  const removeEntirerow = useStore((state) => state.removeEntirerow);
  const addOrmediaObj = useStore((state) => state.addOrmediaObj);
  const live = useStore((state) => state.live);

  // For validation
  const [validationError, setValidationError] = useState([]);
  const [isvalidation, setIsValidation] = useState(false);

  // Shows live updates of store validationError array
  useEffect(() => {
    const unsubscribe = useStore.subscribe(
      (state) => state.validationError,
      (newArray) => {
        setValidationError(newArray);
      },
    );
    return () => unsubscribe();
  }, []);

  // Runs when validationError is there and sets it to true if NodeId found
  useEffect(() => {
    const isError = validationError.includes(id);
    setIsValidation(isError);
  }, [validationError, id]);

  // Initalizer to add empty node object into store
  useEffect(() => {
    addNodeObj(id);
  }, [id]);

  // Update node internals
  useEffect(() => {
    updateNodeInternals(id);
  }, [id, handleid, updateNodeInternals]);

  //its acts as a bowl for buttons
  useEffect(() => {
    if (data.addbutton.tittle == "url") {
      //if url is provide in data it checks first action is present or not in bowl
      if (values.some((item) => item.tittle == "action")) {
        Toast(
          "Whatsapp Limitaions",
          "Interactive + Url Button not allowed",
          "Int+Url",
        );
      } else if (values.some((item) => item.tittle == "list")) {
        Toast(
          "Whatsapp Limitaions",
          "List + Url Button not allowed",
          "Lst+Url",
        );
      } else {
        if (
          values.some((item) => item.tittle == "media") &&
          data.addbutton.tittle == "url" &&
          values.length < 2
        ) {
          setValues((prev) => {
            return [...prev, data.addbutton];
          });
        } else if (data.addbutton.tittle == "url" && values.length < 1) {
          setValues((prev) => {
            return [...prev, data.addbutton];
          });
        } else {
          Toast("Whatsapp Limitaions", "Only 1 Url Button allowed", "Url");
        }
      }
    }

    if (data.addbutton.tittle == "action") {
      // if action is provide in data it check url is present or not in bowl
      if (values.some((item) => item.tittle == "url")) {
        Toast(
          "Whatsapp Limitaions",
          "Url + Interactive Button not allowed",
          "Url+Int",
        );
      } else if (values.some((item) => item.tittle == "list")) {
        Toast(
          "Whatsapp Limitaions",
          "List + Interactive Button not allowed",
          "Lst+Int",
        );
      } else {
        if (
          values.some((item) => item.tittle == "media") &&
          data.addbutton.tittle == "action" &&
          values.length < 4
        ) {
          setValues((prev) => {
            return [...prev, data.addbutton];
          });
        } else if (data.addbutton.tittle == "action" && values.length < 3) {
          setValues((prev) => {
            return [...prev, data.addbutton];
          });
        } else {
          Toast(
            "Whatsapp Limitaions",
            "Only 3 Intractive Buttons are allowed",
            "Int",
          );
        }
      }
    }

    if (data.addbutton.tittle == "list") {
      if (values.some((item) => item.tittle == "url")) {
        Toast(
          "Whatsapp Limitaions",
          "Url + List Button not allowed",
          "Url+Lst",
        );
      } else if (values.some((item) => item.tittle == "action")) {
        Toast(
          "Whatsapp Limitaions",
          "Interactive + List Button not allowed",
          "Int+Lst",
        );
      } else {
        if (
          values.some((item) => item.tittle == "media") &&
          data.addbutton.tittle == "list" &&
          values.length < 2
        ) {
          setValues((prev) => {
            return [...prev, data.addbutton];
          });
        } else if (data.addbutton.tittle == "list" && values.length < 1) {
          setValues((prev) => {
            return [...prev, data.addbutton];
          });
        } else {
          Toast("Whatsapp Limitaions", "Only 1 List Button are allowed", "Lst");
        }
      }
    }

    if (data.addbutton.tittle == "media") {
      if (!values.some((item) => item.tittle === "media")) {
        setValues((prev) => {
          return [...prev, data.addbutton];
        });
      }
    }
  }, [data.addbutton, id]);

  // To delete particular node
  const deleteNode = () => {
    deleteElements({ nodes: [{ id }] });
    removeNodeObj(id); // We need to remove from store also
  };

  //Remove on basis of bowlof buttons
  const remove = (idToRemove, titleToRemove) => {
    updateNodeInternals(id);
    setValues((prev) =>
      prev.filter(
        (item) => !(item.id === idToRemove && item.tittle === titleToRemove),
      ),
    );
    data.rmMediaorButons(idToRemove); //We need to call it so flow will get rerender and useffect will run

    if (titleToRemove == "action") {
      removeActionObj(id, idToRemove);
    } else if (titleToRemove == "list") {
      addOrmMenuObj(id, "", "");
      removeEntirerow(id);
    } else if (titleToRemove == "url") {
      addOrmurlObj(id, "", "", "");
    } else if (titleToRemove == "media") {
      addOrmediaObj(id, "", "");
    }
  };

  const getText = useCallback((event) => {
    // Your text handling logic here
  }, []);

  return (
    <div
      className={`
        text-white
        border border-[#3C3D37]
        leading-[20px]
        node
        whitespace-pre-wrap
        flex content-center justify-center
        w-[340px]
        p-[20px]
        ${selected ? "outline-2 outline-[#21c063]" : ""}
        ${isvalidation ? "outline-2 outline-red-500" : ""}
        rounded-xl`}
    >
      <div>
        <Handle
          isConnectableStart={false}
          isConnectable={!live}
          className="p-[4px]"
          type="target"
          position="left"
          id={handleid}
        />
        <div
          onClick={deleteNode}
          className="cursor-pointer p-[7px] rounded-xl absolute top-0 right-0 grid justify-items-end text-zinc-600 hover:text-red-500"
        >
          <div>
            <Trash />
          </div>
        </div>
        <div className="absolute">
          {values.some((item) => item.tittle === "media") && (
            <button
              onClick={() => {
                const mediaItem = values.find((item) => item.tittle == "media");
                remove(mediaItem.id, "media");
              }}
              className="text-[#FFFDF6] cursor-pointer"
            >
              <Cancel />
            </button>
          )}
        </div>
        <div onChange={getText} className="my-[12px] w-[320px]">
          {values.some((item) => item.tittle === "media") && (
            <div className="my-[15px] flex items-center justify-center min-h-[220px]">
              <div className="bg-[#FFFDF6] p-[1px] rounded">
                <Fileupload nodeId={id} mediaId={data.addbutton.id} />
              </div>
            </div>
          )}
          <TextareaAutosize
            placeholder="Type message here"
            minRows={3}
            maxRows={15}
            spellCheck={false}
            className="nodrag w-full no-focus-border border-none resize-none text-[16px]"
          />
        </div>
        <div className="text-[#21c063] font-semibold">
          {values
            .filter((item) => item.tittle === "action")
            .map((item, index) => (
              <div
                key={item.id}
                className="relative cursor-pointer w-full flex items-center justify-center gap-x-[8px] p-[8px] border-t border-zinc-600"
              >
                <div
                  onClick={() => remove(item.id, "action")}
                  className="text-zinc-600 absolute left-1"
                >
                  <Cancel />
                </div>
                <div className="h-[18px] w-[18px]">
                  <Action />
                </div>
                <div>
                  <ActionButton nodeId={id} buttonId={item.id} />
                </div>
              </div>
            ))}

          {values.some((item) => item.tittle === "url") && (
            <div className="relative cursor-pointer flex flex-col-2 items-center justify-center gap-x-[8px] p-[8px] text-center w-full border-t border-zinc-600">
              <div
                onClick={() => {
                  const urlItem = values.find((item) => item.tittle == "url");
                  remove(urlItem.id, "url");
                }}
                className="text-zinc-600 absolute left-1"
              >
                <Cancel />
              </div>
              <div className="h-[18px] w-[18px] flex items-center justify-center">
                <Url />
              </div>
              <div>
                <UrlButton nodeId={id} urlId={data.addbutton.id} />
              </div>
            </div>
          )}
          {values.some((item) => item.tittle === "list") && (
            <div className="cursor-pointer w-full flex items-center justify-center gap-x-[8px] p-[8px] border-t border-zinc-600">
              <div
                onClick={() => {
                  const listItem = values.find((item) => item.tittle == "list");
                  remove(listItem.id, "list");
                }}
                className="text-zinc-600 absolute left-1"
              >
                <Cancel />
              </div>
              <div className="h-[19px] w-[19px] flex items-center justify-center">
                <List />
              </div>
              <div>
                <MenuButton nodeId={id} menuId={data.addbutton.id} />
              </div>
            </div>
          )}
        </div>
        <div className="p-[5px] flex justify-center items-center text-slate-400">
          <div className="absolute bottom-0 text-zinc-600">
            <Drag />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newnode;
