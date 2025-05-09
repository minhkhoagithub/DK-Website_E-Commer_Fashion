"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { fetchProducts } from "../services/api"
import ProductCard from "../components/ProductCard"

const SalePage = () => {
  const [saleProducts, setSaleProducts] = useState([])
  const [featuredSaleProducts, setFeaturedSaleProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true)
        const allProducts = await fetchProducts()

        // Filter products with discount (all products have simulated discounts in our API)
        // In a real API, you would filter by products that actually have discounts
        const discountedProducts = allProducts.filter((product) => product.discount > 0)

        // Sort by discount percentage (highest first)
        discountedProducts.sort((a, b) => b.discount - a.discount)

        // Get top 2 products with highest discount for featured section
        setFeaturedSaleProducts(discountedProducts.slice(0, 2))

        // Get remaining products for the grid
        setSaleProducts(discountedProducts.slice(2))
      } catch (err) {
        console.error("Error loading sale products:", err)
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="h-80 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="h-80 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>

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
            <h1 className="text-4xl font-serif text-[#3e3e3e] mb-4">Sale</h1>
            <p className="text-red-500">Error loading sale products: {error.message}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif text-[#3e3e3e] mb-4">Sale</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our special offers and discounts on premium fashion items.
          </p>
        </div>

        <div className="bg-[#8b4513]/10 rounded-lg p-8 mb-12 text-center">
          <h2 className="text-2xl font-serif text-[#8b4513] mb-2">Special Discount</h2>
          <p className="text-xl text-[#3e3e3e] mb-4">Get up to 50% off on selected items</p>
          <p className="text-gray-600 mb-6">Limited time offer. While stocks last.</p>
          <Link
            to="/catalog"
            className="px-6 py-3 bg-[#8b4513] text-white rounded-md font-medium hover:bg-[#a05a2c] transition-colors"
          >
            Shop Now
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {featuredSaleProducts.map((product) => (
            <div key={product.id} className="relative h-80 rounded-lg overflow-hidden">
              <img
                src={product.images[0] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white p-6">
                <div className="absolute top-2 right-2 bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-full">
                  {product.discount}% OFF
                </div>
                <h3 className="text-2xl font-serif mb-2">{product.name}</h3>
                <div className="flex items-center mb-4">
                  <span className="text-white line-through mr-2">{formatPrice(product.originalPrice)}</span>
                  <span className="text-white font-bold">{formatPrice(product.price)}</span>
                </div>
                <Link
                  to={`/product/${product.id}`}
                  className="px-4 py-2 bg-white text-[#3e3e3e] rounded-md font-medium hover:bg-gray-100 transition-colors"
                >
                  View Product
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-serif text-[#3e3e3e] mb-4">Featured Sale Items</h2>
          <p className="text-gray-600">Handpicked items with the best discounts</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {saleProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {saleProducts.length > 8 && (
          <div className="mt-12 text-center">
            <button className="px-6 py-3 border-2 border-[#8b4513] text-[#8b4513] rounded-md font-medium hover:bg-[#8b4513] hover:text-white transition-colors">
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default SalePage
