import { User, Truck, CreditCard } from "lucide-react"

const CheckoutProgress = ({ currentStep }) => {
  return (
    <div className="flex items-center justify-between mb-12">
      <div className="flex flex-col items-center">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center ${
            currentStep >= 1 ? "bg-[#8b4513]/20 text-[#8b4513]" : "bg-gray-200 text-gray-500"
          }`}
        >
          {currentStep > 1 ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <User className="w-6 h-6" />
          )}
        </div>
        <div className="mt-2">
          <p className="text-xs text-gray-500">Step 1</p>
          <p className={`text-sm font-medium ${currentStep === 1 ? "text-[#8b4513]" : "text-[#3e3e3e]"}`}>
            PERSONAL INFO
          </p>
        </div>
      </div>

      <div className="flex-1 h-px bg-gray-300 mx-4"></div>

      <div className="flex flex-col items-center">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center ${
            currentStep >= 2 ? "bg-[#8b4513]/20 text-[#8b4513]" : "bg-gray-200 text-gray-500"
          }`}
        >
          {currentStep > 2 ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <Truck className="w-6 h-6" />
          )}
        </div>
        <div className="mt-2">
          <p className="text-xs text-gray-500">Step 2</p>
          <p className={`text-sm font-medium ${currentStep === 2 ? "text-[#8b4513]" : "text-[#3e3e3e]"}`}>
            SHIPPING DELIVERY
          </p>
        </div>
      </div>

      <div className="flex-1 h-px bg-gray-300 mx-4"></div>

      <div className="flex flex-col items-center">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center ${
            currentStep >= 3 ? "bg-[#8b4513]/20 text-[#8b4513]" : "bg-gray-200 text-gray-500"
          }`}
        >
          <CreditCard className="w-6 h-6" />
        </div>
        <div className="mt-2">
          <p className="text-xs text-gray-500">Step 3</p>
          <p className={`text-sm font-medium ${currentStep === 3 ? "text-[#8b4513]" : "text-[#3e3e3e]"}`}>
            CONFIRMATION
          </p>
        </div>
      </div>
    </div>
  )
}

export default CheckoutProgress
