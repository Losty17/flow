import React, { CSSProperties, useCallback } from "react";
import { Handle, Position } from "react-flow-renderer";

const handleStyle = { left: 10 };

interface TaskProps {
  data: Node;
}

const Task: React.FC<TaskProps> = ({ data }) => {
  const onChange = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    console.log(evt.target.value);
  }, []);

  const shape: CSSProperties = {
    width: "50px",
    height: "30px",
    background: "#F2F4FF",
    border: "1px solid #217BA6",
    borderRadius: "5px",
  };

  const handleStyle: CSSProperties = {
    background: "rgba(0, 0, 0, 0)",
    border: "1px solid rgba(100, 100, 100, 0.5)",
  };
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
