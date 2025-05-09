"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { X, Trash2, Plus, Minus, ShoppingCart } from "lucide-react"
import { useCart } from "../contexts/CartContext"

const CartPage = () => {
  const [showNotification, setShowNotification] = useState(true)
  const [showPromoNotification, setShowPromoNotification] = useState(true)
  const [promoCode, setPromoCode] = useState("")
  const [promoApplied, setPromoApplied] = useState(false)

  const { cartItems, updateCartItemQuantity, removeFromCart, getSubtotal } = useCart()

  // Format currency
  const formatPrice = (price) => {
    return `IDR ${Math.round(price * 15000).toLocaleString("id-ID")}`
  }

  // Discount amount (simulated for now)
  const discount = promoApplied ? 50000 : 0
  const subtotal = getSubtotal() * 15000 // Convert to IDR
  const total = subtotal - discount

  // Handle quantity change
  const handleQuantityChange = (id, selectedSize, newQuantity) => {
    if (newQuantity < 1) return
    updateCartItemQuantity(id, selectedSize, newQuantity)
  }

  // Apply promo code
  const applyPromoCode = () => {
    if (promoCode === "50KDISCOUNT") {
      setPromoApplied(true)
      setShowPromoNotification(false)
    } else {
      alert("Invalid promo code")
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Notification Bar */}
      {showNotification && (
        <div className="bg-[#8b4513] text-white py-3 px-4 flex justify-center items-center relative">
          <p className="text-center text-sm md:text-base">
            Discount 20% For New Member, <span className="font-bold">ONLY FOR TODAY</span>!!
          </p>
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2"
            onClick={() => setShowNotification(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Header */}
      <header className="bg-white py-4 px-8 border-b">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-4xl font-serif text-[#8b4513]">
            MODEVA
          </Link>

          <nav className="hidden md:flex space-x-8">
            <Link to="/catalog" className="text-[#3e3e3e] hover:text-[#8b4513]">
              Catalog
            </Link>
            <Link to="/sale" className="text-[#3e3e3e] hover:text-[#8b4513]">
              Sale
            </Link>
            <Link to="/new-arrival" className="text-[#3e3e3e] hover:text-[#8b4513]">
              New Arrival
            </Link>
            <Link to="/about" className="text-[#3e3e3e] hover:text-[#8b4513]">
              About
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <input type="text" placeholder="Search" className="bg-gray-100 rounded-md py-1 px-3 pl-8 text-sm w-40" />
              <svg
                className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <Link to="/profile" className="text-[#3e3e3e]">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </Link>
            <Link to="/cart" className="text-[#3e3e3e]">
              <ShoppingCart className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-5xl font-serif text-[#3e3e3e] mb-8">CART</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="w-full lg:w-2/3">
            {cartItems.map((item) => (
              <div key={`${item.id}-${item.selectedSize}`} className="mb-8 pb-8 border-b">
                <div className="flex flex-col sm:flex-row">
                  <img
                    src={item.images[0] || "/placeholder.svg"}
                    alt={item.name}
                    className="w-24 h-24 object-cover mb-4 sm:mb-0 sm:mr-6"
                  />

                  <div className="flex-grow">
                    <h3 className="text-lg font-medium text-[#3e3e3e]">{item.name}</h3>
                    <p className="text-sm text-gray-600 mb-1">Size: {item.selectedSize}</p>

                    <div className="mt-2">
                      {item.discount > 0 && (
                        <div className="flex items-center">
                          <span className="text-gray-500 line-through mr-2">{formatPrice(item.originalPrice)}</span>
                          <span className="bg-red-600 text-white text-xs px-1.5 py-0.5 rounded">{item.discount}%</span>
                        </div>
                      )}
                      <p className={`${item.discount > 0 ? "text-red-600" : "text-[#3e3e3e]"}`}>
                        {formatPrice(item.price)}
                      </p>
                    </div>

                    <div className="flex items-center mt-4">
                      <div className="flex border border-gray-300 rounded">
                        <button
                          className="px-3 py-1 border-r border-gray-300"
                          onClick={() => handleQuantityChange(item.id, item.selectedSize, item.quantity - 1)}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <input
                          type="text"
                          value={item.quantity}
                          onChange={(e) => {
                            const val = Number.parseInt(e.target.value)
                            if (!isNaN(val)) handleQuantityChange(item.id, item.selectedSize, val)
                          }}
                          className="w-12 text-center py-1 focus:outline-none"
                        />
                        <button
                          className="px-3 py-1 border-l border-gray-300"
                          onClick={() => handleQuantityChange(item.id, item.selectedSize, item.quantity + 1)}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        className="ml-4 text-gray-400 hover:text-red-600 flex items-center"
                        onClick={() => removeFromCart(item.id, item.selectedSize)}
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {cartItems.length === 0 && (
              <div className="text-center py-12">
                <p className="text-xl text-gray-500">Your cart is empty</p>
                <Link
                  to="/catalog"
                  className="mt-4 inline-block px-6 py-2 bg-[#8b4513] text-white rounded hover:bg-[#a05a2c]"
                >
                  Continue Shopping
                </Link>
              </div>
            )}
          </div>

          {/* Shopping Info */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white p-6 border rounded-lg">
              <h2 className="text-xl font-medium text-[#3e3e3e] mb-6">SHOPPING INFO</h2>

              {showPromoNotification && !promoApplied && (
                <div className="bg-[#f5f0e9] p-4 mb-6 rounded relative">
                  <p className="text-[#3e3e3e]">
                    Hooray! You have promo code!{" "}
                    <button
                      className="text-[#8b4513] underline cursor-pointer"
                      onClick={() => setShowPromoNotification(false)}
                    >
                      Use promo code
                    </button>
                  </p>
                  <button className="absolute top-4 right-4" onClick={() => setShowPromoNotification(false)}>
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              )}

              {!showPromoNotification && !promoApplied && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-[#3e3e3e] mb-2">Promo Code</label>
                  <div className="flex">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter promo code"
                      className="flex-1 p-2 border border-gray-300 rounded-l focus:outline-none focus:ring-1 focus:ring-[#8b4513]"
                    />
                    <button
                      onClick={applyPromoCode}
                      className="px-4 py-2 bg-[#8b4513] text-white rounded-r hover:bg-[#a05a2c]"
                    >
                      Apply
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Try: 50KDISCOUNT</p>
                </div>
              )}

              {promoApplied && (
                <div className="bg-green-100 p-4 mb-6 rounded relative">
                  <p className="text-green-700">Promo code applied successfully!</p>
                  <button className="absolute top-4 right-4" onClick={() => setPromoApplied(false)}>
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              )}

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{formatPrice(subtotal / 15000)}</span>
                </div>

                {promoApplied && (
                  <div className="flex justify-between text-red-600">
                    <span>Discount</span>
                    <span>- IDR 50,000</span>
                  </div>
                )}

                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>{`IDR ${total.toLocaleString("id-ID")}`}</span>
                </div>

                <Link
                  to="/checkout"
                  className={`block w-full py-3 text-white text-center font-medium rounded hover:bg-[#a05a2c] transition-colors ${
                    cartItems.length === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-[#8b4513]"
                  }`}
                  onClick={(e) => cartItems.length === 0 && e.preventDefault()}
                >
                  PROCEED TO CHECKOUT
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#8b4513] text-white py-12 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-serif mb-4">MODEVA</h3>
              <div className="space-y-2">
                <p className="flex items-center">
                  <span className="font-medium w-20">Whatsapp</span>
                  <span>: +62 859 9999 999</span>
                </p>
                <p className="flex items-center">
                  <span className="font-medium w-20">Email</span>
                  <span>: hello@modeva.com</span>
                </p>
                <p className="flex items-start">
                  <span className="font-medium w-20">Address</span>
                  <span>: Lorem ipsum street Block 8 Number 08, Jakarta, Indonesia, 12345</span>
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium mb-4">Menu</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/sale" className="hover:underline">
                    Sale
                  </Link>
                </li>
                <li>
                  <Link to="/new-arrival" className="hover:underline">
                    New Arrivals
                  </Link>
                </li>
                <li>
                  <Link to="/catalog?category=formal-men" className="hover:underline">
                    Formal Men
                  </Link>
                </li>
                <li>
                  <Link to="/catalog?category=formal-women" className="hover:underline">
                    Formal Women
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-medium mb-4">Get Help</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/faq" className="hover:underline">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/customer-service" className="hover:underline">
                    Customer Service
                  </Link>
                </li>
                <li>
                  <Link to="/refund" className="hover:underline">
                    Refund and Return
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-medium mb-4">Account</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/account" className="hover:underline">
                    My Account
                  </Link>
                </li>
                <li>
                  <Link to="/orders" className="hover:underline">
                    My Orders
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-[#a05a2c] text-center text-sm">
            <p>All rights reserved</p>
            <p>Copyright 2023 by Modeva Fashion</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default CartPage
