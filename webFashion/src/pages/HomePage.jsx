import { ChevronDown, ShoppingBag, Clock, Shield } from "lucide-react"
import { Link } from "react-router-dom"

const HomePage = () => {
  const featuredProducts = [
    {
      id: 1,
      name: "Brown Leather Jacket",
      price: "IDR 1.200.000",
      image: "/product1.png",
    },
    {
      id: 2,
      name: "Elegant Black Dress",
      price: "IDR 850.000",
      image: "/product2.png",
    },
  ]

  const womenDresses = [
    {
      id: 1,
      name: "White Summer Dress",
      price: "IDR 599.000",
      image: "/women-dress1.jpg",
      tag: "HOT",
    },
    {
      id: 2,
      name: "Navy Cocktail Dress",
      price: "IDR 899.000",
      image: "/women-dress2.jpg",
      tag: "NEW",
    },
    {
      id: 3,
      name: "Teal Maxi Dress",
      price: "IDR 799.000",
      image: "/women-dress3.jpg",
      tag: "NEW",
    },
    {
      id: 4,
      name: "Blush Evening Gown",
      price: "IDR 1.299.000",
      image: "/women-dress4.jpg",
      tag: "HOT",
    },
  ]

  const menOutfits = [
    {
      id: 1,
      name: "Black Formal Suit",
      price: "IDR 1.899.000",
      image: "/men-outfit1.jpg",
      tag: "HOT",
    },
    {
      id: 2,
      name: "Burgundy Sweater",
      price: "IDR 699.000",
      image: "/men-outfit2.jpg",
      tag: "NEW",
    },
    {
      id: 3,
      name: "Mustard Casual Jacket",
      price: "IDR 899.000",
      image: "/men-outfit3.jpg",
      tag: "NEW",
    },
    {
      id: 4,
      name: "Plaid Flannel Shirt",
      price: "IDR 499.000",
      image: "/men-outfit4.jpg",
      tag: "HOT",
    },
  ]

  return (
    <div>
      {/* Hero Section */}
      <div className="relative min-h-screen">
        {/* Dark overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/30 z-0"></div>

        <img src="/hero-image.png" alt="Fashion model wearing a brown coat" className="object-cover w-full h-screen" />
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
          {featuredProducts.map((product) => (
            <div key={product.id} className="flex bg-white rounded-md overflow-hidden shadow-lg">
              <div className="w-full sm:w-64 p-4 sm:p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl sm:text-2xl font-serif text-[#3e3e3e] line-clamp-2">{product.name}</h3>
                  <p className="text-[#757575] mt-2">{product.price}</p>
                </div>
                <Link
                  to="/catalog"
                  className="text-[#3e3e3e] font-medium mt-4 self-start hover:underline transition-all"
                >
                  SHOP NOW
                </Link>
              </div>
              <div className="w-32 h-32 sm:w-40 sm:h-40 relative flex-shrink-0">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white flex flex-col items-center z-10">
          <p className="text-sm tracking-widest mb-2">SCROLL DOWN</p>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </div>
      </div>

      {/* Fashion Categories Section */}
      <div className="bg-black text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative h-80 overflow-hidden">
              <img src="/formal-woman.jpg" alt="Formal Woman" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/30 flex items-center">
                <h2 className="text-3xl font-serif px-8">FORMAL WOMAN</h2>
              </div>
            </div>
            <div className="relative h-80 overflow-hidden">
              <img src="/casual-style.jpg" alt="Casual Style" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/30 flex items-center">
                <h2 className="text-3xl font-serif px-8">CASUAL STYLE</h2>
              </div>
            </div>
            <div className="relative h-80 overflow-hidden">
              <img src="/formal-men.jpg" alt="Formal Men" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/30 flex items-center">
                <h2 className="text-3xl font-serif px-8">FORMAL MEN</h2>
              </div>
            </div>
            <div className="relative h-80 overflow-hidden">
              <img src="/accessories.jpg" alt="Accessories" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/30 flex items-center">
                <h2 className="text-3xl font-serif px-8">ACCESSORIES</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Women's Dresses Section */}
      <div className="bg-black text-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-serif mb-12 text-center">THE BEST DRESS FOR THE BEST WOMAN</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {womenDresses.map((product) => (
              <div key={product.id} className="group">
                <div className="relative overflow-hidden mb-3">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-[#8b4513] text-white text-xs font-bold px-2 py-1 rounded">
                    {product.tag}
                  </div>
                </div>
                <div className="text-gray-400 uppercase text-xs mb-1">PRODUCT CATEGORY</div>
                <h3 className="text-white font-medium">{product.name}</h3>
                <p className="text-gray-400">{product.price}</p>
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

      {/* Men's Outfits Section */}
      <div className="bg-black text-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-serif mb-12 text-center">BEST OUTFIT FOR YOUR HAPPINESS</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {menOutfits.map((product) => (
              <div key={product.id} className="group">
                <div className="relative overflow-hidden mb-3">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-[#8b4513] text-white text-xs font-bold px-2 py-1 rounded">
                    {product.tag}
                  </div>
                </div>
                <div className="text-gray-400 uppercase text-xs mb-1">PRODUCT CATEGORY</div>
                <h3 className="text-white font-medium">{product.name}</h3>
                <p className="text-gray-400">{product.price}</p>
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum
                tristique. Duis cursus, mi quis viverra ornare.
              </p>
            </div>

            <div className="bg-white text-[#3e3e3e] p-8">
              <div className="w-12 h-12 bg-[#8b4513] rounded-full flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-serif mb-4">24/7 Online Service</h3>
              <p className="text-sm text-gray-600 mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum
                tristique.
              </p>

              <div className="w-12 h-12 bg-[#8b4513] rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-serif mb-4">Fast Delivery</h3>
              <p className="text-sm text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum
                tristique.
              </p>
            </div>

            <div className="bg-white text-[#3e3e3e] p-8 text-center">
              <div className="w-12 h-12 bg-[#8b4513] rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-serif mb-4">Payment With Secure System</h3>
              <p className="text-sm text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum
                tristique. Duis cursus, mi quis viverra ornare.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="bg-black">
        <div className="container mx-auto">
          <img
            src="/featured-outfit.jpg"
            alt="Woman in red sweater"
            className="w-full h-[500px] object-cover object-center"
          />
        </div>
      </div>
    </div>
  )
}

export default HomePage
