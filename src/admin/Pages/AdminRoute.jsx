import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function AdminRoute() {
  const isAuthenticated = !!localStorage.getItem("adminId");
  console.log("isAuthenticated:", isAuthenticated); // Add this line for debugging
  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" />;
}

export default AdminRoute;
