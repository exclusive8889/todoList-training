import NonAuthorizedRoutes from "./NonAuthorizedRoutes";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthorizedRoutes from "./AuthorizedRoutes";
import { useDispatch, useSelector } from "react-redux";
function Routes() {
  const navigate = useNavigate();
  const accessToken=useSelector((state)=>state.auth.accessToken)
  // const tk1 = JSON.parse(localStorage.getItem("persist:accessToken"));
  // const accessToken1 = JSON.parse(tk1.auth);
  // const accessToken= accessToken1.accessToken
  // const accToken = () => {
  //   return localStorage.getItem("accessToken");
  // };
  // const accessToken = accToken();
  // console.log(accessToken1.accessToken)
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
