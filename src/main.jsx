import React from "react";
import { AuthContext } from "./authContext";
import { Routes, Route, Navigate } from "react-router-dom";
import SnackBar from "./components/SnackBar";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import { useEffect } from "react";
import { tokenExpireError } from "./authContext";
import MkdSDK from "./utils/MkdSDK";

function renderRoutes(role) {
  switch (role) {
    case "admin":
      return (
        <Routes>
          <Route
            exact
            path="/admin/dashboard"
            element={<AdminDashboardPage />}
          ></Route>
          <Route
            path="/admin/login"
            exact
            element={<AdminLoginPage />}
          ></Route>
          <Route path="*" exact element={<NotFoundPage />}></Route>
        </Routes>
      );
      break;
    default:
      return (
        <Routes>
          <Route exact path="/admin/login" element={<AdminLoginPage />}></Route>
          <Route path="*" exact element={<NotFoundPage />}></Route>
        </Routes>
      );
      break;
  }
}

function Main() {
  const { state } = React.useContext(AuthContext);

  return (
    <div className="h-full">
      <div className="flex w-full">
        <div className="w-full">
          <div className="page-wrapper w-full py-10 px-5">
            {/* {renderRoutes("admin")} */}
            {!state.token ? renderRoutes("none") : renderRoutes(state.role)}
          </div>
        </div>
      </div>
      <SnackBar />
    </div>
  );
}

export default Main;