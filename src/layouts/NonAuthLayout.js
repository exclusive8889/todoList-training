import { Outlet } from "react-router-dom";

const NonAuthLayout = ({ children }) => {
    return (
      <div className="header">
        {children}
        <Outlet />
      </div>
    );
  };
  
  export default NonAuthLayout;