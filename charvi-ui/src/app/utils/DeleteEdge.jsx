// DeleteEdgeButton.jsx
import useRemoveEdge from '../hook/useRemoveEdge.js';

export default function DeleteEdge({ nodeId, handleId }) {
  const removeEdge = useRemoveEdge();
  
  return (
   <div
      onClick={()=>removeEdge(nodeId,handleId)}
      className="flex items-center justify-center h-[20px] w-[20px] rounded bg-zinc-600 hover:text-red-500 cursor-pointer text-muted-foreground"
      title="Delete edge"
      tabIndex={-1} 
    >
      <button className='text-center cursor-pointer' tabIndex={-1} >D</button>
    </div>
  );
}
