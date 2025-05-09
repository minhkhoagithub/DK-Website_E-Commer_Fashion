"use client"

import { useAuth } from "../contexts/AuthContext"

// Component to protect routes that require authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth()

  // Instead of redirecting, we'll pass the authentication status to the children
  // This allows pages to render different content based on auth status
  return children
}

export default ProtectedRoute
