"use client"

import { useEffect, useState } from "react"
import { Filter, ChevronDown } from "lucide-react"

const CatalogPage = () => {
  const [filterOpen, setFilterOpen] = useState(false)

  // Mock product data
  const [products,setProducts] = useState([])
  useEffect(() => {
    fetch("https://6813751b129f6313e21154ee.mockapi.io/api/v1/data/QuanAo")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Lỗi khi fetch API:", err));
  }, [])  

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif text-[#3e3e3e] mb-4">Our Collection</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our carefully curated collection of premium fashion items, designed with quality and style in mind.
          </p>
        </div>

        <div className="flex justify-between items-center mb-8">
          <button
            className="flex items-center text-[#3e3e3e] hover:text-[#8b4513]"
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <Filter className="w-5 h-5 mr-2" />
            Filter
          </button>

          <div className="flex items-center">
            <span className="text-sm text-gray-600 mr-2">Sort by:</span>
            <div className="relative">
              <select className="appearance-none bg-white border border-gray-300 rounded-md py-1 pl-3 pr-8 text-sm focus:outline-none focus:ring-[#8b4513] focus:border-[#8b4513]">
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Popularity</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>

        {filterOpen && (
          <div className="bg-white shadow-md rounded-lg p-6 mb-8 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <h3 className="font-medium text-[#3e3e3e] mb-3">Categories</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-[#8b4513] focus:ring-[#8b4513]" />
                  <span className="ml-2 text-sm">Outerwear</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-[#8b4513] focus:ring-[#8b4513]" />
                  <span className="ml-2 text-sm">Dresses</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-[#8b4513] focus:ring-[#8b4513]" />
                  <span className="ml-2 text-sm">Tops</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-[#8b4513] focus:ring-[#8b4513]" />
                  <span className="ml-2 text-sm">Bottoms</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-[#8b4513] focus:ring-[#8b4513]" />
                  <span className="ml-2 text-sm">Accessories</span>
                </label>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-[#3e3e3e] mb-3">Price Range</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-[#8b4513] focus:ring-[#8b4513]" />
                  <span className="ml-2 text-sm">Under IDR 500,000</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-[#8b4513] focus:ring-[#8b4513]" />
                  <span className="ml-2 text-sm">IDR 500,000 - 1,000,000</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-[#8b4513] focus:ring-[#8b4513]" />
                  <span className="ml-2 text-sm">IDR 1,000,000 - 1,500,000</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-[#8b4513] focus:ring-[#8b4513]" />
                  <span className="ml-2 text-sm">Over IDR 1,500,000</span>
                </label>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-[#3e3e3e] mb-3">Size</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-[#8b4513] focus:ring-[#8b4513]" />
                  <span className="ml-2 text-sm">XS</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-[#8b4513] focus:ring-[#8b4513]" />
                  <span className="ml-2 text-sm">S</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-[#8b4513] focus:ring-[#8b4513]" />
                  <span className="ml-2 text-sm">M</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-[#8b4513] focus:ring-[#8b4513]" />
                  <span className="ml-2 text-sm">L</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-[#8b4513] focus:ring-[#8b4513]" />
                  <span className="ml-2 text-sm">XL</span>
                </label>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-[#3e3e3e] mb-3">Color</h3>
              <div className="flex flex-wrap gap-2">
                <button className="w-6 h-6 rounded-full bg-black border border-gray-300"></button>
                <button className="w-6 h-6 rounded-full bg-white border border-gray-300"></button>
                <button className="w-6 h-6 rounded-full bg-red-500 border border-gray-300"></button>
                <button className="w-6 h-6 rounded-full bg-blue-500 border border-gray-300"></button>
                <button className="w-6 h-6 rounded-full bg-green-500 border border-gray-300"></button>
                <button className="w-6 h-6 rounded-full bg-yellow-500 border border-gray-300"></button>
                <button className="w-6 h-6 rounded-full bg-purple-500 border border-gray-300"></button>
                <button className="w-6 h-6 rounded-full bg-pink-500 border border-gray-300"></button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="group">
              <div className="relative overflow-hidden rounded-lg mb-3">
                <img
                  src={product.img?.[0]}
                  alt={product.Name}
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="bg-white text-[#3e3e3e] px-4 py-2 rounded-md font-medium transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    Quick View
                  </button>
                </div>
              </div>
              <h3 className="text-[#3e3e3e] font-medium">{product.Name}</h3>
              <p className="text-gray-600 text-sm">{product.category}</p>
              <p className="text-[#8b4513] font-medium mt-1">{product.Price}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <button className="px-6 py-3 border-2 border-[#8b4513] text-[#8b4513] rounded-md font-medium hover:bg-[#8b4513] hover:text-white transition-colors">
            Load More
          </button>
        </div>
      </div>
    </div>
  )
}

export default CatalogPage
