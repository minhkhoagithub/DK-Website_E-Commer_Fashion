"use client"

import { Navigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

// Component to protect routes that require admin privileges
const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin } = useAuth()

  if (!isAuthenticated()) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />
  }

  if (!isAdmin()) {
    // Redirect to dashboard if authenticated but not admin
    return <Navigate to="/dashboard" replace />
  }

  return children
}

export default AdminRoute
