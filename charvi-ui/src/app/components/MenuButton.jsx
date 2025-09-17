import { useEffect, useState } from "react"
import Bsourcehandle from "../utils/Bsourcehandle.jsx"
import { v4 as uuid } from 'uuid';
import TextareaAutosize from 'react-textarea-autosize';
import DeleteEdge from "../utils/DeleteEdge.jsx";
import { useUpdateNodeInternals } from '@xyflow/react';
import Cancel from "../svg/Cancel.jsx";
import useRemoveEdge from '../hook/useRemoveEdge.js';
import useRemoveEdgebynode from "../hook/useRemoveEdgebynode.js";
import useStore from "../hook/useStore.js";
import React from 'react'

function MenuButton({nodeId,menuId}){
    const [menutittle,setMenutittle]=useState('')
    const updateNodeInternals = useUpdateNodeInternals();
    
    const addOrmMenuObj=useStore((state)=>state.addOrmMenuObj)
    const addrowMenuObj=useStore((state)=>state.addrowMenuObj)
    const removerowMenuObj=useStore((state)=>state.removerowMenuObj)

    const[rows,setRows]=useState([
        { id: uuid(), tittle: "", description: "" },
    ])

    const removeEdge = useRemoveEdge();
    const removeallEdges=useRemoveEdgebynode()

    //To remove respecetd edge after component unmount
    useEffect(()=>{
        addOrmMenuObj(nodeId,"",menuId)
        return(()=>{
            removeallEdges(nodeId)
            updateNodeInternals(nodeId)
        })
    },[nodeId])


    
    useEffect(()=>{
        rows.map((row,index)=>{
            addrowMenuObj(nodeId,row,row.id)
        })
    },[rows])


    //To update/To take input
    const updateRow=(index,field,value)=>{
        setRows((prev)=>
            prev.map((row,i)=>
                i===index ? {...row,[field]:value}:row
            )
        )
    }


    //To add rows
     const addRow = () => {
        if (rows.length < 10) {
        setRows([...rows, { id:uuid(), tittle: "", description: "" }]);
        updateNodeInternals(nodeId);
        }
    };

    //To delete rows
    const cancel = (nodeId,indexToDelete) => {
        removeEdge(nodeId,rows[indexToDelete].id)
        updateNodeInternals(nodeId); // Update handles
        removerowMenuObj(nodeId,indexToDelete)
        setRows((prev) => prev.filter((_, index) => index !== indexToDelete));
    };

    return (
        <div className="flex justify-center relative drop-shadow-xl">
            <div className="">
                <input maxLength={20} onBlur={()=>addOrmMenuObj(nodeId,menutittle,menuId)} onChange={(e)=>setMenutittle(e.target.value)} className="outline-none" placeholder='Tittle...' style={{ width: `${Math.max(48, Math.min((menutittle.length + 1) * 9, 200))}px` }} type='text'></input>
            </div>
            <div className="absolute w-[340px] rounded-xl bg-[#303030] -translate-y-[60px] translate-x-[350px] min-h-[30px]">
                <div className="p-[15px] w-full">
                    <div className="flex justify-end m-[2px]">
                        <button tabIndex={-1} onClick={addRow} className="cursor-pointer p-[5px] bg-white text-black font-normal rounded">Add Row</button>
                    </div>
                    <div className="flex flex-col space-y-[10px]">
                        {
                            rows.map((row,index)=>(
                                <div key={index} className="flex flex-row relative p-[2px]">
                                    <div className="flex space-x-1 rounded hover:bg-zinc-600 p-[7px]">
                                        {index!=0 &&
                                        <div onClick={()=>cancel(nodeId,index)} className="text-zinc-500">
                                            <Cancel className="cursor-pointer"/>
                                        </div>}
                                        <div>
                                            <input value={row.tittle} onChange={(e)=>updateRow(index,"tittle",e.target.value)} maxLength={24} className="text-white font-normal outline-none" placeholder={`Row ${index + 1} tittle...`} type='text'></input>
                                            <TextareaAutosize value={row.description} onChange={(e) =>updateRow(index,"description",e.target.value)} maxLength={72} className="no-focus-border border-none resize-none text-muted-foreground w-full outline-none font-normal" placeholder='Description (optional)...'/>
                                            <Bsourcehandle id={row.id}/>
                                        </div>   
                                    </div>
                                    <div className="m-[5px]">
                                        <DeleteEdge nodeId={nodeId} handleId={row.id}/>
                                    </div>
                                </div>
                           ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MenuButton