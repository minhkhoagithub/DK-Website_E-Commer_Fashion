"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Star } from "lucide-react"

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false)

  if (!product) return null

  // Format price to IDR
  const formatPrice = (price) => {
    return `IDR ${Math.round(price * 15000).toLocaleString("id-ID")}`
  }

  // Calculate discount percentage
  const discountPercentage = product.discount ? product.discount : 0

  return (
    <div
      className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.id}`} className="block relative">
        <div className="relative h-64 overflow-hidden">
          {/* Product image */}
          <img
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? "scale-105" : ""}`}
          />

          {/* Discount tag */}
          {discountPercentage > 0 && (
            <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
              {discountPercentage}%
            </div>
          )}
        </div>

        <div className="p-4">
          {/* Category */}
          <div className="text-gray-500 uppercase text-xs mb-1">{product.category}</div>

          {/* Product name */}
          <h3 className="text-[#3e3e3e] font-medium truncate">{product.name}</h3>

          {/* Rating */}
          <div className="flex items-center mt-1 mb-2">
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <Star
                  key={index}
                  className={`w-4 h-4 ${index < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                />
              ))}
            <span className="text-sm text-gray-500 ml-1">{product.rating}</span>
          </div>

          {/* Prices */}
          <div className="flex items-center">
            {discountPercentage > 0 && (
              <span className="text-gray-500 line-through text-sm mr-2">{formatPrice(product.originalPrice)}</span>
            )}
            <span className={`${discountPercentage > 0 ? "text-red-600" : "text-[#3e3e3e]"} font-medium`}>
              {formatPrice(product.price)}
            </span>
          </div>
        </div>
      </Link>

      {/* Quick shop button that appears on hover */}
      <div className={`px-4 pb-4 ${isHovered ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}>
        <Link
          to={`/product/${product.id}`}
          className="block w-full py-2 bg-[#8b4513] text-white text-center text-sm font-medium rounded hover:bg-[#a05a2c] transition-colors"
        >
          QUICK VIEW
        </Link>
      </div>
    </div>
  )
}

export default ProductCard
