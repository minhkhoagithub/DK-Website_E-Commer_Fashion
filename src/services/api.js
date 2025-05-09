// Base URL for the API
const API_BASE_URL = "https://fakestoreapi.com" // We'll use a fake store API for demo purposes

// Local storage keys
const ORDERS_STORAGE_KEY = "modeva_orders"
const USER_ORDERS_PREFIX = "modeva_user_orders_"
const GUEST_ORDERS_KEY = "modeva_guest_orders"

// Get all products
export const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`)
    if (!response.ok) {
      throw new Error("Network response was not ok")
    }
    const data = await response.json()

    // Transform the data to match our Product interface
    return data.map((item) => {
      // Only apply discount to some products (about 30% of products)
      const hasDiscount = Math.random() < 0.3
      const discount = hasDiscount ? Math.floor(Math.random() * 30) + 10 : 0 // Discount between 10-40% for selected products

      return {
        id: item.id,
        name: item.title,
        category: item.category,
        description: item.description,
        price: hasDiscount ? Math.round(item.price * (1 - discount / 100)) : item.price,
        originalPrice: hasDiscount ? item.price : null, // Only set originalPrice if there's a discount
        discount: discount,
        rating: item.rating?.rate || 4.5,
        images: [item.image], // Using the image as the primary one
        sizes: ["XS", "S", "M", "L", "XL", "XXL"], // Simulated sizes
        inStock: true, // Simulated stock status
        tags: [item.category, ...(hasDiscount ? ["Sale"] : []), ...(item.id > 15 ? ["New"] : [])], // Add "Sale" tag for discounted items
        isNew: item.id > 15, // Simulate new products (higher IDs are newer)
      }
    })
  } catch (error) {
    console.error("Error fetching products:", error)
    throw error
  }
}

// Get a single product by ID
export const fetchProductById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`)
    if (!response.ok) {
      throw new Error("Network response was not ok")
    }
    const item = await response.json()

    // Consistently determine if this product has a discount based on its ID
    // This ensures the same product always has the same discount status
    const hasDiscount = item.id % 3 === 0 // Every third product has a discount
    const discount = hasDiscount ? Math.floor(Math.random() * 30) + 10 : 0 // Discount between 10-40% for selected products

    // Transform the data to match our Product interface
    return {
      id: item.id,
      name: item.title,
      category: item.category,
      description: item.description,
      price: hasDiscount ? Math.round(item.price * (1 - discount / 100)) : item.price,
      originalPrice: hasDiscount ? item.price : null, // Only set originalPrice if there's a discount
      discount: discount,
      rating: item.rating?.rate || 4.5,
      images: [item.image], // Using the image as the primary one
      sizes: ["XS", "S", "M", "L", "XL", "XXL"], // Simulated sizes
      inStock: true, // Simulated stock status
      tags: [item.category, ...(hasDiscount ? ["Sale"] : []), ...(item.id > 15 ? ["New"] : [])], // Add "Sale" tag for discounted items
      isNew: item.id > 15, // Simulate new products (higher IDs are newer)
    }
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error)
    throw error
  }
}

// Get products by category
export const fetchProductsByCategory = async (category) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/category/${category}`)
    if (!response.ok) {
      throw new Error("Network response was not ok")
    }
    const data = await response.json()

    // Transform the data to match our Product interface
    return data.map((item) => {
      // Only apply discount to some products (about 30% of products)
      const hasDiscount = Math.random() < 0.3
      const discount = hasDiscount ? Math.floor(Math.random() * 30) + 10 : 0 // Discount between 10-40% for selected products

      return {
        id: item.id,
        name: item.title,
        category: item.category,
        description: item.description,
        price: hasDiscount ? Math.round(item.price * (1 - discount / 100)) : item.price,
        originalPrice: hasDiscount ? item.price : null, // Only set originalPrice if there's a discount
        discount: discount,
        rating: item.rating?.rate || 4.5,
        images: [item.image], // Using the image as the primary one
        sizes: ["XS", "S", "M", "L", "XL", "XXL"], // Simulated sizes
        inStock: true, // Simulated stock status
        tags: [item.category, ...(hasDiscount ? ["Sale"] : []), ...(item.id > 15 ? ["New"] : [])], // Add "Sale" tag for discounted items
        isNew: item.id > 15, // Simulate new products (higher IDs are newer)
      }
    })
  } catch (error) {
    console.error(`Error fetching products in category ${category}:`, error)
    throw error
  }
}

// Get all categories
export const fetchCategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/categories`)
    if (!response.ok) {
      throw new Error("Network response was not ok")
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching categories:", error)
    throw error
  }
}

// Get sale products (products with discount)
export const fetchSaleProducts = async () => {
  try {
    // In a real API, you would have an endpoint for sale products
    // Here we'll fetch all products and filter them
    const allProducts = await fetchProducts()

    // Filter products with discount
    return allProducts.filter((product) => product.discount > 0)
  } catch (error) {
    console.error("Error fetching sale products:", error)
    throw error
  }
}

// Get new arrival products
export const fetchNewArrivals = async () => {
  try {
    // In a real API, you would have an endpoint for new arrivals
    // Here we'll fetch all products and filter them
    const allProducts = await fetchProducts()

    // Filter products that are marked as new
    // In our case, we're simulating this with the isNew property
    return allProducts.filter((product) => product.isNew)
  } catch (error) {
    console.error("Error fetching new arrivals:", error)
    throw error
  }
}

// Add a new product
export const addProduct = async (productData) => {
  // This is a placeholder. Replace with actual API call.
  console.log("Adding product:", productData)
  return new Promise((resolve) => {
    setTimeout(() => {
      const newProduct = {
        id: Math.floor(Math.random() * 1000), // Mock ID
        ...productData,
      }
      resolve(newProduct)
    }, 500)
  })
}

// Update an existing product
export const updateProduct = async (productData) => {
  // This is a placeholder. Replace with actual API call.
  console.log("Updating product:", productData)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(productData)
    }, 500)
  })
}

// Delete a product
export const deleteProduct = async (productId) => {
  // This is a placeholder. Replace with actual API call.
  console.log("Deleting product with ID:", productId)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 500)
  })
}

// Helper function to get all orders from localStorage
const getAllOrdersFromStorage = () => {
  const ordersJson = localStorage.getItem(ORDERS_STORAGE_KEY)
  return ordersJson ? JSON.parse(ordersJson) : []
}

// Helper function to save all orders to localStorage
const saveAllOrdersToStorage = (orders) => {
  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders))
}

// Helper function to get user-specific orders from localStorage
const getUserOrdersFromStorage = (userId) => {
  const userOrdersKey = userId ? `${USER_ORDERS_PREFIX}${userId}` : GUEST_ORDERS_KEY
  const ordersJson = localStorage.getItem(userOrdersKey)
  return ordersJson ? JSON.parse(ordersJson) : []
}

// Helper function to save user-specific orders to localStorage
const saveUserOrdersToStorage = (userId, orders) => {
  const userOrdersKey = userId ? `${USER_ORDERS_PREFIX}${userId}` : GUEST_ORDERS_KEY
  localStorage.setItem(userOrdersKey, JSON.stringify(orders))
}

// Create a new order
export const createOrder = async (orderData, user = null) => {
  // In a real app, this would be an API call to create an order
  return new Promise((resolve) => {
    setTimeout(() => {
      // Generate a new order with a unique ID and order number
      const newOrder = {
        id: Date.now(), // Use timestamp as ID
        orderNumber: `#MOD-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000)
          .toString()
          .padStart(4, "0")}`,
        orderDate: new Date().toISOString(),
        status: "pending",
        user: user ? { id: user.id, name: user.name, email: user.email } : null,
        customerEmail: user ? user.email : orderData.email,
        shippingAddress: {
          address: orderData.address,
          city: orderData.city || orderData.state,
          zipCode: orderData.zipCode,
          phone: orderData.phone,
        },
        items: orderData.items,
        subtotal: orderData.subtotal,
        shippingCost: orderData.shippingCost,
        discount: orderData.discount || 0,
        totalAmount: orderData.totalAmount,
        paymentMethod: orderData.paymentMethod,
      }

      // Save to all orders
      const allOrders = getAllOrdersFromStorage()
      allOrders.push(newOrder)
      saveAllOrdersToStorage(allOrders)

      // Save to user-specific orders
      const userId = user ? user.id : null
      const userOrders = getUserOrdersFromStorage(userId)
      userOrders.push(newOrder)
      saveUserOrdersToStorage(userId, userOrders)

      resolve(newOrder)
    }, 800)
  })
}

