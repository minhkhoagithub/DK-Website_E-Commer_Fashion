"use client"

import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

const Sidebar = () => {
  const { isAdmin, isAuthenticated } = useAuth()
  const location = useLocation()

  // Define navigation items based on user role and authentication status
  const navItems = [
    { to: "/", label: "Home", access: "all" },
    { to: "/dashboard", label: "Dashboard", access: "all" },
    { to: "/profile", label: "Profile", access: "all" },
    { to: "/settings", label: "Settings", access: "all" },
    { to: "/admin", label: "Admin Dashboard", access: "admin" },
    { to: "/admin/users", label: "User Management", access: "admin" },
  ]

  // Filter items based on user role and authentication status
  const filteredNavItems = navItems.filter(
    (item) => item.access === "all" || (item.access === "admin" && isAuthenticated() && isAdmin()),
  )

  return (
    <aside className="w-64 bg-gray-800 text-white h-screen sticky top-0">
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-6">Menu</h2>
        <ul className="space-y-2">
          {filteredNavItems.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className={`block px-4 py-2 rounded transition ${
                  location.pathname === item.to ? "bg-blue-600 text-white" : "hover:bg-gray-700"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}

export default Sidebar
