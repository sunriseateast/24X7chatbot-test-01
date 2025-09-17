import { useEffect, useState} from "react"
import React from 'react'
import DeleteEdge from "../utils/DeleteEdge.jsx"
import Bsourcehandle from "../utils/Bsourcehandle.jsx"
import useRemoveEdge from '../hook/useRemoveEdge.js';
import useStore from "../hook/useStore.js";
import { v4 as uuid } from 'uuid';

function ActionButton({nodeId,buttonId}){
    const [actiontittle,setActiontittle]=useState('')
    const [buttonhandleid,setButtonhandleid]=useState(
        uuid()
    )
    
    const addActionObj=useStore((state)=>state.addActionObj)

    const removeEdge = useRemoveEdge();

    //To remove respecetd edge after component unmount
    useEffect(()=>{
        addActionObj(nodeId,"",buttonId)
        return(()=>{
            removeEdge(nodeId,buttonhandleid)
        })
    },[nodeId])

    return(
        <>
            <Bsourcehandle id={buttonhandleid}/>
            <div>
                <input  maxLength={20} onChange={(e)=>setActiontittle(e.target.value)} onBlur={()=>addActionObj(nodeId,actiontittle,buttonId)} className="outline-none" placeholder='Tittle...' style={{ width: `${Math.max(48, Math.min((actiontittle.length + 1) * 9, 200))}px` }} type='text'></input>
            </div>
            <div className="absolute right-1 top-1 m-[5px]">
                <DeleteEdge nodeId={nodeId} handleId={buttonhandleid}/>
            </div>
        </>
    )
};

export default ActionButton