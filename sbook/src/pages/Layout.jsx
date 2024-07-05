import { Outlet, Link } from "react-router-dom";
import NavBar from './../NavBar.jsx';

const Layout = () => {
  return (
    <>
      <div id="left">
        <NavBar />
      </div>
      <div id="center">
        <Outlet />
      </div>
      <div id="right">
      </div>
    </>
  )
};

export default Layout;
