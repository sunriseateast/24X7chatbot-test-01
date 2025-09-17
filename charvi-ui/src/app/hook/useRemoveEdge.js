  import { useReactFlow } from '@xyflow/react';

  export default function useRemoveEdge(){
    const { getEdges, setEdges } = useReactFlow();

    const removeEdge = (nodeId,handleId) => {
      const currentEdges = getEdges();
      
      const connectedEdges = currentEdges.filter(
        (e) => !(e.source === nodeId && e.sourceHandle === handleId)
      );
      setEdges(connectedEdges);
    };

    return removeEdge
  }