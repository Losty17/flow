import React, { CSSProperties, useCallback } from "react";
import { Handle, Position } from "react-flow-renderer";

interface StartProps {
  data: Node;
}

const Start: React.FC<StartProps> = ({ data }) => {
  const shape: CSSProperties = {
    width: "20px",
    height: "20px",
    background: "#88dd88",
    border: "2px solid #449944",
    borderRadius: "50%",
  };

  const handleStyle: CSSProperties = {
    width: "5px",
    height: "5px",
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

export default Start;
