import { createBrowserRouter } from "react-router-dom";
import { GithubApiPage } from "../pages/GithubApiPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <GithubApiPage />,
  },
]);
