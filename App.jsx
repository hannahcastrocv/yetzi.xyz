import { useEffect } from "react";
import { HashRouter, MemoryRouter, Routes, Route } from "react-router-dom";
import { siteConfig } from "./config";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Cave from "./pages/Cave";
import Mountain from "./pages/Mountain";

// Hash routing needs a valid URL base. In a normal deploy (http/https/file)
// that's fine and gives shareable /#/cave links. But inside a sandboxed
// `about:srcdoc` iframe (e.g. an embedded preview) there is no valid base and
// react-router throws "Failed to construct 'URL'". Detect that and fall back to
// an in-memory router so navigation still works everywhere.
function pickRouter() {
  try {
    if (typeof window === "undefined") return MemoryRouter;
    new URL("/", window.location.href); // throws on about:srcdoc / opaque origins
    return HashRouter;
  } catch {
    return MemoryRouter;
  }
}
const Router = pickRouter();

export default function App() {
  useEffect(() => {
    if (siteConfig.pageTitle) document.title = siteConfig.pageTitle;
  }, []);

  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cave" element={<Cave />} />
        <Route path="/mountain" element={<Mountain />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}
