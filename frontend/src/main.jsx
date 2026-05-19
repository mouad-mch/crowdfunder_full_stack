import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { Provider } from "react-redux";
import { store } from "./store/index.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "hsl(0 0% 100%)",
              color: "hsl(270 15% 15%)",
              border: "1px solid hsl(270 15% 90%)",
            },
          }}
        />
      </Provider>
    </BrowserRouter>
  </StrictMode>,
);
