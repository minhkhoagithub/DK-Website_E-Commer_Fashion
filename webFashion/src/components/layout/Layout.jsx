"use client"

import { useState } from "react"
import Navbar from "./Navbar"
import NotificationBar from "./NotificationBar"
import Footer from "./Footer"

const Layout = ({ children }) => {
  const [showNotification, setShowNotification] = useState(true)

  return (
    <div className="min-h-screen flex flex-col">
      {showNotification && <NotificationBar onClose={() => setShowNotification(false)} />}
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
