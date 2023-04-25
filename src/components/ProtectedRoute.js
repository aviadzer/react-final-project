import React from "react"
import { Outlet, Navigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

/* 
  ProtectedRoute controls the displayed component based on user login and permissions. 
  If a user is not logged-in, the only screen to display is Login.
  If a user is logged-in but has no privilages for the requested page, re-route to main menu
*/

export default function ProtectedRoute ({ redirectPathToLogin = '/login', redirectPathNoPrivilages = './Menu', requiredPermission })  {
  const { currentUser } = useAuth()

  if (!currentUser.user  ) {
    return <Navigate to={redirectPathToLogin} replace />;
  }

  if (!requiredPermission.includes(currentUser.privilage))
  return <Navigate to={redirectPathNoPrivilages} replace />;
  return <Outlet />;
};
