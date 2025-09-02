import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// تحميل أدوات رفع البيانات (في بيئة التطوير فقط)
if (process.env.NODE_ENV === "development") {
  import("./scripts/uploadDataToFirebase.js").then(() => {
    console.log("🔧 تم تحميل أدوات رفع البيانات للتطوير");
  });
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
