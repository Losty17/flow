import React, { CSSProperties, useCallback } from "react";
import { Handle, Position } from "react-flow-renderer";

interface PoolProps {
  data: Node;
}

const Pool: React.FC<PoolProps> = ({ data }) => {
  const shape: CSSProperties = {
    width: "400px",
    height: "150px",
    background: "transparent",
    border: "1px solid #000",
  };

  const handleStyle: CSSProperties = {
    background: "rgba(0, 0, 0, 0)",
    border: "1px solid rgba(100, 100, 100, 0.5)",
  };
  return (
    <>
      <div style={shape} />
    </>
  );
};

export default Pool;
