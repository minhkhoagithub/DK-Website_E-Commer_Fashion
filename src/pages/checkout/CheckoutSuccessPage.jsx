import { Link } from "react-router-dom"
import { Check } from "lucide-react"

const CheckoutSuccessPage = () => {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <Link to="/" className="inline-block mb-12">
        <h1 className="text-4xl font-serif text-[#8b4513]">MODEVA</h1>
      </Link>

      <div className="text-center">
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
          <Check className="w-10 h-10 text-white" />
        </div>

        <h2 className="text-5xl font-serif text-[#3e3e3e] mb-6">PAYMENT SUCCESS!</h2>

        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Lean back and relax, knowing our team is hard at work preparing and shipping your package swiftly. Feel free
          to browse our diverse product selection during this time – you might discover another item you'd like to add
          to your collection!
        </p>

        <Link
          to="/"
          className="inline-block px-8 py-4 bg-[#8b4513] text-white font-medium rounded hover:bg-[#a05a2c] transition-colors"
        >
          BACK TO HOME
        </Link>
      </div>
    </div>
  )
}

export default CheckoutSuccessPage
