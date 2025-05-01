import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react"
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="bg-[#8B4513] text-white">
      <div className="container mx-auto py-12 px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-serif mb-4">MODEVA</h3>
            <p className="text-gray-300 mb-4">
              Premium fashion brand dedicated to bringing you the finest quality clothing and accessories.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-[#8b4513]">
                <Facebook />
              </a>
              <a href="#" className="hover:text-[#8b4513]">
                <Instagram />
              </a>
              <a href="#" className="hover:text-[#8b4513]">
                <Twitter />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-4">Shop</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/catalog" className="text-gray-300 hover:text-white">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/new-arrival" className="text-gray-300 hover:text-white">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/sale" className="text-gray-300 hover:text-white">
                  Sale
                </Link>
              </li>
              <li>
                <Link to="/catalog" className="text-gray-300 hover:text-white">
                  Collections
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-2 flex-shrink-0 text-[#8b4513]" />
                <span className="text-gray-300">123 Fashion Street, Jakarta, Indonesia</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-2 flex-shrink-0 text-[#8b4513]" />
                <span className="text-gray-300">+62 123 456 7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-2 flex-shrink-0 text-[#8b4513]" />
                <span className="text-gray-300">info@modeva.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} MODEVA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer