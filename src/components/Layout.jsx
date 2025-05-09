"use client"

import { useAuth } from "../contexts/AuthContext"
import Navbar from "./Navbar"
import Sidebar from "./Sidebar"

const Layout = ({ children }) => {
  const { isAuthenticated } = useAuth()

  // Always render with sidebar, regardless of authentication status
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="container mx-auto px-4 py-8">{children}</main>
      </div>
    </div>
  )
}

export default Layout
