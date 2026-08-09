import { useEffect } from "react";
import { siteConfig } from "./config";
import Hero from "./components/Hero";

export default function App() {
  useEffect(() => {
    if (siteConfig.pageTitle) document.title = siteConfig.pageTitle;
  }, []);

  return <Hero />;
}
