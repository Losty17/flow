import React from "react";
import ReactDOM from "react-dom/client";
import Flow from "./Flow";
import "./styles.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Flow />
  </React.StrictMode>
);
