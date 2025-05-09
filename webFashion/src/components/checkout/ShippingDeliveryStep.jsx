"use client"

import { useState } from "react"

const ShippingDeliveryStep = ({ formData, onChange }) => {
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  // Validate form fields
  const validateField = (name, value) => {
    let error = null

    switch (name) {
      case "shippingMethod":
        if (!value) error = "Shipping method is required"
        break
      case "paymentMethod":
        if (!value) error = "Payment method is required"
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

  return (
    <div>
      <div className="mb-10">
        <h3 className="text-2xl font-medium text-[#3e3e3e] mb-6">SHIPPING METHOD</h3>

        <div className="space-y-4">
          <div
            className={`border ${errors.shippingMethod && touched.shippingMethod ? "border-red-500" : "border-gray-300"} rounded-md p-4 cursor-pointer ${
              formData.shippingMethod === "jne" ? "border-[#8b4513] bg-[#f9f5f2]" : ""
            }`}
            onClick={() => handleChange("shippingMethod", "jne")}
          >
            <div className="flex items-center">
              <input
                type="radio"
                name="shippingMethod"
                value="jne"
                checked={formData.shippingMethod === "jne"}
                onChange={() => handleChange("shippingMethod", "jne")}
                onBlur={handleBlur}
                className="h-4 w-4 text-[#8b4513] focus:ring-[#8b4513] border-gray-300"
              />
              <div className="ml-3 flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img src="/jne-logo.png" alt="JNE" className="h-8 w-auto mr-3" />
                    <div>
                      <p className="font-medium text-[#3e3e3e]">JNE Regular</p>
                      <p className="text-sm text-gray-500">Estimated 2-3 days</p>
                    </div>
                  </div>
                  <p className="font-medium text-[#3e3e3e]">$5.00</p>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`border ${errors.shippingMethod && touched.shippingMethod ? "border-red-500" : "border-gray-300"} rounded-md p-4 cursor-pointer ${
              formData.shippingMethod === "tiki" ? "border-[#8b4513] bg-[#f9f5f2]" : ""
            }`}
            onClick={() => handleChange("shippingMethod", "tiki")}
          >
            <div className="flex items-center">
              <input
                type="radio"
                name="shippingMethod"
                value="tiki"
                checked={formData.shippingMethod === "tiki"}
                onChange={() => handleChange("shippingMethod", "tiki")}
                onBlur={handleBlur}
                className="h-4 w-4 text-[#8b4513] focus:ring-[#8b4513] border-gray-300"
              />
              <div className="ml-3 flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img src="/tiki-logo.png" alt="TIKI" className="h-8 w-auto mr-3" />
                    <div>
                      <p className="font-medium text-[#3e3e3e]">TIKI Express</p>
                      <p className="text-sm text-gray-500">Estimated 1-2 days</p>
                    </div>
                  </div>
                  <p className="font-medium text-[#3e3e3e]">$8.50</p>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`border ${errors.shippingMethod && touched.shippingMethod ? "border-red-500" : "border-gray-300"} rounded-md p-4 cursor-pointer ${
              formData.shippingMethod === "dhl" ? "border-[#8b4513] bg-[#f9f5f2]" : ""
            }`}
            onClick={() => handleChange("shippingMethod", "dhl")}
          >
            <div className="flex items-center">
              <input
                type="radio"
                name="shippingMethod"
                value="dhl"
                checked={formData.shippingMethod === "dhl"}
                onChange={() => handleChange("shippingMethod", "dhl")}
                onBlur={handleBlur}
                className="h-4 w-4 text-[#8b4513] focus:ring-[#8b4513] border-gray-300"
              />
              <div className="ml-3 flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img src="/dhl-logo.png" alt="DHL" className="h-8 w-auto mr-3" />
                    <div>
                      <p className="font-medium text-[#3e3e3e]">DHL International</p>
                      <p className="text-sm text-gray-500">Estimated 1 day</p>
                    </div>
                  </div>
                  <p className="font-medium text-[#3e3e3e]">$12.00</p>
                </div>
              </div>
            </div>
          </div>

          {errors.shippingMethod && touched.shippingMethod && (
            <p className="mt-1 text-sm text-red-500">{errors.shippingMethod}</p>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-medium text-[#3e3e3e] mb-6">PAYMENT METHOD</h3>

        <div className="space-y-4">
          <div
            className={`border ${errors.paymentMethod && touched.paymentMethod ? "border-red-500" : "border-gray-300"} rounded-md p-4 cursor-pointer ${
              formData.paymentMethod === "credit_card" ? "border-[#8b4513] bg-[#f9f5f2]" : ""
            }`}
            onClick={() => handleChange("paymentMethod", "credit_card")}
          >
            <div className="flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="credit_card"
                checked={formData.paymentMethod === "credit_card"}
                onChange={() => handleChange("paymentMethod", "credit_card")}
                onBlur={handleBlur}
                className="h-4 w-4 text-[#8b4513] focus:ring-[#8b4513] border-gray-300"
              />
              <div className="ml-3">
                <p className="font-medium text-[#3e3e3e]">Credit Card</p>
                <p className="text-sm text-gray-500">Visa, Mastercard, American Express</p>
              </div>
            </div>
          </div>

          <div
            className={`border ${errors.paymentMethod && touched.paymentMethod ? "border-red-500" : "border-gray-300"} rounded-md p-4 cursor-pointer ${
              formData.paymentMethod === "paypal" ? "border-[#8b4513] bg-[#f9f5f2]" : ""
            }`}
            onClick={() => handleChange("paymentMethod", "paypal")}
          >
            <div className="flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="paypal"
                checked={formData.paymentMethod === "paypal"}
                onChange={() => handleChange("paymentMethod", "paypal")}
                onBlur={handleBlur}
                className="h-4 w-4 text-[#8b4513] focus:ring-[#8b4513] border-gray-300"
              />
              <div className="ml-3">
                <p className="font-medium text-[#3e3e3e]">PayPal</p>
                <p className="text-sm text-gray-500">Pay with your PayPal account</p>
              </div>
            </div>
          </div>

          <div
            className={`border ${errors.paymentMethod && touched.paymentMethod ? "border-red-500" : "border-gray-300"} rounded-md p-4 cursor-pointer ${
              formData.paymentMethod === "bank_transfer" ? "border-[#8b4513] bg-[#f9f5f2]" : ""
            }`}
            onClick={() => handleChange("paymentMethod", "bank_transfer")}
          >
            <div className="flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="bank_transfer"
                checked={formData.paymentMethod === "bank_transfer"}
                onChange={() => handleChange("paymentMethod", "bank_transfer")}
                onBlur={handleBlur}
                className="h-4 w-4 text-[#8b4513] focus:ring-[#8b4513] border-gray-300"
              />
              <div className="ml-3">
                <p className="font-medium text-[#3e3e3e]">Bank Transfer</p>
                <p className="text-sm text-gray-500">Pay directly from your bank account</p>
              </div>
            </div>
          </div>

          {errors.paymentMethod && touched.paymentMethod && (
            <p className="mt-1 text-sm text-red-500">{errors.paymentMethod}</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default ShippingDeliveryStep
