import "./index.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import GameRoutes from "./routes/GameRoutes.tsx";

const root = document.getElementById("root");

ReactDOM.createRoot(root!).render(
  <BrowserRouter>
    <GameRoutes />
  </BrowserRouter>
);
