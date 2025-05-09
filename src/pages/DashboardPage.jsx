"use client"

import { useAuth } from "../contexts/AuthContext"
import { Link } from "react-router-dom"
import { ShoppingBag, Heart, Clock, User, Settings } from "lucide-react"

const DashboardPage = () => {
  const { currentUser, isAuthenticated } = useAuth()

  // Dashboard stats for authenticated users
  const stats = [
    {
      icon: ShoppingBag,
      label: "Orders",
      value: isAuthenticated() ? `${currentUser.orders?.length || 0}` : "0",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: Heart,
      label: "Wishlist",
      value: isAuthenticated() ? `${currentUser.wishlist?.length || 0}` : "0",
      color: "bg-red-100 text-red-600",
    },
    {
      icon: Clock,
      label: "Recently Viewed",
      value: isAuthenticated() ? `${currentUser.recentlyViewed?.length || 0}` : "0",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: Settings,
      label: "Settings",
      value: "",
      color: "bg-purple-100 text-purple-600",
      link: "/profile",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center mb-6">
            {isAuthenticated() ? (
              <>
                <div className="w-16 h-16 bg-[#8b4513] rounded-full flex items-center justify-center text-white text-2xl font-bold mr-4">
                  {currentUser.name.charAt(0)}
                </div>
                <div>
                  <h1 className="text-2xl font-serif text-[#3e3e3e]">Welcome back, {currentUser.name}</h1>
                  <p className="text-gray-600">
                    {currentUser.email} • {currentUser.role}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-2xl mr-4">
                  <User className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-2xl font-serif text-[#3e3e3e]">Welcome, Guest</h1>
                  <p className="text-gray-600">
                    <Link to="/login" className="text-[#8b4513] hover:underline">
                      Sign in
                    </Link>{" "}
                    to view your personalized dashboard
                  </p>
                </div>
              </>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 flex flex-col items-center text-center hover:shadow-md transition-shadow"
              >
                <div className={`p-3 rounded-full ${stat.color} mb-3`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <h3 className="font-medium text-[#3e3e3e]">{stat.label}</h3>
                {stat.value && <p className="text-2xl font-bold text-[#3e3e3e] mt-1">{stat.value}</p>}
                {stat.link && (
                  <Link to={stat.link} className="text-[#8b4513] text-sm mt-2 hover:underline">
                    View Details
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>

        {isAuthenticated() ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-serif text-[#3e3e3e] mb-4">Recent Orders</h2>
            {currentUser.role === "admin" && (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                <p className="text-yellow-700">
                  <span className="font-bold">Admin Access:</span> You can also view and manage all orders in the{" "}
                  <Link to="/admin" className="text-[#8b4513] hover:underline">
                    Admin Dashboard
                  </Link>
                  .
                </p>
              </div>
            )}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentUser.orders && currentUser.orders.length > 0 ? (
                    currentUser.orders.map((order, index) => (
                      <tr key={order.id || index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {order.id || `#MOD-2023-00${index + 1}`}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.date || new Date().toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              order.status === "Delivered"
                                ? "bg-green-100 text-green-800"
                                : order.status === "Shipped"
                                  ? "bg-blue-100 text-blue-800"
                                  : order.status === "Processing"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {order.status || "Processing"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.total ? `IDR ${order.total.toLocaleString()}` : "IDR 850,000"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <Link to={`/orders/${order.id || index}`} className="text-[#8b4513] hover:underline">
                            View
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                        No orders found.{" "}
                        <Link to="/catalog" className="text-[#8b4513] hover:underline">
                          Start shopping
                        </Link>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h2 className="text-xl font-serif text-[#3e3e3e] mb-4">Explore Our Collections</h2>
            <p className="text-gray-600 mb-6">Discover the latest fashion trends and find your perfect style.</p>
            <Link
              to="/catalog"
              className="inline-block px-6 py-3 bg-[#8b4513] text-white rounded-md hover:bg-[#a05a2c] transition-colors"
            >
              Browse Catalog
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default DashboardPage
