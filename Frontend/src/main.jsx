import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/AuthProvider.jsx";
import { SnackbarProvider } from "notistack"; // ✅ import this

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <div className="dark:bg-white dark:text-black">
          <App />
        </div>
      </SnackbarProvider>
    </AuthProvider>
  </BrowserRouter>
);
