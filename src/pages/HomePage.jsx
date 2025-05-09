"use client"

import { useEffect, useState } from "react"
import { ChevronDown, ShoppingBag, Clock, Shield } from "lucide-react"
import { Link } from "react-router-dom"
import { fetchProducts } from "../services/api"

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [newArrivals, setNewArrivals] = useState([])
  const [saleProducts, setSaleProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true)
        const products = await fetchProducts()

        // Get 2 random products for featured section
        const shuffled = [...products].sort(() => 0.5 - Math.random())
        setFeaturedProducts(shuffled.slice(0, 2))

        // Get first 4 products for women's section (simulate women's products)
        setNewArrivals(shuffled.slice(2, 6))

        // Get next 4 products for men's section (simulate men's products)
        setSaleProducts(shuffled.slice(6, 10))
      } catch (error) {
        console.error("Error loading products:", error)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  return (
    <div>
      {/* Hero Section */}
      <div className="relative min-h-screen">
        {/* Dark overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/30 z-0"></div>

        <img src="/bg.png" alt="Fashion model wearing a brown coat" className="object-cover w-full h-screen" />
        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24 z-10">
          <p className="text-white text-sm md:text-base tracking-widest mb-4">
            MADE IN INDONESIA, DEDICATED TO INDONESIA
          </p>
          <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-serif leading-tight max-w-2xl">
            DISCOVER THE ART OF DRESSING UP
          </h1>
        </div>

        {/* Product Cards */}
        <div className="absolute right-8 md:right-16 lg:right-24 bottom-32 space-y-4 z-10 max-w-full w-[360px]">
          {loading ? (
            <>
              <div className="h-40 bg-white/80 rounded-md animate-pulse"></div>
              <div className="h-40 bg-white/80 rounded-md animate-pulse"></div>
            </>
          ) : (
            featuredProducts.map((product) => (
              <Link
                to={`/product/${product.id}`}
                key={product.id}
                className="flex bg-white rounded-md overflow-hidden shadow-lg"
              >
                <div className="w-full sm:w-64 p-4 sm:p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-serif text-[#3e3e3e] line-clamp-2">{product.name}</h3>
                    <p className="text-[#757575] mt-2">{`IDR ${Math.round(product.price * 15000).toLocaleString("id-ID")}`}</p>
                  </div>
                  <span className="text-[#3e3e3e] font-medium mt-4 self-start hover:underline transition-all">
                    SHOP NOW
                  </span>
                </div>
                <div className="w-32 h-32 sm:w-40 sm:h-40 relative flex-shrink-0">
                  <img
                    src={product.images[0] || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>
            ))
          )}
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white flex flex-col items-center z-10">
          <p className="text-sm tracking-widest mb-2">SCROLL DOWN</p>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </div>
      </div>

      {/* Fashion Categories Section */}
      {/* <div className="bg-black text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to="/catalog?category=women's clothing" className="relative h-80 overflow-hidden">
              <img src="/formal-woman.jpg" alt="Formal Woman" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/30 flex items-center">
                <h2 className="text-3xl font-serif px-8">WOMEN'S CLOTHING</h2>
              </div>
            </Link>
            <Link to="/catalog?category=men's clothing" className="relative h-80 overflow-hidden">
              <img src="/casual-style.jpg" alt="Casual Style" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/30 flex items-center">
                <h2 className="text-3xl font-serif px-8">MEN'S CLOTHING</h2>
              </div>
            </Link>
            <Link to="/catalog?category=electronics" className="relative h-80 overflow-hidden">
              <img src="/formal-men.jpg" alt="Formal Men" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/30 flex items-center">
                <h2 className="text-3xl font-serif px-8">ELECTRONICS</h2>
              </div>
            </Link>
            <Link to="/catalog?category=jewelery" className="relative h-80 overflow-hidden">
              <img src="/accessories.jpg" alt="Accessories" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/30 flex items-center">
                <h2 className="text-3xl font-serif px-8">JEWELERY</h2>
              </div>
            </Link>
          </div>
        </div>
      </div> */}

      {/* New Arrivals Section */}
      <div className="bg-black text-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-serif mb-12 text-center">NEW ARRIVALS</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading
              ? Array(4)
                  .fill(0)
                  .map((_, index) => <div key={index} className="h-80 bg-gray-800 animate-pulse rounded-lg"></div>)
              : newArrivals.map((product) => (
                  <div key={product.id} className="group">
                    <Link to={`/product/${product.id}`} className="block">
                      <div className="relative overflow-hidden mb-3">
                        <img
                          src={product.images[0] || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-80 object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-[#8b4513] text-white text-xs font-bold px-2 py-1 rounded">
                          NEW
                        </div>
                      </div>
                      <div className="text-gray-400 uppercase text-xs mb-1">{product.category}</div>
                      <h3 className="text-white font-medium">{product.name}</h3>
                      <p className="text-gray-400">{`IDR ${Math.round(product.price * 15000).toLocaleString("id-ID")}`}</p>
                    </Link>
                  </div>
                ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/catalog"
              className="inline-flex items-center px-4 py-2 border border-[#8b4513] text-[#8b4513] hover:bg-[#8b4513] hover:text-white transition-colors"
            >
              SEE MORE
              <ChevronDown className="ml-2 w-4 h-4 rotate-270" />
            </Link>
          </div>
        </div>
      </div>

      {/* Sale Products Section */}
      <div className="bg-black text-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-serif mb-12 text-center">ON SALE</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading
              ? Array(4)
                  .fill(0)
                  .map((_, index) => <div key={index} className="h-80 bg-gray-800 animate-pulse rounded-lg"></div>)
              : saleProducts.map((product) => (
                  <div key={product.id} className="group">
                    <Link to={`/product/${product.id}`} className="block">
                      <div className="relative overflow-hidden mb-3">
                        <img
                          src={product.images[0] || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-80 object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                          -{product.discount}%
                        </div>
                      </div>
                      <div className="text-gray-400 uppercase text-xs mb-1">{product.category}</div>
                      <h3 className="text-white font-medium">{product.name}</h3>
                      <div className="flex items-center">
                        <p className="text-red-500 mr-2">{`IDR ${Math.round(product.price * 15000).toLocaleString("id-ID")}`}</p>
                        <p className="text-gray-400 line-through text-sm">{`IDR ${Math.round(product.originalPrice * 15000).toLocaleString("id-ID")}`}</p>
                      </div>
                    </Link>
                  </div>
                ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/catalog"
              className="inline-flex items-center px-4 py-2 border border-[#8b4513] text-[#8b4513] hover:bg-[#8b4513] hover:text-white transition-colors"
            >
              SEE MORE
              <ChevronDown className="ml-2 w-4 h-4 rotate-270" />
            </Link>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-black text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white text-[#3e3e3e] p-8 text-center">
              <div className="w-12 h-12 bg-[#8b4513] rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-serif mb-4">100% Satisfaction Guaranteed</h3>
              <p className="text-sm text-gray-600">
                We stand behind our products with a satisfaction guarantee. If you're not completely happy with your
                purchase, we'll make it right.
              </p>
            </div>

            <div className="bg-white text-[#3e3e3e] p-8">
              <div className="w-12 h-12 bg-[#8b4513] rounded-full flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-serif mb-4">24/7 Online Service</h3>
              <p className="text-sm text-gray-600 mb-6">
                Our customer service team is available around the clock to assist with any questions or concerns you may
                have.
              </p>

              <div className="w-12 h-12 bg-[#8b4513] rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-serif mb-4">Fast Delivery</h3>
              <p className="text-sm text-gray-600">
                Enjoy quick and reliable delivery services to get your fashion items to your doorstep without delay.
              </p>
            </div>

            <div className="bg-white text-[#3e3e3e] p-8 text-center">
              <div className="w-12 h-12 bg-[#8b4513] rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-serif mb-4">Payment With Secure System</h3>
              <p className="text-sm text-gray-600">
                Shop with confidence knowing that all transactions are processed through our secure payment system,
                protecting your personal information.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="bg-black">
        <div className="container mx-auto">
          <img
            src="/image.png"
            alt="Woman in red sweater"
            className="w-full h-[500px] object-cover object-center"
          />
        </div>
      </div>
    </div>
  )
}

export default HomePage
