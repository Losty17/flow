import React, { CSSProperties, useCallback } from "react";
import { shape, labelShape, labelStyle } from "./styles";
import { Handle, Position } from "react-flow-renderer";

interface PoolProps {
  data: {
    label: string;
  };
}

const Pool: React.FC<PoolProps> = ({ data }) => {
  return (
    <>
      <div style={shape}>
        <div style={labelShape}>
          <span style={labelStyle}>{data.label}</span>
        </div>
      </div>
    </>
  );
};

export default Pool;
export { shape, labelShape, labelStyle };
