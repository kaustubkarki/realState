import React, { useEffect } from "react";
import "./layout.scss";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./../../components/navbar/Navbar";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

const Layout = () => {
  return (
    <div className="layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

function RequiredAuth() {
  const { currentUser } = useContext(AuthContext);

  return !currentUser ? (
    <Navigate to="/login" />
  ) : (
    <div className="layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}
export { Layout, RequiredAuth };
