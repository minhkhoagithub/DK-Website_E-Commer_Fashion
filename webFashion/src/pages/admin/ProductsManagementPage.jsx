"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Search, Plus, Edit, Trash2, ChevronLeft, ChevronRight } from "lucide-react"

const ProductsManagementPage = () => {
  // Mock product data
  const initialProducts = [
    { id: 1, name: "Brown Leather Jacket", category: "Outerwear", price: "IDR 1,200,000", stock: 25, status: "active" },
    { id: 2, name: "Elegant Black Dress", category: "Dresses", price: "IDR 850,000", stock: 18, status: "active" },
    { id: 3, name: "Classic White Shirt", category: "Tops", price: "IDR 500,000", stock: 32, status: "active" },
    { id: 4, name: "Denim Jeans", category: "Bottoms", price: "IDR 500,000", stock: 45, status: "active" },
    { id: 5, name: "Summer Floral Dress", category: "Dresses", price: "IDR 500,000", stock: 12, status: "active" },
    { id: 6, name: "Casual Sneakers", category: "Footwear", price: "IDR 750,000", stock: 20, status: "active" },
    { id: 7, name: "Leather Belt", category: "Accessories", price: "IDR 350,000", stock: 30, status: "active" },
    { id: 8, name: "Wool Coat", category: "Outerwear", price: "IDR 1,500,000", stock: 15, status: "active" },
    { id: 9, name: "Silk Scarf", category: "Accessories", price: "IDR 250,000", stock: 40, status: "inactive" },
    { id: 10, name: "Leather Handbag", category: "Accessories", price: "IDR 1,800,000", stock: 8, status: "active" },
  ]

  const [products, setProducts] = useState(initialProducts)
  const [searchTerm, setSearchTerm] = useState("")

  // Filter products based on search term
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Toggle product status
  const toggleProductStatus = (productId) => {
    setProducts(
      products.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            status: product.status === "active" ? "inactive" : "active",
          }
        }
        return product
      }),
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-serif text-[#3e3e3e]">Product Management</h1>
            <p className="text-gray-600">Manage your product catalog</p>
          </div>
          <Link to="/admin" className="text-[#8b4513] hover:underline flex items-center">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Dashboard
          </Link>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
          <p className="text-yellow-700">
            <span className="font-bold">Admin Only:</span> This page is only accessible to administrators.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b4513]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <button className="px-4 py-2 bg-[#8b4513] text-white rounded-md hover:bg-[#a05a2c] transition-colors flex items-center">
                <Plus className="w-4 h-4 mr-2" />
                Add New Product
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      <div className="text-xs text-gray-500">ID: {product.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{product.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{product.price}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{product.stock}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          product.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => toggleProductStatus(product.id)}
                          className={`${
                            product.status === "active"
                              ? "text-red-600 hover:text-red-900"
                              : "text-green-600 hover:text-green-900"
                          }`}
                        >
                          {product.status === "active" ? <Trash2 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{" "}
              <span className="font-medium">{products.length}</span> products
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border rounded text-sm font-medium text-gray-700 hover:bg-gray-50">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="px-3 py-1 border rounded text-sm font-medium text-gray-700 hover:bg-gray-50">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductsManagementPage
