"use client"

import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { ChevronDown, Search, User, ShoppingCart, Menu, LogOut } from "lucide-react"
import { useAuth } from "../../contexts/AuthContext"
import { useCart } from "../../contexts/CartContext"
import MobileMenu from "./MobileMenu"

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const { currentUser, isAuthenticated, isAdmin, logout } = useAuth()
  const { getTotalItems } = useCart()
  const location = useLocation()

  // Determine if we're on a dark background page (like home)
  const isDarkBg = location.pathname === "/" || location.pathname === "/catalog"

  const textColor = isDarkBg ? "text-white" : "text-[#3e3e3e]"
  const logoColor = isDarkBg ? "text-white" : "text-[#3e3e3e]"

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuOpen && !event.target.closest(".profile-menu")) {
        setProfileMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [profileMenuOpen])

  const handleSearch = (e) => {
    e.preventDefault()
    // Implement search functionality
    console.log("Searching for:", searchValue)
  }

  return (
    <>
      <nav
        className={`flex justify-between items-center px-8 py-6 ${isDarkBg ? "absolute w-full z-10" : "bg-white shadow-sm"}`}
      >
        <Link to="/" className={`text-4xl font-serif ${logoColor}`}>
          MODEVA
        </Link>

        <div className={`hidden md:flex space-x-8 ${textColor}`}>
          <Link to="/catalog" className="flex items-center">
            Catalog <ChevronDown className="ml-1 w-4 h-4" />
          </Link>
          <Link to="/sale">Sale</Link>
          <Link to="/new-arrival">New Arrival</Link>
          <Link to="/about">About</Link>
          {isAuthenticated() && <Link to="/dashboard">Dashboard</Link>}
          {isAdmin() && (
            <Link to="/admin" className="text-[#8b4513] font-medium">
              Admin
            </Link>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <form onSubmit={handleSearch} className="relative hidden sm:block">
            <input
              type="text"
              placeholder="Search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="bg-white rounded-md py-1 px-3 pl-8 text-sm w-40 border border-gray-200"
            />
            <button type="submit" className="absolute left-2 top-1/2 transform -translate-y-1/2">
              <Search className="w-4 h-4 text-gray-400" />
            </button>
          </form>

          <div className="relative profile-menu">
            <button onClick={() => setProfileMenuOpen(!profileMenuOpen)} className={`${textColor} hover:opacity-80`}>
              <User className="w-5 h-5" />
            </button>

            {profileMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                {isAuthenticated() ? (
                  <>
                    <div className="px-4 py-2 border-b">
                      <p className="text-sm font-medium">{currentUser.name}</p>
                      <p className="text-xs text-gray-500">{currentUser.email}</p>
                    </div>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setProfileMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        logout()
                        setProfileMenuOpen(false)
                      }}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setProfileMenuOpen(false)}
                  >
                    Login / Register
                  </Link>
                )}
              </div>
            )}
          </div>

          <Link to="/cart" className={`${textColor} hover:opacity-80 relative`}>
            <ShoppingCart className="w-5 h-5" />
            {getTotalItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {getTotalItems()}
              </span>
            )}
          </Link>

          <button className="md:hidden" onClick={() => setMobileMenuOpen(true)}>
            <Menu className={`w-6 h-6 ${textColor}`} />
          </button>
        </div>
      </nav>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        isAuthenticated={isAuthenticated()}
        isAdmin={isAdmin()}
      />
    </>
  )
}

export default Navbar
