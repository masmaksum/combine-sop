// Normalize legacy hash fragments for HashRouter on GitHub Pages
if (window.location.hash && !window.location.hash.startsWith("#/")) {
  window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}#/`);
}

import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
