import React from "react";
import { labelShape, labelStyle, shape } from "./styles";

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
