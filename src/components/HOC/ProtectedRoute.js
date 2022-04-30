import { useLocation, Navigate } from "react-router-dom";

const ProtectedRoute = ({ loggedIn, children }) => {
  const location = useLocation();

  if (!loggedIn) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return children;
};
export { ProtectedRoute };
