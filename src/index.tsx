import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./global.less";
import "./services/mock";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);
