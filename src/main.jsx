import React from "react";
import ReactDOM from "react-dom/client";
import HomeLayout from "./layouts/home";
import SignIn from "./pages/signin";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrivateRouteElement from "./components/privateRoute";
import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Jobs, { JobsLoader } from "./pages/jobs";
import EditJob from "./pages/editJob";
import JobDetails from "./pages/jobDetails";
import { backendHost } from "./config";

const router = createBrowserRouter([
  {
    path: "",
    element: <HomeLayout />,
    children: [{ path: "", element: <SignIn /> }],
  },
  {
    path: "jobs",
    element: <PrivateRouteElement />,
    children: [
      {
        path: "",
        element: <Jobs />,
        loader: async () => {
          const jobsData = await JobsLoader({
            url: `${backendHost}/api/jobs`,
          });
          return jobsData;
        },
      },
      {
        path: "edit",
        element: <EditJob />,
      },
      {
        path: "details",
        element: <JobDetails />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
