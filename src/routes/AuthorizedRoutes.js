import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import { getTasks } from "../stores/slice/taskSlice";
import { getCategories } from "../stores/slice/categoriesSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
function AuthorizedRoutes({ isAuthenticated = true }) {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData =async()=>{
      await dispatch(getTasks());
      await dispatch(getCategories());
    }
    fetchData()
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
