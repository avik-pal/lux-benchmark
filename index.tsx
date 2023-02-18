import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GlobalStyles from "./components/GlobalStyles";
import Commit, { loaderCommit, loaderHome } from "./pages/commit";
import ErrorPage from "./pages/error";
import Index from "./pages/index";
import Project, { loaderDefault, loaderSeries } from "./pages/project";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/:name",
    element: <Project />,
    errorElement: <ErrorPage />,
    loader: loaderDefault,
  },
  {
    path: "/:name/series",
    element: <Project />,
    errorElement: <ErrorPage />,
    loader: loaderDefault,
  },
  {
    path: "/:name/series/:series",
    element: <Project />,
    errorElement: <ErrorPage />,
    loader: loaderSeries,
  },
  {
    path: "/:name/commit/:commit",
    element: <Commit />,
    errorElement: <ErrorPage />,
    loader: loaderCommit,
  },
  {
    path: "/TaylorDiff.jl",
    element: <Commit />,
    errorElement: <ErrorPage />,
    loader: loaderHome("TaylorDiff.jl", "main"),
  },
]);

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <GlobalStyles />
    <RouterProvider router={router} />
  </StrictMode>
);
