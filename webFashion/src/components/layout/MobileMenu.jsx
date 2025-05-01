"use client"

import { X, ChevronDown, LogOut } from "lucide-react"
import { Link } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"

const MobileMenu = ({ isOpen, onClose }) => {
  const { currentUser, logout, isAuthenticated, isAdmin } = useAuth()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 overflow-y-auto">
      <div className="flex justify-between items-center p-6">
        <Link to="/" className="text-4xl font-serif text-white" onClick={onClose}>
          MODEVA
        </Link>
        <button onClick={onClose}>
          <X className="w-6 h-6 text-white" />
        </button>
      </div>

      <div className="flex flex-col items-center px-4 pb-8 space-y-6 text-white text-xl">
        <Link to="/catalog" className="flex items-center" onClick={onClose}>
          Catalog <ChevronDown className="ml-1 w-5 h-5" />
        </Link>
        <Link to="/sale" onClick={onClose}>
          Sale
        </Link>
        <Link to="/new-arrival" onClick={onClose}>
          New Arrival
        </Link>
        <Link to="/about" onClick={onClose}>
          About
        </Link>

        {isAuthenticated && (
          <Link to="/dashboard" onClick={onClose}>
            Dashboard
          </Link>
        )}

        {isAuthenticated && (
          <Link to="/profile" onClick={onClose}>
            Profile
          </Link>
        )}

        {isAdmin && (
          <Link to="/admin" onClick={onClose} className="text-[#8b4513]">
            Admin
          </Link>
        )}

        {isAuthenticated ? (
          <button
            onClick={() => {
              logout()
              onClose()
            }}
            className="flex items-center text-red-400"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </button>
        ) : (
          <Link to="/login" onClick={onClose} className="text-[#8b4513]">
            Login / Register
          </Link>
        )}
      </div>
    </div>
  )
}

export default MobileMenu
