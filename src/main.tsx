import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <main className="container mx-auto p-24">
      <App />
    </main>
  </StrictMode>
);
