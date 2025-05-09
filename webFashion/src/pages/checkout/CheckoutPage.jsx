"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import PersonalInfoStep from "../../components/checkout/PersonalInfoStep"
import ShippingDeliveryStep from "../../components/checkout/ShippingDeliveryStep"
import ConfirmationStep from "../../components/checkout/ConfirmationStep"
import OrderSummary from "../../components/checkout/OrderSummary"
import CheckoutProgress from "../../components/checkout/CheckoutProgress"

const CheckoutPage = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    country: "",
    state: "",
    zipCode: "",
    shippingMethod: "",
  })

  // Mock cart data
  const cartItems = [
    {
      id: 1,
      name: "WHITE CASUAL T-SHIRT",
      price: "IDR 100.000",
      quantity: 1,
      image: "/tshirt.jpg",
      note: "Please recheck the size before send to me :)",
    },
    {
      id: 2,
      name: "WHITE CASUAL T-SHIRT",
      price: "IDR 100.000",
      quantity: 1,
      image: "/tshirt.jpg",
    },
  ]

  const orderSummary = {
    subtotal: "IDR 300.000",
    voucher: "IDR 50.000",
    shipping: currentStep === 1 ? "IDR -" : "IDR 39.000",
    total: currentStep === 1 ? "IDR 250.000" : "IDR 289.000",
    voucherCode: "50KDISCOUNT",
  }

  const handleFormChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  const handleContinue = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    } else {
      // Submit order and navigate to success page
      navigate("/checkout/success")
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column - Checkout Form */}
        <div className="w-full lg:w-2/3">
          <Link to="/" className="inline-block mb-6">
            <h1 className="text-4xl font-serif text-[#8b4513]">MODEVA</h1>
          </Link>

          <h2 className="text-5xl font-serif text-[#3e3e3e] mb-8">
            {currentStep === 3 ? "CONFIRMATION" : "CHECKOUT FORM"}
          </h2>

          <CheckoutProgress currentStep={currentStep} />

          {currentStep === 1 && <PersonalInfoStep formData={formData} onChange={handleFormChange} />}

          {currentStep === 2 && <ShippingDeliveryStep formData={formData} onChange={handleFormChange} />}

          {currentStep === 3 && <ConfirmationStep formData={formData} />}

          <div className="mt-8 flex justify-end">
            {currentStep > 1 && (
              <button
                onClick={handleBack}
                className="px-6 py-3 mr-4 border border-[#8b4513] text-[#8b4513] rounded hover:bg-[#8b4513]/10 transition-colors"
              >
                Back
              </button>
            )}
            <button
              onClick={handleContinue}
              className="px-6 py-3 bg-[#8b4513] text-white rounded hover:bg-[#a05a2c] transition-colors"
            >
              {currentStep === 1 && "CONTINUE TO SHIPPING"}
              {currentStep === 2 && "CONTINUE TO PAYMENT"}
              {currentStep === 3 && "I ALREADY PAY"}
            </button>
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="w-full lg:w-1/3">
          <OrderSummary cartItems={cartItems} orderSummary={orderSummary} />
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
