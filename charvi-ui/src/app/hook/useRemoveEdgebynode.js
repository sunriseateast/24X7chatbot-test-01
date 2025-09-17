import { useReactFlow } from '@xyflow/react';

export default function useRemoveEdgebynode(){
    const { getEdges, setEdges } = useReactFlow();
    
    const removeallEdges=(nodeId)=>{
        const currentEdges=getEdges()

        const connectedEdges=currentEdges.filter(
            (e)=>(e.source!==nodeId && e.target!==nodeId)
        )
        setEdges(connectedEdges)
    }

    return removeallEdges
}