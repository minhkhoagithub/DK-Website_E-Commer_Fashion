"use client"

import { useState, useEffect } from "react"
import { ChevronDown } from "lucide-react"

const PersonalInfoStep = ({ formData, onChange }) => {
  const [selectedCountryCode, setSelectedCountryCode] = useState("+62")
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  // Validate form fields
  const validateField = (name, value) => {
    let error = null

    switch (name) {
      case "name":
        if (!value) error = "Name is required"
        else if (value.length < 2) error = "Name must be at least 2 characters"
        break
      case "phone":
        if (!value) error = "Phone number is required"
        else if (!/^\d{3,}$/.test(value.replace(/[- ]/g, ""))) error = "Please enter a valid phone number"
        break
      case "email":
        if (!value) error = "Email is required"
        else if (!/\S+@\S+\.\S+/.test(value)) error = "Please enter a valid email address"
        break
      case "address":
        if (!value) error = "Address is required"
        else if (value.length < 5) error = "Please enter a complete address"
        break
      case "country":
        if (!value) error = "Country is required"
        break
      case "state":
        if (!value) error = "State/Province is required"
        break
      case "zipCode":
        if (!value) error = "ZIP code is required"
        break
      default:
        break
    }

    return error
  }

  // Handle field blur
  const handleBlur = (e) => {
    const { name, value } = e.target
    setTouched({ ...touched, [name]: true })

    const error = validateField(name, value)
    setErrors({ ...errors, [name]: error })
  }

  // Handle field change
  const handleChange = (name, value) => {
    onChange(name, value)

    if (touched[name]) {
      const error = validateField(name, value)
      setErrors({ ...errors, [name]: error })
    }
  }

  // Validate all fields on form submission
  useEffect(() => {
    const validateAllFields = () => {
      const newErrors = {}
      const fields = ["name", "phone", "email", "address", "country", "state", "zipCode"]

      fields.forEach((field) => {
        const error = validateField(field, formData[field])
        if (error) newErrors[field] = error
      })

      setErrors(newErrors)
      return Object.keys(newErrors).length === 0
    }

    // Make this function available to parent component
    if (onChange) {
      onChange("validate", validateAllFields)
    }
  }, [formData, onChange])

  return (
    <div>
      <div className="mb-10">
        <h3 className="text-2xl font-medium text-[#3e3e3e] mb-6">CONTACT PERSON</h3>

        <div className="mb-6">
          <label htmlFor="name" className="block text-[#3e3e3e] font-medium mb-2">
            NAME <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Eg: John Doe"
            className={`w-full border ${errors.name ? "border-red-500" : "border-gray-300"} rounded p-3 focus:outline-none focus:ring-1 focus:ring-[#8b4513]`}
            value={formData.name || ""}
            onChange={(e) => handleChange("name", e.target.value)}
            onBlur={handleBlur}
          />
          {errors.name && touched.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
        </div>

        <div className="mb-6">
          <label htmlFor="phone" className="block text-[#3e3e3e] font-medium mb-2">
            PHONE NUMBER <span className="text-red-500">*</span>
          </label>
          <div className="flex">
            <div className="relative">
              <select
                className="appearance-none border border-gray-300 rounded-l p-3 pr-8 bg-white focus:outline-none focus:ring-1 focus:ring-[#8b4513]"
                value={selectedCountryCode}
                onChange={(e) => setSelectedCountryCode(e.target.value)}
              >
                <option value="+62">🇮🇩 (+62)</option>
                <option value="+1">🇺🇸 (+1)</option>
                <option value="+44">🇬🇧 (+44)</option>
                <option value="+65">🇸🇬 (+65)</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
            </div>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="111-2222-33333"
              className={`flex-1 border ${errors.phone ? "border-red-500" : "border-gray-300"} border-l-0 rounded-r p-3 focus:outline-none focus:ring-1 focus:ring-[#8b4513]`}
              value={formData.phone || ""}
              onChange={(e) => handleChange("phone", e.target.value)}
              onBlur={handleBlur}
            />
          </div>
          {errors.phone && touched.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
        </div>

        <div className="mb-6">
          <label htmlFor="email" className="block text-[#3e3e3e] font-medium mb-2">
            EMAIL <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Eg: example@example.com"
            className={`w-full border ${errors.email ? "border-red-500" : "border-gray-300"} rounded p-3 focus:outline-none focus:ring-1 focus:ring-[#8b4513]`}
            value={formData.email || ""}
            onChange={(e) => handleChange("email", e.target.value)}
            onBlur={handleBlur}
          />
          {errors.email && touched.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-medium text-[#3e3e3e] mb-6">ADDRESS DETAIL</h3>

        <div className="mb-6">
          <label htmlFor="address" className="block text-[#3e3e3e] font-medium mb-2">
            ADDRESS <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="Eg: ABC Street 12A, West Java, Indonesia"
            className={`w-full border ${errors.address ? "border-red-500" : "border-gray-300"} rounded p-3 focus:outline-none focus:ring-1 focus:ring-[#8b4513]`}
            value={formData.address || ""}
            onChange={(e) => handleChange("address", e.target.value)}
            onBlur={handleBlur}
          />
          {errors.address && touched.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
        </div>

        <div className="mb-6">
          <label htmlFor="country" className="block text-[#3e3e3e] font-medium mb-2">
            COUNTRY <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              id="country"
              name="country"
              className={`appearance-none w-full border ${errors.country ? "border-red-500" : "border-gray-300"} rounded p-3 pr-8 bg-white focus:outline-none focus:ring-1 focus:ring-[#8b4513]`}
              value={formData.country || ""}
              onChange={(e) => handleChange("country", e.target.value)}
              onBlur={handleBlur}
            >
              <option value="">--Choose Country--</option>
              <option value="indonesia">Indonesia</option>
              <option value="singapore">Singapore</option>
              <option value="malaysia">Malaysia</option>
              <option value="thailand">Thailand</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
            {errors.country && touched.country && <p className="mt-1 text-sm text-red-500">{errors.country}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="state" className="block text-[#3e3e3e] font-medium mb-2">
              STATE/PROVINCE <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                id="state"
                name="state"
                className={`appearance-none w-full border ${errors.state ? "border-red-500" : "border-gray-300"} rounded p-3 pr-8 bg-white focus:outline-none focus:ring-1 focus:ring-[#8b4513]`}
                value={formData.state || ""}
                onChange={(e) => handleChange("state", e.target.value)}
                onBlur={handleBlur}
              >
                <option value="">--Choose Province--</option>
                <option value="west-java">West Java</option>
                <option value="east-java">East Java</option>
                <option value="central-java">Central Java</option>
                <option value="jakarta">Jakarta</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              {errors.state && touched.state && <p className="mt-1 text-sm text-red-500">{errors.state}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="zipCode" className="block text-[#3e3e3e] font-medium mb-2">
              ZIP CODE <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                id="zipCode"
                name="zipCode"
                className={`appearance-none w-full border ${errors.zipCode ? "border-red-500" : "border-gray-300"} rounded p-3 pr-8 bg-white focus:outline-none focus:ring-1 focus:ring-[#8b4513]`}
                value={formData.zipCode || ""}
                onChange={(e) => handleChange("zipCode", e.target.value)}
                onBlur={handleBlur}
              >
                <option value="">--Choose ZIP Code--</option>
                <option value="10110">10110</option>
                <option value="10120">10120</option>
                <option value="10130">10130</option>
                <option value="10140">10140</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              {errors.zipCode && touched.zipCode && <p className="mt-1 text-sm text-red-500">{errors.zipCode}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PersonalInfoStep
