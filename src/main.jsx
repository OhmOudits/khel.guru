import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import store, { persistor } from "./store/store.js";
import { PersistGate } from "redux-persist/integration/react";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </>
);
