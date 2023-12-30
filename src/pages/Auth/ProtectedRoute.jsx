import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { getToken } from "../../helpers/sessionHelper";


const ProtectedRoute = ({children}) => {
  const location = useLocation();
  // const navigate = useNavigate();
  const token = getToken();
  if (!token) {
    return <Navigate to="/login" state={{ from: location }}></Navigate>;
  }
  return children;
};

export default ProtectedRoute;
