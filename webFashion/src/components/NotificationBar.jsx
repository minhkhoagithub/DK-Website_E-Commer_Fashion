"use client"

import { X } from "lucide-react"

const NotificationBar = ({ onClose }) => {
  return (
    <div className="bg-[#8b4513] text-white py-3 px-4 flex justify-center items-center relative">
      <p className="text-center text-sm md:text-base">
        Discount 20% For New Member, <span className="font-bold">ONLY FOR TODAY</span>!!
      </p>
      <button className="absolute right-4 top-1/2 transform -translate-y-1/2" onClick={onClose}>
        <X className="w-5 h-5" />
      </button>
    </div>
  )
}

export default NotificationBar
