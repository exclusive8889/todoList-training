import NonAuthorizedRoutes from "./NonAuthorizedRoutes";
import AuthorizedRoutes from "./AuthorizedRoutes";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Routes() {
  const navigate = useNavigate();
  const accessToken=useSelector((state)=>state.auth.accessToken)

  useEffect(() => {
    if (!accessToken) {
      navigate("/sign-in");
    }
  }, [accessToken,navigate]);

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
