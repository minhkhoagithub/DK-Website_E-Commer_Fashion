"use client"

import { useState, useEffect } from "react"
import { Filter, ChevronDown } from "lucide-react"
import { fetchCategories } from "../services/api"

const ProductFilter = ({ onFilterChange, onSortChange }) => {
  const [filterOpen, setFilterOpen] = useState(false)
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("")
  const [priceRange, setPriceRange] = useState("")
  const [selectedSort, setSelectedSort] = useState("newest")

  useEffect(() => {
    // Fetch categories from API
    const getCategories = async () => {
      try {
        const data = await fetchCategories()
        setCategories(data)
      } catch (error) {
        console.error("Failed to fetch categories:", error)
      }
    }

    getCategories()
  }, [])

  const handleCategoryChange = (e) => {
    const category = e.target.value
    setSelectedCategory(category)
    onFilterChange({ category, priceRange })
  }

  const handlePriceRangeChange = (e) => {
    const price = e.target.value
    setPriceRange(price)
    onFilterChange({ category: selectedCategory, priceRange: price })
  }

  const handleSortChange = (e) => {
    const sort = e.target.value
    setSelectedSort(sort)
    onSortChange(sort)
  }

  return (
    <div>
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
            <select
              className="appearance-none bg-white border border-gray-300 rounded-md py-1 pl-3 pr-8 text-sm focus:outline-none focus:ring-[#8b4513] focus:border-[#8b4513]"
              value={selectedSort}
              onChange={handleSortChange}
            >
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rating</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>

      {filterOpen && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-medium text-[#3e3e3e] mb-3">Categories</h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="category"
                  value=""
                  checked={selectedCategory === ""}
                  onChange={handleCategoryChange}
                  className="rounded text-[#8b4513] focus:ring-[#8b4513]"
                />
                <span className="ml-2 text-sm">All Categories</span>
              </label>

              {categories.map((category) => (
                <label key={category} className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    value={category}
                    checked={selectedCategory === category}
                    onChange={handleCategoryChange}
                    className="rounded text-[#8b4513] focus:ring-[#8b4513]"
                  />
                  <span className="ml-2 text-sm capitalize">{category}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium text-[#3e3e3e] mb-3">Price Range</h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="price"
                  value=""
                  checked={priceRange === ""}
                  onChange={handlePriceRangeChange}
                  className="rounded text-[#8b4513] focus:ring-[#8b4513]"
                />
                <span className="ml-2 text-sm">All Prices</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="price"
                  value="under-500000"
                  checked={priceRange === "under-500000"}
                  onChange={handlePriceRangeChange}
                  className="rounded text-[#8b4513] focus:ring-[#8b4513]"
                />
                <span className="ml-2 text-sm">Under IDR 500,000</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="price"
                  value="500000-1000000"
                  checked={priceRange === "500000-1000000"}
                  onChange={handlePriceRangeChange}
                  className="rounded text-[#8b4513] focus:ring-[#8b4513]"
                />
                <span className="ml-2 text-sm">IDR 500,000 - 1,000,000</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="price"
                  value="over-1000000"
                  checked={priceRange === "over-1000000"}
                  onChange={handlePriceRangeChange}
                  className="rounded text-[#8b4513] focus:ring-[#8b4513]"
                />
                <span className="ml-2 text-sm">Over IDR 1,000,000</span>
              </label>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-[#3e3e3e] mb-3">Rating</h3>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <label key={rating} className="flex items-center">
                  <input type="checkbox" className="rounded text-[#8b4513] focus:ring-[#8b4513]" />
                  <span className="ml-2 text-sm flex items-center">
                    {Array(5)
                      .fill(0)
                      .map((_, index) => (
                        <svg
                          key={index}
                          className={`w-4 h-4 ${index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    <span className="ml-1">& Up</span>
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductFilter
