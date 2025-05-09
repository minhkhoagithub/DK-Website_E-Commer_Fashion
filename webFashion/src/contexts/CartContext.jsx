"use client"

import { createContext, useState, useContext, useEffect } from "react"

const CartContext = createContext()

export const useCart = () => {
  return useContext(CartContext)
}

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  const [cartOpen, setCartOpen] = useState(false)

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart))
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error)
        setCartItems([])
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (product, quantity = 1, selectedSize = null) => {
    setCartItems((prevItems) => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === product.id && item.selectedSize === selectedSize,
      )

      if (existingItemIndex > -1) {
        // Update quantity if item exists
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex].quantity += quantity
        return updatedItems
      } else {
        // Add new item
        return [...prevItems, { ...product, quantity, selectedSize }]
      }
    })
  }

  const updateCartItemQuantity = (id, selectedSize, quantity) => {
    setCartItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === id && item.selectedSize === selectedSize) {
          return { ...item, quantity }
        }
        return item
      })
    })
  }

  const removeFromCart = (id, selectedSize) => {
    setCartItems((prevItems) => {
      return prevItems.filter((item) => !(item.id === id && item.selectedSize === selectedSize))
    })
  }

  const clearCart = () => {
    setCartItems([])
  }

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const toggleCart = () => {
    setCartOpen(!cartOpen)
  }

  const value = {
    cartItems,
    cartOpen,
    addToCart,
    updateCartItemQuantity,
    removeFromCart,
    clearCart,
    getTotalItems,
    getSubtotal,
    toggleCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
