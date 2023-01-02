import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";

// const prepare = async () => {
//   if (import.meta.env.DEV) {
//     const { worker } = await import("./mocks/browser");
//     return worker.start();
//   }
// };

// prepare().then(() => {
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </BrowserRouter>
  </React.StrictMode>
);
// });
