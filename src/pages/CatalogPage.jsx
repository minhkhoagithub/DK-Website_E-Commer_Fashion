"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { fetchProducts, fetchProductsByCategory } from "../services/api"
import ProductFilter from "../components/ProductFilter"
import ProductGrid from "../components/ProductGrid"

const CatalogPage = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const categoryParam = searchParams.get("category")

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true)
        let data

        if (categoryParam) {
          data = await fetchProductsByCategory(categoryParam)
        } else {
          data = await fetchProducts()
        }

        setProducts(data)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    getProducts()
  }, [categoryParam])

  const handleFilterChange = ({ category, priceRange }) => {
    let filteredProducts = []
    const fetchData = async () => {
      try {
        setLoading(true)

        // Fetch based on category if it changes
        if (category !== categoryParam) {
          if (category) {
            const data = await fetchProductsByCategory(category)
            filteredProducts = data
          } else {
            const data = await fetchProducts()
            filteredProducts = data
          }

          // Update URL search params
          if (category) {
            searchParams.set("category", category)
          } else {
            searchParams.delete("category")
          }
          setSearchParams(searchParams)
        } else {
          filteredProducts = [...products]
        }

        // Apply price range filter if specified
        if (priceRange) {
          switch (priceRange) {
            case "under-500000":
              filteredProducts = filteredProducts.filter((product) => product.price * 15000 < 500000)
              break
            case "500000-1000000":
              filteredProducts = filteredProducts.filter(
                (product) => product.price * 15000 >= 500000 && product.price * 15000 <= 1000000,
              )
              break
            case "over-1000000":
              filteredProducts = filteredProducts.filter((product) => product.price * 15000 > 1000000)
              break
            default:
              break
          }
        }

        setProducts(filteredProducts)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }

  const handleSortChange = (sortType) => {
    const sortedProducts = [...products]

    switch (sortType) {
      case "price-low":
        sortedProducts.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        sortedProducts.sort((a, b) => b.price - a.price)
        break
      case "rating":
        sortedProducts.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
      default:
        // For demo purposes, we'll just reverse the list to simulate "newest"
        sortedProducts.reverse()
        break
    }

    setProducts(sortedProducts)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif text-[#3e3e3e] mb-4">
            {categoryParam ? `${categoryParam.toUpperCase()} COLLECTION` : "OUR COLLECTION"}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our carefully curated collection of premium fashion items, designed with quality and style in mind.
          </p>
        </div>

        <ProductFilter onFilterChange={handleFilterChange} onSortChange={handleSortChange} />
        <ProductGrid products={products} loading={loading} error={error} />

        {!loading && !error && products.length > 0 && (
          <div className="mt-12 flex justify-center">
            <button className="px-6 py-3 border-2 border-[#8b4513] text-[#8b4513] rounded-md font-medium hover:bg-[#8b4513] hover:text-white transition-colors">
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default CatalogPage
