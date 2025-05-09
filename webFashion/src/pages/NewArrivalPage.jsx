"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { fetchProducts } from "../services/api"
import ProductCard from "../components/ProductCard"

const NewArrivalPage = () => {
  const [newProducts, setNewProducts] = useState([])
  const [featuredNewProduct, setFeaturedNewProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true)
        const allProducts = await fetchProducts()

        // In a real API, you would filter by products that are marked as "new"
        // Since our fake API doesn't have this flag, we'll simulate it by:
        // 1. Adding a simulated "isNew" property to some products
        // 2. Or sorting by ID (assuming higher IDs are newer products)

        // Sort by ID (higher IDs first) to simulate newest products
        const sortedProducts = [...allProducts].sort((a, b) => b.id - a.id)

        // Get the first product for the featured section
        setFeaturedNewProduct(sortedProducts[0])

        // Get the rest for the grid
        setNewProducts(sortedProducts.slice(1))
      } catch (err) {
        console.error("Error loading new arrival products:", err)
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  // Format price to IDR
  const formatPrice = (price) => {
    return `IDR ${Math.round(price * 15000).toLocaleString("id-ID")}`
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="h-10 bg-gray-200 rounded w-1/4 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>

          <div className="h-96 bg-gray-200 rounded-lg animate-pulse mb-12"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="h-80 bg-gray-200 rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-serif text-[#3e3e3e] mb-4">New Arrivals</h1>
            <p className="text-red-500">Error loading new products: {error.message}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif text-[#3e3e3e] mb-4">New Arrivals</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our latest collection of premium fashion items, fresh off the runway.
          </p>
        </div>

        {featuredNewProduct && (
          <div className="relative h-96 rounded-lg overflow-hidden mb-12">
            <img
              src={featuredNewProduct.images[0] || "/hero-image.png"}
              alt="New collection"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white p-6">
              <div className="absolute top-4 right-4 bg-[#8b4513] text-white text-sm font-bold px-3 py-1 rounded-full">
                NEW ARRIVAL
              </div>
              <h2 className="text-3xl font-serif mb-2">{featuredNewProduct.name}</h2>
              <p className="text-center mb-6 max-w-md">
                Our newest collection inspired by the latest trends and premium materials
              </p>
              <Link
                to={`/product/${featuredNewProduct.id}`}
                className="px-6 py-3 bg-white text-[#3e3e3e] rounded-md font-medium hover:bg-gray-100 transition-colors"
              >
                Explore Product
              </Link>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {newProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-[#8b4513]/10 rounded-lg p-6 text-center">
            <h3 className="text-xl font-serif text-[#3e3e3e] mb-2">Free Shipping</h3>
            <p className="text-gray-600">On all new arrivals for a limited time</p>
          </div>

          <div className="bg-[#8b4513]/10 rounded-lg p-6 text-center">
            <h3 className="text-xl font-serif text-[#3e3e3e] mb-2">Exclusive Access</h3>
            <p className="text-gray-600">Members get early access to new items</p>
          </div>

          <div className="bg-[#8b4513]/10 rounded-lg p-6 text-center">
            <h3 className="text-xl font-serif text-[#3e3e3e] mb-2">Limited Edition</h3>
            <p className="text-gray-600">Special pieces available for a short time</p>
          </div>
        </div>

        {newProducts.length > 8 && (
          <div className="text-center">
            <button className="px-6 py-3 border-2 border-[#8b4513] text-[#8b4513] rounded-md font-medium hover:bg-[#8b4513] hover:text-white transition-colors">
              View All New Arrivals
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default NewArrivalPage