// Fetch all orders (for admin)
export const fetchAllOrders = async () => {
  // In a real app, this would be an API call to fetch all orders
  return new Promise((resolve) => {
    setTimeout(() => {
      // Get all orders from localStorage
      const allOrders = getAllOrdersFromStorage()

      // If there are no saved orders, generate mock data
      if (allOrders.length === 0) {
        const mockOrders = Array.from({ length: 25 }, (_, i) => ({
          id: i + 1,
          orderNumber: `#MOD-${2023}-${(i + 1).toString().padStart(3, "0")}`,
          orderDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(), // Random date in the last 30 days
          status: ["pending", "processing", "shipped", "delivered", "cancelled"][Math.floor(Math.random() * 5)],
          user:
            Math.random() > 0.3
              ? {
                  id: Math.floor(Math.random() * 10) + 1,
                  name: `User ${Math.floor(Math.random() * 100) + 1}`,
                  email: `user${Math.floor(Math.random() * 100) + 1}@example.com`,
                }
              : null, // 70% of orders have registered users
          customerEmail:
            Math.random() > 0.3
              ? `user${Math.floor(Math.random() * 100) + 1}@example.com`
              : `guest${Math.floor(Math.random() * 100) + 1}@example.com`,
          shippingAddress: {
            address: `${Math.floor(Math.random() * 1000) + 1} Main St`,
            city: "Jakarta",
            zipCode: `${Math.floor(Math.random() * 90000) + 10000}`,
            phone: `+62 ${Math.floor(Math.random() * 1000000000) + 1000000000}`,
          },
          items: Array.from({ length: Math.floor(Math.random() * 4) + 1 }, (_, j) => ({
            product: {
              id: j + 1,
              name: `Product ${j + 1}`,
              images: ["/tshirt.jpg"],
            },
            quantity: Math.floor(Math.random() * 3) + 1,
            price: Math.floor(Math.random() * 200000) + 50000,
            size: ["S", "M", "L", "XL"][Math.floor(Math.random() * 4)],
          })),
          subtotal: Math.floor(Math.random() * 1000000) + 200000,
          shippingCost: 39000,
          discount: Math.random() > 0.5 ? Math.floor(Math.random() * 50000) + 10000 : 0,
          totalAmount: Math.floor(Math.random() * 1000000) + 200000,
          paymentMethod: ["Credit Card", "Bank Transfer", "E-Wallet"][Math.floor(Math.random() * 3)],
        }))

        // Save mock orders to localStorage
        saveAllOrdersToStorage(mockOrders)
        resolve(mockOrders)
      } else {
        // Return the saved orders
        resolve(allOrders)
      }
    }, 800)
  })
}

// Update order status
export const updateOrderStatus = async (orderId, newStatus) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Get all orders
      const allOrders = getAllOrdersFromStorage()

      // Find and update the order
      const updatedOrders = allOrders.map((order) => {
        if (order.id === orderId) {
          const updatedOrder = { ...order, status: newStatus }
          return updatedOrder
        }
        return order
      })

      // Save updated orders
      saveAllOrdersToStorage(updatedOrders)

      // Also update in user-specific orders
      const updatedOrder = updatedOrders.find((order) => order.id === orderId)
      if (updatedOrder) {
        const userId = updatedOrder.user ? updatedOrder.user.id : null
        const userOrders = getUserOrdersFromStorage(userId)
        const updatedUserOrders = userOrders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order,
        )
        saveUserOrdersToStorage(userId, updatedUserOrders)
      }

      resolve({ success: true })
    }, 500)
  })
}

// Fetch user orders (for customer)
export const fetchUserOrders = async (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Get user-specific orders from localStorage
      const userOrders = getUserOrdersFromStorage(userId)

      // If there are no saved orders for this user, generate mock data
      if (userOrders.length === 0) {
        const mockOrders = Array.from({ length: 5 }, (_, i) => ({
          id: i + 1,
          orderNumber: `#MOD-${2023}-${(i + 1).toString().padStart(3, "0")}`,
          orderDate: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(), // Random date in the last 90 days
          status: ["pending", "processing", "shipped", "delivered"][Math.floor(Math.random() * 4)],
          user: {
            id: userId,
            name: userId === 1 ? "Admin User" : "Regular User",
            email: userId === 1 ? "admin@example.com" : "user@example.com",
          },
          customerEmail: userId === 1 ? "admin@example.com" : "user@example.com",
          shippingAddress: {
            address: `${Math.floor(Math.random() * 1000) + 1} Main St`,
            city: "Jakarta",
            zipCode: `${Math.floor(Math.random() * 90000) + 10000}`,
            phone: `+62 ${Math.floor(Math.random() * 1000000000) + 1000000000}`,
          },
          items: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, (_, j) => ({
            product: {
              id: j + 1,
              name: `Product ${j + 1}`,
              images: ["/tshirt.jpg"],
            },
            quantity: Math.floor(Math.random() * 3) + 1,
            price: Math.floor(Math.random() * 200000) + 50000,
            size: ["S", "M", "L", "XL"][Math.floor(Math.random() * 4)],
          })),
          subtotal: Math.floor(Math.random() * 1000000) + 200000,
          shippingCost: 39000,
          discount: Math.random() > 0.5 ? Math.floor(Math.random() * 50000) + 10000 : 0,
          totalAmount: Math.floor(Math.random() * 1000000) + 200000,
          paymentMethod: ["Credit Card", "Bank Transfer", "E-Wallet"][Math.floor(Math.random() * 3)],
        }))

        // Save mock orders to localStorage
        saveUserOrdersToStorage(userId, mockOrders)

        // Also add these orders to the all orders collection
        const allOrders = getAllOrdersFromStorage()
        saveAllOrdersToStorage([...allOrders, ...mockOrders])

        resolve(mockOrders)
      } else {
        // Return the saved orders
        resolve(userOrders)
      }
    }, 800)
  })
}

// Fetch guest orders
export const fetchGuestOrders = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const guestOrders = getUserOrdersFromStorage(null)
      resolve(guestOrders)
    }, 800)
  })
}
