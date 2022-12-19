import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Loading from "./components/common/Loading";

const prepare = async () => {
  if (import.meta.env.DEV) {
    const { worker } = await import("./mocks/browser");
    return worker.start();
  }
};

prepare().then(() => {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <BrowserRouter>
        <RecoilRoot>
          <Suspense fallback={<Loading />}>
            <App />
          </Suspense>
        </RecoilRoot>
      </BrowserRouter>
    </React.StrictMode>
  );
});
