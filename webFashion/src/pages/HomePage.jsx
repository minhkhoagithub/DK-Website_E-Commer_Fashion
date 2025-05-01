import { ChevronDown, ShoppingBag, Clock, Shield } from "lucide-react"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    fetch("https://6813751b129f6313e21154ee.mockapi.io/api/v1/data/TrangSuc")
      .then((res) => res.json())
      .then((data) => setFeaturedProducts(data))
      .catch((err) => console.error("Lỗi khi fetch API:", err));
  }, []);

  const [womenDresses,setWomenDresses] = useState([]);
  useEffect(() => {
    fetch("https://6813751b129f6313e21154ee.mockapi.io/api/v1/data/QuanAo")
      .then((res) => res.json())
      .then((data) => setWomenDresses(data))
      .catch((err) => console.error("Lỗi khi fetch API:", err));
  },[]);

  const [menOutfits,setMenOutfits] = useState([]);
  useEffect(() => {
    fetch("https://6813751b129f6313e21154ee.mockapi.io/api/v1/data/QuanAo")
      .then((res) => res.json())
      .then((data) => setMenOutfits(data))
      .catch((err) => console.error("Lỗi khi fetch API:", err));
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div className="relative min-h-screen">
        {/* Dark overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/30 z-0"></div>

        <img src="../img/hero.jpg" alt="Fashion model wearing a brown coat" className="object-cover w-full h-screen" />
        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24 z-10">
          <p className="text-white text-sm md:text-base tracking-widest mb-4">
            MADE IN INDONESIA, DEDICATED TO INDONESIA
          </p>
          <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-serif leading-tight max-w-2xl">
            DISCOVER THE ART OF DRESSING UP
          </h1>
        </div>

        {/* Product Cards */}
        <div className="absolute right-24 md:right-16 lg:right-24 bottom-32 space-y-4 z-10 max-w-full w-[360px]">
      {featuredProducts.slice(0, 2).map((product) => (
        <div key={product.id} className="flex bg-white rounded-md overflow-hidden shadow-lg">
          <div className="w-full sm:w-64 p-4 sm:p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-xl sm:text-2xl font-serif text-[#3e3e3e] line-clamp-2">
                {product.name}
              </h3>
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
              src={product.img?.[0]}
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
      <div className="bg-white text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-4">
            

            {/* FORMAL WOMAN */}
            <div className="relative h-80 overflow-hidden">
              <img src="../img/formal-woman.jpg" alt="Formal Woman" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/30 flex items-center">
                <h2 className="text-3xl font-serif px-8">FORMAL WOMAN</h2>
              </div>
            </div>

            {/* CASUAL STYLE - merge dọc */}
            <div className="relative h-164 overflow-hidden md:row-span-2">
              <img src="../img/casual-style.jpg" alt="Casual Style" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <h2 className="text-3xl font-serif px-8">CASUAL STYLE</h2>
              </div>
            </div>

            {/* FORMAL MEN */}
            <div className="relative h-80 overflow-hidden">
              <img src="../img/formal-man.jpg" alt="Formal Men" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/30 flex items-center">
                <h2 className="text-3xl font-serif px-8">FORMAL MEN</h2>
              </div>
            </div>
            
          </div>
        </div>
      </div>


      {/* Women's Dresses Section */}
      <div className="bg-white text-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl text-black font-serif mb-12 text-center">THE BEST DRESS FOR THE BEST WOMAN</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {womenDresses.slice(5,7).map((product) => (
              <div key={product.id} className="group">
                <div className="relative overflow-hidden mb-3">
                  <img
                    src={product.img?.[0]}
                    alt={product.Name}
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-[#8b4513] text-white text-xs font-bold px-2 py-1 rounded">
                    {product.tag}
                  </div>
                </div>
                <div className="text-gray-400 uppercase text-xs mb-1">PRODUCT CATEGORY</div>
                <h3 className="text-gray-400 font-medium">{product.Name}</h3>
                <p className="text-gray-400">{product.Price}</p>
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
      <div className="bg-white text-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl text-black font-serif mb-12 text-center">BEST OUTFIT FOR YOUR HAPPINESS</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {menOutfits.map((product) => (
              <div key={product.id} className="group">
                <div className="relative overflow-hidden mb-3">
                  <img
                    src={product.img?.[0]}
                    alt={product.Name}
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-[#8b4513] text-white text-xs font-bold px-2 py-1 rounded">
                    {product.tag}
                  </div>
                </div>
                <div className="text-gray-400 uppercase text-xs mb-1">PRODUCT CATEGORY</div>
                <h3 className="text-gray-400 font-medium">{product.Name}</h3>
                <p className="text-gray-400">{product.Price}</p>
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
      <div className="bg-white text-white py-16">
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

            <div className="bg-white text-[#3e3e3e] p-8 space-y-8">
              {/* Khối 1 */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#8b4513] rounded-full flex items-center justify-center mt-1 shrink-0">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-serif mb-2">24/7 Online Service</h3>
                  <p className="text-sm text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.
                  </p>
                </div>
              </div>

              {/* Khối 2 */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#8b4513] rounded-full flex items-center justify-center mt-1 shrink-0">
                  <ShoppingBag className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-serif mb-2">Fast Delivery</h3>
                  <p className="text-sm text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.
                  </p>
                </div>
              </div>
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
            src="../img/featured-outfit.jpg"
            alt="Woman in red sweater"
            className="w-full h-[500px] object-cover object-center"
          />
        </div>
      </div>
    </div>
  )
}

export default HomePage
