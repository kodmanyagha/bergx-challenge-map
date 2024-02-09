import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import WsContext from "./context/ws-context/index.tsx";
import "./index.css";
import store from "./redux/store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <WsContext>
          <App />
        </WsContext>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
