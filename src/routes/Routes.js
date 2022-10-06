import NonAuthorizedRoutes from "./NonAuthorizedRoutes";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthorizedRoutes from "./AuthorizedRoutes";
import { useDispatch, useSelector } from "react-redux";
function Routes() {
  const navigate = useNavigate();
  // const accessToken=useSelector((state)=>state?.auth?.accessToken)
  
  const accToken = () => {
    return localStorage.getItem("accessToken");
  };
  const accessToken = accToken();

  useEffect(() => {
    if (!accessToken) {
      navigate("/sign-in");
    }
  }, [accessToken]);

  return (
    <>
      {!accessToken ? (
        <NonAuthorizedRoutes />
      ) : (
        <AuthorizedRoutes isAuthenticated={!!accessToken} />
      )}
    </>
  );
}

export default Routes;
