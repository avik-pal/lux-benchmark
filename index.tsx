import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GlobalStyles from "./components/GlobalStyles";
import Snapshot, { loaderSnapshot } from "./pages/snapshot";
import ErrorPage from "./pages/error";
import Index from "./pages/index";
import Series, { loaderDefault, loaderSeries } from "./pages/series";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/:name",
    element: <Snapshot />,
    errorElement: <ErrorPage />,
    loader: loaderSnapshot,
  },
  {
    path: "/:name/commit/:commit",
    element: <Snapshot />,
    errorElement: <ErrorPage />,
    loader: loaderSnapshot,
  },
  {
    path: "/:name/tag/:tag",
    element: <Snapshot />,
    errorElement: <ErrorPage />,
    loader: loaderSnapshot,
  },
  {
    path: "/:name/branch/:branch",
    element: <Snapshot />,
    errorElement: <ErrorPage />,
    loader: loaderSnapshot,
  },
  {
    path: "/:name/series",
    element: <Series />,
    errorElement: <ErrorPage />,
    loader: loaderDefault,
  },
  {
    path: "/:name/series/:series",
    element: <Series />,
    errorElement: <ErrorPage />,
    loader: loaderSeries,
  },
]);

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <GlobalStyles />
    <RouterProvider router={router} />
  </StrictMode>
);
