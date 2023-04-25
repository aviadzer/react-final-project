import React from "react"
import { createRoot } from "react-dom/client";

import App from "./components/App"
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css"


const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(

    <App />

)

reportWebVitals();