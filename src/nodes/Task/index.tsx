import React from "react";
import { Handle, Position } from "react-flow-renderer";
import { handleStyle, shape } from "./styles";

interface TaskProps {
  data: Node;
}

const Task: React.FC<TaskProps> = ({ data }) => {
  return (
    <>
      <Handle
        id="a"
        type="source"
        position={Position.Top}
        style={handleStyle}
      />
      <Handle
        id="b"
        type="source"
        position={Position.Bottom}
        style={handleStyle}
      />
      <Handle
        id="c"
        type="source"
        position={Position.Left}
        style={handleStyle}
      />
      <Handle
        id="d"
        type="source"
        position={Position.Right}
        style={handleStyle}
      />
      <div style={shape} />
    </>
  );
};

export default Task;
export { shape, handleStyle };
