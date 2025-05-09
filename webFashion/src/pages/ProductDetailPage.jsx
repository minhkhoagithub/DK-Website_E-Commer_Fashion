"use client"

import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { Star, ShoppingCart, ArrowLeft, Minus, Plus } from "lucide-react"
import { fetchProductById } from "../services/api"
import { useCart } from "../contexts/CartContext"

const ProductDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState(null)
  const [mainImage, setMainImage] = useState("")

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true)
        const data = await fetchProductById(Number.parseInt(id))
        setProduct(data)
        setMainImage(data.images[0])
        // Select the first size by default
        if (data.sizes && data.sizes.length > 0) {
          setSelectedSize(data.sizes[0])
        }
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    getProduct()
  }, [id])

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size")
      return
    }

    addToCart(product, quantity, selectedSize)

    // Show success message or redirect
    alert(`Added ${quantity} ${product.name} (${selectedSize}) to cart!`)
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  // Format price to IDR
  const formatPrice = (price) => {
    if (!price) return ""
    return `IDR ${Math.round(price * 15000).toLocaleString("id-ID")}`
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2 h-96 bg-gray-200 rounded-lg"></div>
            <div className="w-full md:w-1/2">
              <div className="h-10 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
              <div className="h-24 bg-gray-200 rounded w-full mb-4"></div>
              <div className="h-10 bg-gray-200 rounded w-full mb-4"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
          <p className="text-red-700">Error loading product details: {error.message}</p>
          <button onClick={() => navigate(-1)} className="mt-4 flex items-center text-[#8b4513] hover:underline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </button>
        </div>
      </div>
    )
  }

  if (!product) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/catalog" className="flex items-center text-[#3e3e3e] hover:text-[#8b4513]">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Catalog
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Images */}
        <div className="w-full md:w-1/2">
          <div className="mb-4">
            <img
              src={mainImage || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>
          <div className="grid grid-cols-5 gap-2">
            {product.images.map((image, index) => (
              <div
                key={index}
                className={`cursor-pointer border rounded-md overflow-hidden ${mainImage === image ? "border-[#8b4513]" : "border-gray-200"}`}
                onClick={() => setMainImage(image)}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} view ${index + 1}`}
                  className="w-full h-auto object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="w-full md:w-1/2">
          <div className="mb-2">
            <div className="text-sm uppercase text-gray-500">{product.category}</div>
            <div className="flex items-center">
              <div className="flex mr-2">
                {Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <Star
                      key={index}
                      className={`w-4 h-4 ${index < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
              </div>
              <span className="text-sm text-gray-600">{product.rating}</span>
            </div>
          </div>

          <h1 className="text-4xl font-serif text-[#3e3e3e] mb-4">{product.name}</h1>

          <div className="mb-6">
            {product.discount > 0 && (
              <div className="flex items-center mb-1">
                <span className="text-gray-500 line-through mr-2">{formatPrice(product.originalPrice)}</span>
                <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">{product.discount}%</span>
              </div>
            )}
            <div className="text-2xl font-medium text-[#8b4513]">{formatPrice(product.price)}</div>
          </div>

          <div className="mb-6">
            <p className="text-gray-700">{product.description}</p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-[#3e3e3e] mb-2">Size</label>
            <div className="flex space-x-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`h-10 w-10 flex items-center justify-center border ${
                    selectedSize === size
                      ? "border-[#8b4513] bg-[#8b4513]/10 text-[#8b4513]"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-[#3e3e3e] mb-2">Quantity</label>
            <div className="flex items-center">
              <button onClick={decreaseQuantity} className="p-2 border border-gray-300 rounded-l">
                <Minus className="w-4 h-4" />
              </button>
              <input
                type="text"
                value={quantity}
                onChange={(e) => {
                  const val = Number.parseInt(e.target.value)
                  if (!isNaN(val) && val > 0) {
                    setQuantity(val)
                  }
                }}
                className="w-16 border-t border-b border-gray-300 p-2 text-center"
              />
              <button onClick={increaseQuantity} className="p-2 border border-gray-300 rounded-r">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full py-3 bg-[#8b4513] text-white rounded-md flex items-center justify-center hover:bg-[#a05a2c] transition-colors"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            ADD TO CART
          </button>
        </div>
      </div>

      {/* Product description, reviews, etc. can be added here */}
      <div className="mt-12">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button className="py-4 px-1 border-b-2 border-[#8b4513] font-medium text-[#8b4513]">Description</button>
            <button className="py-4 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300">
              Reviews
            </button>
            <button className="py-4 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300">
              Shipping Information
            </button>
          </nav>
        </div>
        <div className="py-6">
          <h2 className="text-xl font-medium mb-4">Product Description</h2>
          <p className="text-gray-700 whitespace-pre-line">{product.description}</p>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage
