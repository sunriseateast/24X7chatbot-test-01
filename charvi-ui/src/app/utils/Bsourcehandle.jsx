import { Handle, useNodeConnections } from "@xyflow/react";

export default function Bsourcehandle(props) {
  const connections = useNodeConnections({
    handleType: "source",
    handleId: props.id,
  });

  return (
    <div>
      <Handle
        isConnectable={connections.length < 1}
        isConnectableEnd={false}
        isValidConnection={(connection) =>
          connection.source !== connection.target
        }
        className="p-[4px]"
        position="right"
        id={props.id}
      />
    </div>
  );
}
