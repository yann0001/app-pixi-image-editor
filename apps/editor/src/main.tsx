import "@fontsource/rubik/300.css";
import "@fontsource/rubik/400.css";
import "@fontsource/rubik/500.css";
import "@fontsource/rubik/600.css";
import "@fontsource/rubik/700.css";
import "@fontsource/rubik/800.css";
import "@fontsource/rubik/900.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./core/App";
import "./main.css";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
