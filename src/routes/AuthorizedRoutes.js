import Home from "../pages/Home/Home";
import { getCategories } from "../stores/slice/categoriesSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";

function AuthorizedRoutes({ isAuthenticated = true }) {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCategories = async () => {
      await dispatch(getCategories());
    };
    fetchCategories();
  }, []);
  
  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Home /> : null}></Route>
      <Route path="/profile" element={<div>profile</div>} />
      <Route path="*" element={<div>error</div>} />
    </Routes>
  );
}

export default AuthorizedRoutes;
