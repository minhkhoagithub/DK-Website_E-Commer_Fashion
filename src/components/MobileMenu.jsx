"use client"

import { X, ChevronDown } from "lucide-react"

const MobileMenu = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col">
      <div className="flex justify-between items-center p-8">
        <a href="/" className="text-4xl font-serif text-white">
          MODEVA
        </a>
        <button onClick={onClose}>
          <X className="w-6 h-6 text-white" />
        </button>
      </div>

      <div className="flex flex-col items-center justify-center flex-1 space-y-8 text-white text-xl">
        <a href="/catalog" className="flex items-center">
          Catalog <ChevronDown className="ml-1 w-5 h-5" />
        </a>
        <a href="/sale">Sale</a>
        <a href="/new-arrival">New Arrival</a>
        <a href="/about">About</a>
      </div>
    </div>
  )
}

export default MobileMenu
