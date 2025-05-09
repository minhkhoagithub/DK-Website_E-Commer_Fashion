"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { useCart } from "../../contexts/CartContext"
import { useAuth } from "../../contexts/AuthContext"
import CheckoutProgress from "../../components/checkout/CheckoutProgress"
import PersonalInfoStep from "../../components/checkout/PersonalInfoStep"
import ShippingDeliveryStep from "../../components/checkout/ShippingDeliveryStep"
import ConfirmationStep from "../../components/checkout/ConfirmationStep"
import OrderSummary from "../../components/checkout/OrderSummary"
import { createOrder } from "../../services/api"

const CheckoutPage = () => {
  const navigate = useNavigate()
  const { cartItems, getSubtotal, clearCart } = useCart()
  const { currentUser, isAuthenticated } = useAuth()
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Form data state
  const [formData, setFormData] = useState({
    // Personal Info
    name: "",
    phone: "",
    email: "",
    address: "",
    country: "",
    state: "",
    zipCode: "",

    // Shipping & Payment
    shippingMethod: "",
    paymentMethod: "",

    // Validation function (will be set by PersonalInfoStep)
    validate: null,
  })

  // Order summary data
  const [orderSummary, setOrderSummary] = useState({
    subtotal: "IDR 0",
    voucherCode: "WELCOME10",
    voucher: "- IDR 0",
    shipping: "IDR 0",
    total: "IDR 0",
  })

  // Update order summary when cart items change
  useEffect(() => {
    if (cartItems.length === 0 && currentStep === 1) {
      navigate("/cart")
      return
    }

    const subtotal = getSubtotal()
    const discount = subtotal * 0.1 // 10% discount
    const shippingCost =
      formData.shippingMethod === "dhl" ? 180000 : formData.shippingMethod === "tiki" ? 127500 : 75000
    const total = subtotal - discount + shippingCost

    setOrderSummary({
      subtotal: `IDR ${subtotal.toLocaleString("id-ID")}`,
      voucherCode: "WELCOME10",
      voucher: `- IDR ${discount.toLocaleString("id-ID")}`,
      shipping: `IDR ${shippingCost.toLocaleString("id-ID")}`,
      total: `IDR ${total.toLocaleString("id-ID")}`,
    })
  }, [cartItems, formData.shippingMethod])

  // Pre-fill form data if user is logged in
  useEffect(() => {
    if (isAuthenticated()) {
      setFormData((prev) => ({
        ...prev,
        name: currentUser.name,
        email: currentUser.email,
      }))
    }
  }, [currentUser, isAuthenticated])

  // Handle form field changes
  const handleFormChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle next step
  const handleNextStep = () => {
    if (currentStep === 1) {
      // Validate personal info step
      if (formData.validate && !formData.validate()) {
        return
      }
    } else if (currentStep === 2) {
      // Validate shipping & payment step
      if (!formData.shippingMethod || !formData.paymentMethod) {
        setError("Please select shipping and payment methods")
        return
      }
    } else if (currentStep === 3) {
      // Submit order
      handleSubmitOrder()
      return
    }

    setCurrentStep((prev) => prev + 1)
    setError(null)
  }

  // Handle previous step
  const handlePrevStep = () => {
    setCurrentStep((prev) => prev - 1)
    setError(null)
  }

  // Handle order submission
  const handleSubmitOrder = async () => {
    try {
      setLoading(true)
      setError(null)

      const subtotal = getSubtotal()
      const discount = subtotal * 0.1 // 10% discount
      const shippingCost =
        formData.shippingMethod === "dhl" ? 180000 : formData.shippingMethod === "tiki" ? 127500 : 75000
      const total = subtotal - discount + shippingCost

      // Prepare order data
      const orderData = {
        // Customer info
        name: formData.name,
        email: formData.email,
        phone: formData.phone,

        // Shipping info
        address: formData.address,
        city: formData.state,
        zipCode: formData.zipCode,

        // Order details
        items: cartItems.map((item) => ({
          product: {
            id: item.id,
            name: item.name,
            images: item.images,
          },
          quantity: item.quantity,
          price: item.price,
          size: item.selectedSize,
        })),

        // Payment info
        shippingMethod: formData.shippingMethod,
        paymentMethod: formData.paymentMethod,

        // Totals
        subtotal: subtotal,
        shippingCost: shippingCost,
        discount: discount,
        totalAmount: total,
      }

      // Create order
      await createOrder(orderData, isAuthenticated() ? currentUser : null)

      // Clear cart and redirect to success page
      clearCart()
      navigate("/checkout/success")
    } catch (err) {
      console.error("Error creating order:", err)
      setError("Failed to create order. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Link to="/" className="inline-block mb-12">
        <h1 className="text-4xl font-serif text-[#8b4513]">MODEVA</h1>
      </Link>

      <div className="max-w-6xl mx-auto">
        <CheckoutProgress currentStep={currentStep} />

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {currentStep === 1 && <PersonalInfoStep formData={formData} onChange={handleFormChange} />}

            {currentStep === 2 && <ShippingDeliveryStep formData={formData} onChange={handleFormChange} />}

            {currentStep === 3 && <ConfirmationStep />}

            <div className="mt-8 flex justify-between">
              {currentStep > 1 ? (
                <button
                  onClick={handlePrevStep}
                  className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Back
                </button>
              ) : (
                <Link to="/cart" className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                  Back to Cart
                </Link>
              )}

              <button
                onClick={handleNextStep}
                disabled={loading}
                className="px-6 py-3 bg-[#8b4513] text-white rounded-md hover:bg-[#a05a2c] disabled:bg-gray-400"
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </span>
                ) : currentStep === 3 ? (
                  "Place Order"
                ) : (
                  "Continue"
                )}
              </button>
            </div>
          </div>

          <div>
            <OrderSummary
              cartItems={cartItems.map((item) => ({
                id: item.id,
                name: item.name,
                image: item.images[0],
                quantity: item.quantity,
                price: `IDR ${item.price.toLocaleString("id-ID")}`,
                note: item.selectedSize ? `Size: ${item.selectedSize}` : null,
              }))}
              orderSummary={orderSummary}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
