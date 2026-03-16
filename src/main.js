import React from "react";
import { createRoot } from "react-dom/client";
import { ClerkProvider } from "@clerk/react";
import "./index.css";
import AppProviders from "./AppProviders";
import App from "./App";

createRoot(document.getElementById("root")).render(
  React.createElement(
    React.StrictMode,
    null,
    React.createElement(
      ClerkProvider,
      { afterSignOutUrl: "/" },
      React.createElement(AppProviders, null, React.createElement(App)),
    ),
  ),
);
