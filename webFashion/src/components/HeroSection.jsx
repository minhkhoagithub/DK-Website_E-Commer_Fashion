import { ChevronDown } from "lucide-react"
import ProductCard from "./ProductCard"

const HeroSection = () => {
  const products = [
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

  return (
    <div className="relative h-screen">
      {/* Dark overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/30 z-0"></div>

      <img src="/hero-image.png" alt="Fashion model wearing a brown coat" className="object-cover w-full h-full" />
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
        {products.map((product) => (
          <ProductCard key={product.id} name={product.name} price={product.price} image={product.image} />
        ))}
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white flex flex-col items-center z-10">
        <p className="text-sm tracking-widest mb-2">SCROLL DOWN</p>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </div>
    </div>
  )
}

export default HeroSection
