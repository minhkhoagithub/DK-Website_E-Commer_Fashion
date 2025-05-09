// Base URL for the API
const API_BASE_URL = "https://fakestoreapi.com" // We'll use a fake store API for demo purposes

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

// Fetch all orders (for admin)
export const fetchAllOrders = async () => {
  // This is a placeholder. Replace with actual API call.
  return new Promise((resolve) => {
    setTimeout(() => {
      // Generate mock orders
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

      resolve(mockOrders)
    }, 800)
  })
}

// Update order status
export const updateOrderStatus = async (orderId, newStatus) => {
  // This is a placeholder. Replace with actual API call.
  console.log(`Updating order ${orderId} status to ${newStatus}`)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true })
    }, 500)
  })
}

// Fetch user orders (for customer)
export const fetchUserOrders = async (userId) => {
  // This is a placeholder. Replace with actual API call.
  return new Promise((resolve) => {
    setTimeout(() => {
      // Generate mock orders for this user
      const mockOrders = Array.from({ length: 5 }, (_, i) => ({
        id: i + 1,
        orderNumber: `#MOD-${2023}-${(i + 1).toString().padStart(3, "0")}`,
        orderDate: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(), // Random date in the last 90 days
        status: ["pending", "processing", "shipped", "delivered"][Math.floor(Math.random() * 4)],
        items: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, (_, j) => ({
          product: {
            id: j + 1,
            name: `Product ${j + 1}`,
            images: ["/placeholder.svg?height=100&width=100"],
          },
          quantity: Math.floor(Math.random() * 3) + 1,
          price: Math.floor(Math.random() * 200000) + 50000,
        })),
        subtotal: Math.floor(Math.random() * 800000) + 200000,
        shippingCost: 39000,
        discount: Math.random() > 0.5 ? Math.floor(Math.random() * 50000) + 10000 : 0,
        totalAmount: Math.floor(Math.random() * 1000000) + 200000,
        paymentMethod: ["Credit Card", "Bank Transfer", "E-Wallet"][Math.floor(Math.random() * 3)],
        shippingAddress: {
          address: `${Math.floor(Math.random() * 1000) + 1} Main St`,
          city: "Jakarta",
          zipCode: `${Math.floor(Math.random() * 90000) + 10000}`,
          phone: `+62 ${Math.floor(Math.random() * 1000000000) + 1000000000}`,
        },
      }))

      resolve(mockOrders)
    }, 800)
  })
}
