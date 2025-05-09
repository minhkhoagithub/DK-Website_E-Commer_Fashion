import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

const NotFoundPage = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-9xl font-serif text-[#8b4513]">404</h1>
        <h2 className="text-3xl font-serif text-[#3e3e3e] mt-4 mb-6">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 bg-[#8b4513] text-white rounded-md hover:bg-[#a05a2c] transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage
