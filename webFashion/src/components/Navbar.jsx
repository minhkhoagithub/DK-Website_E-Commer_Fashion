"use client"

import { useState } from "react"
import { ChevronDown, Search, User, ShoppingCart, Menu } from "lucide-react"
import MobileMenu from "./MobileMenu"

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <nav className="flex justify-between items-center px-8 py-6 bg-transparent absolute w-full z-10">
        <a href="/" className="text-4xl font-serif text-white">
          MODEVA
        </a>

        <div className="hidden md:flex space-x-8 text-white">
          <a href="/catalog" className="flex items-center">
            Catalog <ChevronDown className="ml-1 w-4 h-4" />
          </a>
          <a href="/sale">Sale</a>
          <a href="/new-arrival">New Arrival</a>
          <a href="/about">About</a>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative hidden sm:block">
            <input type="text" placeholder="Search" className="bg-white rounded-md py-1 px-3 pl-8 text-sm w-40" />
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
          <User className="w-5 h-5 text-white" />
          <ShoppingCart className="w-5 h-5 text-white" />
          <button className="md:hidden" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="w-6 h-6 text-white" />
          </button>
        </div>
      </nav>

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  )
}

export default Navbar
