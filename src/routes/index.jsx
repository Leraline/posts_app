import { createBrowserRouter } from "react-router-dom";

import About from "../pages/About";
import Posts from "../pages/Posts";
import Error from "../pages/Error";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <About />,
    errorElement: <Error/>,
  },
  {
    path: "posts/",
    element: <Posts />
  }
]);