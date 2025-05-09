"use client"

import { useState, useEffect } from "react"
import { updateProduct } from "../../services/api"

const EditProductForm = ({ product, onProductUpdated, onCancel }) => {
  const [formData, setFormData] = useState({
    id: product.id,
    name: product.name,
    category: product.category,
    description: product.description,
    price: product.price.toString(),
    originalPrice: product.originalPrice ? product.originalPrice.toString() : "",
    discount: product.discount ? product.discount.toString() : "0",
    imageUrl: product.images[0] || "",
    sizes: product.sizes || ["S", "M", "L"],
    inStock: product.inStock !== false,
    status: product.status || "active",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [validationErrors, setValidationErrors] = useState({})
  const [touched, setTouched] = useState({})

  useEffect(() => {
    // Update form data if product changes
    setFormData({
      id: product.id,
      name: product.name,
      category: product.category,
      description: product.description,
      price: product.price.toString(),
      originalPrice: product.originalPrice ? product.originalPrice.toString() : "",
      discount: product.discount ? product.discount.toString() : "0",
      imageUrl: product.images[0] || "",
      sizes: product.sizes || ["S", "M", "L"],
      inStock: product.inStock !== false,
      status: product.status || "active",
    })
    // Reset validation state
    setValidationErrors({})
    setTouched({})
  }, [product])

  const validateField = (name, value) => {
    let error = null

    switch (name) {
      case "name":
        if (!value) error = "Product name is required"
        else if (value.length < 3) error = "Product name must be at least 3 characters"
        break
      case "category":
        if (!value) error = "Category is required"
        break
      case "description":
        if (!value) error = "Description is required"
        else if (value.length < 10) error = "Description must be at least 10 characters"
        break
      case "price":
        if (!value) error = "Price is required"
        else if (isNaN(value) || Number.parseFloat(value) <= 0) error = "Price must be a positive number"
        break
      case "originalPrice":
        if (value && (isNaN(value) || Number.parseFloat(value) <= 0)) error = "Original price must be a positive number"
        break
      case "discount":
        if (value && (isNaN(value) || Number.parseInt(value) < 0 || Number.parseInt(value) > 100))
          error = "Discount must be between 0 and 100"
        break
      case "imageUrl":
        if (!value) error = "Image URL is required"
        else if (!/^https?:\/\/.+\..+/.test(value)) error = "Please enter a valid URL"
        break
      case "sizes":
        if (!value || value.length === 0) error = "At least one size must be selected"
        break
      default:
        break
    }

    return error
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched({ ...touched, [name]: true })

    const value = formData[name]
    const error = validateField(name, value)
    setValidationErrors({ ...validationErrors, [name]: error })
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    let newValue
    if (type === "checkbox") {
      newValue = checked
    } else if (name === "sizes") {
      // Handle multi-select for sizes
      newValue = Array.from(e.target.selectedOptions, (option) => option.value)
    } else {
      newValue = value
    }

    setFormData({ ...formData, [name]: newValue })

    // Validate field if it's been touched
    if (touched[name]) {
      const error = validateField(name, newValue)
      setValidationErrors({ ...validationErrors, [name]: error })
    }
  }

  const validateForm = () => {
    const errors = {}
    const fields = ["name", "category", "description", "price", "imageUrl", "sizes"]

    // Validate required fields
    fields.forEach((field) => {
      const error = validateField(field, formData[field])
      if (error) errors[field] = error
    })

    // Validate optional fields if they have values
    if (formData.originalPrice) {
      const error = validateField("originalPrice", formData.originalPrice)
      if (error) errors.originalPrice = error
    }

    if (formData.discount) {
      const error = validateField("discount", formData.discount)
      if (error) errors.discount = error
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Mark all fields as touched
    const allTouched = {}
    Object.keys(formData).forEach((key) => {
      allTouched[key] = true
    })
    setTouched(allTouched)

    // Validate all fields
    if (!validateForm()) {
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Convert string values to appropriate types
      const productData = {
        ...formData,
        price: Number.parseFloat(formData.price),
        originalPrice: formData.originalPrice
          ? Number.parseFloat(formData.originalPrice)
          : Number.parseFloat(formData.price) * 1.5,
        discount: Number.parseInt(formData.discount, 10),
        images: [formData.imageUrl],
      }

      const updatedProduct = await updateProduct(productData)
      onProductUpdated(updatedProduct)
    } catch (err) {
      console.error("Error updating product:", err)
      setError(err.message || "Failed to update product. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-6">
      {error && (
        <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-3 py-2 border ${
              validationErrors.name && touched.name ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-[#8b4513] focus:border-[#8b4513]`}
          />
          {validationErrors.name && touched.name && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-3 py-2 border ${
              validationErrors.category && touched.category ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-[#8b4513] focus:border-[#8b4513]`}
          >
            <option value="">Select Category</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
            <option value="jewelery">Jewelery</option>
            <option value="electronics">Electronics</option>
          </select>
          {validationErrors.category && touched.category && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.category}</p>
          )}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          onBlur={handleBlur}
          rows={4}
          className={`w-full px-3 py-2 border ${
            validationErrors.description && touched.description ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:ring-[#8b4513] focus:border-[#8b4513]`}
        ></textarea>
        {validationErrors.description && touched.description && (
          <p className="mt-1 text-sm text-red-600">{validationErrors.description}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price (USD) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            onBlur={handleBlur}
            min="0"
            step="0.01"
            className={`w-full px-3 py-2 border ${
              validationErrors.price && touched.price ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-[#8b4513] focus:border-[#8b4513]`}
          />
          {validationErrors.price && touched.price ? (
            <p className="mt-1 text-sm text-red-600">{validationErrors.price}</p>
          ) : (
            <p className="text-xs text-gray-500 mt-1">Will be converted to IDR (1 USD ≈ 15,000 IDR)</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Original Price (USD)</label>
          <input
            type="number"
            name="originalPrice"
            value={formData.originalPrice}
            onChange={handleChange}
            onBlur={handleBlur}
            min="0"
            step="0.01"
            className={`w-full px-3 py-2 border ${
              validationErrors.originalPrice && touched.originalPrice ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-[#8b4513] focus:border-[#8b4513]`}
          />
          {validationErrors.originalPrice && touched.originalPrice ? (
            <p className="mt-1 text-sm text-red-600">{validationErrors.originalPrice}</p>
          ) : (
            <p className="text-xs text-gray-500 mt-1">Leave empty to auto-calculate (1.5x price)</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label>
          <input
            type="number"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
            onBlur={handleBlur}
            min="0"
            max="100"
            className={`w-full px-3 py-2 border ${
              validationErrors.discount && touched.discount ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-[#8b4513] focus:border-[#8b4513]`}
          />
          {validationErrors.discount && touched.discount && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.discount}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image URL <span className="text-red-500">*</span>
          </label>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-3 py-2 border ${
              validationErrors.imageUrl && touched.imageUrl ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-[#8b4513] focus:border-[#8b4513]`}
            placeholder="https://example.com/image.jpg"
          />
          {validationErrors.imageUrl && touched.imageUrl && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.imageUrl}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Available Sizes <span className="text-red-500">*</span>
          </label>
          <select
            name="sizes"
            multiple
            value={formData.sizes}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-3 py-2 border ${
              validationErrors.sizes && touched.sizes ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-[#8b4513] focus:border-[#8b4513]`}
          >
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </select>
          {validationErrors.sizes && touched.sizes ? (
            <p className="mt-1 text-sm text-red-600">{validationErrors.sizes}</p>
          ) : (
            <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple sizes</p>
          )}
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center">
          <input
            type="checkbox"
            name="inStock"
            checked={formData.inStock}
            onChange={handleChange}
            className="h-4 w-4 text-[#8b4513] focus:ring-[#8b4513] border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-700">In Stock</label>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-[#8b4513] text-white rounded-md hover:bg-[#a05a2c] disabled:bg-gray-400"
        >
          {loading ? "Updating..." : "Update Product"}
        </button>
      </div>
    </form>
  )
}

export default EditProductForm
