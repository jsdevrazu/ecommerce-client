import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user?.token) return <Navigate to="/" />;
  else return children;
};

export default ProtectedRoutes;