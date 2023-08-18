import { Navigate } from "react-router-dom";
import JobLayout from "../layouts/job";

function PrivateRouteElement() {
  let authenticated = false;
  if (localStorage.getItem("authenticated")) {
    authenticated = localStorage.getItem("authenticated");
  }

  if (authenticated) {
    return <JobLayout />;
  } else {
    return <Navigate to="../" replace />;
  }
}

export default PrivateRouteElement;
