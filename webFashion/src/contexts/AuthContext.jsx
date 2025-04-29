"use client"

import { createContext, useState, useContext, useEffect } from "react"

// Create the authentication context
const AuthContext = createContext()

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  // Login function
  const login = (email, password) => {
    // In a real app, you would validate credentials against a backend
    // For demo purposes, we'll use hardcoded users
    if (email === "admin@example.com" && password === "admin123") {
      const user = { id: 1, name: "Admin User", email, role: "admin" }
      setCurrentUser(user)
      localStorage.setItem("user", JSON.stringify(user))
      return { success: true, user }
    } else if (email === "user@example.com" && password === "user123") {
      const user = { id: 2, name: "Regular User", email, role: "user" }
      setCurrentUser(user)
      localStorage.setItem("user", JSON.stringify(user))
      return { success: true, user }
    }
    return { success: false, message: "Invalid credentials" }
  }

  // Logout function
  const logout = () => {
    setCurrentUser(null)
    localStorage.removeItem("user")
  }

  // Check if user is admin
  const isAdmin = () => {
    return currentUser?.role === "admin"
  }

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!currentUser
  }

  const value = {
    currentUser,
    login,
    logout,
    isAdmin,
    isAuthenticated,
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}
