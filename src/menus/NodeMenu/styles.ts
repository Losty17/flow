import { CSSProperties } from "react";

export const menuStyle: CSSProperties = {
  position: "absolute",
  top: "15px",
  left: "10px",
  width: "40px",
  height: "350px",
  backgroundColor: "#fafafa",
  borderRadius: "6px",
  boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
  zIndex: 9999,
};

export const itemStyle: CSSProperties = {
  width: "40px",
  height: "40px",
  margin: 0,
  padding: 0,
  background: "transparent",
  border: "none",
  transition: ".1s",
};
