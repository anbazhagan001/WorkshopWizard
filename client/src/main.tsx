import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { Helmet } from "react-helmet";

const app = (
  <>
    <Helmet>
      <title>ClassConnect - Find Local Classes & Workshops</title>
      <meta name="description" content="Find and book local classes and workshops with real-time availability. Perfect for college students looking to expand their skills." />
    </Helmet>
    <App />
  </>
);

createRoot(document.getElementById("root")!).render(app);
