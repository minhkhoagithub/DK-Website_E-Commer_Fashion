"use client"

import { createContext, useState, useContext, useEffect } from "react"
import { loginUser, registerUser, deleteUserAccount } from "../services/userApi"

// Create the authentication context
const AuthContext = createContext()

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  // Register function
  const register = async (name, email, password, confirmPassword) => {
    setError(null)

    // Validate password match
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return { success: false, message: "Passwords do not match" }
    }

    try {
      const result = await registerUser({ name, email, password })

      if (result.success) {
        setCurrentUser(result.user)
        localStorage.setItem("user", JSON.stringify(result.user))
      } else {
        setError(result.message)
      }

      return result
    } catch (err) {
      const message = err.message || "Registration failed"
      setError(message)
      return { success: false, message }
    }
  }

  // Login function
  const login = async (email, password) => {
    setError(null)

    try {
      const result = await loginUser(email, password)

      if (result.success) {
        setCurrentUser(result.user)
        localStorage.setItem("user", JSON.stringify(result.user))
      } else {
        setError(result.message)
      }

      return result
    } catch (err) {
      const message = err.message || "Login failed"
      setError(message)
      return { success: false, message }
    }
  }

  // Logout function
  const logout = () => {
    setCurrentUser(null)
    localStorage.removeItem("user")
    return { success: true }
  }

  // Update user in context after profile changes
  const updateUserInContext = (updatedUser) => {
    setCurrentUser(updatedUser)
    localStorage.setItem("user", JSON.stringify(updatedUser))
  }

  // Delete account
  const deleteAccount = async (password) => {
    if (!currentUser) return { success: false, message: "Not logged in" }

    try {
      const result = await deleteUserAccount(currentUser.id, password)

      if (result.success) {
        setCurrentUser(null)
        localStorage.removeItem("user")
      }

      return result
    } catch (err) {
      return { success: false, message: err.message || "Failed to delete account" }
    }
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
    error,
    login,
    logout,
    register,
    updateUserInContext,
    deleteAccount,
    isAdmin,
    isAuthenticated,
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}
