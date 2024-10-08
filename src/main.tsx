import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <main className="container mx-auto flex min-h-screen max-w-lg flex-col items-center justify-center p-4">
      <App />
    </main>
  </StrictMode>
);
