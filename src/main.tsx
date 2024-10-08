import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Auth from "./pages/Auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/game",
    element: <Game />,
  },
  {
    path: "/auth",
    element: <Auth />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
