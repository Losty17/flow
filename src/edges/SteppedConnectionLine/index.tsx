import React from "react";
import { ConnectionLineComponentProps } from "react-flow-renderer";

export default ({
  sourceX,
  sourceY,
  targetX,
  targetY,
  connectionLineType,
  connectionLineStyle,
}: ConnectionLineComponentProps) => {
  const dx = targetX - sourceX;
  const dy = targetY - sourceY;
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);
  return (
    <g>
      <path
        fill="none"
        stroke="#222"
        strokeWidth={1}
        d={`M${sourceX},${sourceY} L${targetX},${targetY} `}
      />
      <polygon
        points={`
            ${targetX - 1},${targetY - 2.5}
            ${targetX - 1},${targetY + 2.5}
            ${targetX + 2},${targetY}
        `}
        fill="#000"
        stroke="#000"
        strokeWidth={1}
        strokeLinejoin="round"
        transform={`rotate(${angle} ${targetX} ${targetY})`}
      />
    </g>
  );
};
