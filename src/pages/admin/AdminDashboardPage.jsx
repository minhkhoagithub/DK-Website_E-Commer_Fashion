"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Users, ShoppingBag, DollarSign, TrendingUp, ArrowRight } from "lucide-react"
import { fetchAllOrders } from "../../services/api"

const AdminDashboardPage = () => {
  const [orders, setOrders] = useState([])
  const [recentActivity, setRecentActivity] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState([
    {
      icon: Users,
      label: "Total Users",
      value: "1,234",
      change: "+12%",
      changeType: "positive",
    },
    {
      icon: ShoppingBag,
      label: "Total Orders",
      value: "0",
      change: "+0%",
      changeType: "positive",
    },
    {
      icon: DollarSign,
      label: "Revenue",
      value: "IDR 0",
      change: "+0%",
      changeType: "positive",
    },
    {
      icon: TrendingUp,
      label: "Conversion Rate",
      value: "3.2%",
      change: "-0.5%",
      changeType: "negative",
    },
  ])

  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = async () => {
    try {
      setLoading(true)
      const data = await fetchAllOrders()
      setOrders(data)

      // Update stats based on real order data
      updateStats(data)

      // Set recent activity
      const sortedOrders = [...data].sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
      setRecentActivity(sortedOrders.slice(0, 5))
    } catch (err) {
      console.error("Error loading orders:", err)
    } finally {
      setLoading(false)
    }
  }

  const updateStats = (orderData) => {
    // Calculate total revenue
    const totalRevenue = orderData.reduce((sum, order) => sum + order.totalAmount, 0)

    // Calculate monthly change (simplified - in a real app you'd compare with previous month)
    const lastMonthRevenue = totalRevenue * 0.85 // Simulated previous month revenue
    const revenueChange = ((totalRevenue - lastMonthRevenue) / lastMonthRevenue) * 100

    // Update stats
    setStats((prevStats) =>
      prevStats.map((stat) => {
        if (stat.label === "Total Orders") {
          return {
            ...stat,
            value: orderData.length.toString(),
            change: "+5%", // Simulated change
          }
        } else if (stat.label === "Revenue") {
          return {
            ...stat,
            value: `IDR ${totalRevenue.toLocaleString("id-ID")}`,
            change: `+${revenueChange.toFixed(1)}%`,
            changeType: revenueChange >= 0 ? "positive" : "negative",
          }
        }
        return stat
      }),
    )
  }

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  // Format price
  const formatPrice = (price) => {
    return `IDR ${price.toLocaleString("id-ID")}`
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif text-[#3e3e3e]">Admin Dashboard</h1>
          <div className="flex gap-3">
            <Link
              to="/admin/products"
              className="inline-block px-4 py-2 bg-[#8b4513] text-white rounded-md hover:bg-[#a05a2c] transition-colors"
            >
              Manage Products
            </Link>
            <Link
              to="/admin/orders"
              className="inline-block px-4 py-2 bg-[#8b4513] text-white rounded-md hover:bg-[#a05a2c] transition-colors"
            >
              View Orders
            </Link>
          </div>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
          <p className="text-yellow-700">
            <span className="font-bold">Admin Only:</span> This page is only accessible to administrators.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full bg-[#8b4513]/10 text-[#8b4513] mr-4">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-[#3e3e3e]">{stat.value}</p>
                </div>
              </div>
              <div className={`text-sm ${stat.changeType === "positive" ? "text-green-600" : "text-red-600"}`}>
                {stat.change} from last month
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-serif text-[#3e3e3e]">Recent Activity</h2>
              <Link to="/admin/orders" className="text-[#8b4513] text-sm hover:underline flex items-center">
                View All Activity <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>

            {loading ? (
              <div className="animate-pulse space-y-4">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div key={item} className="border-b pb-3">
                    <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {recentActivity.length > 0 ? (
                  recentActivity.map((order) => (
                    <div key={order.id} className="border-b pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-[#3e3e3e]">
                            {order.user ? `Order by ${order.user.name}` : "Order by Guest"}
                          </p>
                          <p className="text-sm text-gray-600">
                            {order.orderNumber} - {formatPrice(order.totalAmount)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500">{formatDate(order.orderDate)}</p>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              order.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : order.status === "processing"
                                  ? "bg-blue-100 text-blue-800"
                                  : order.status === "shipped"
                                    ? "bg-purple-100 text-purple-800"
                                    : order.status === "delivered"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-red-100 text-red-800"
                            }`}
                          >
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-gray-500">No recent activity found.</div>
                )}
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-serif text-[#3e3e3e] mb-4">Top Selling Products</h2>
            <div className="space-y-4">
              {[
                { name: "Brown Leather Jacket", sales: 124, revenue: "IDR 148.8M" },
                { name: "Elegant Black Dress", sales: 98, revenue: "IDR 83.3M" },
                { name: "Classic White Shirt", sales: 87, revenue: "IDR 43.5M" },
                { name: "Denim Jeans", sales: 76, revenue: "IDR 38M" },
                { name: "Summer Floral Dress", sales: 65, revenue: "IDR 32.5M" },
              ].map((product, index) => (
                <div key={index} className="border-b pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-[#3e3e3e]">{product.name}</p>
                      <p className="text-sm text-gray-600">{product.sales} units sold</p>
                    </div>
                    <p className="text-sm font-medium text-[#3e3e3e]">{product.revenue}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Link
                to="/admin/products"
                className="text-[#8b4513] text-sm hover:underline flex items-center justify-center"
              >
                Manage Products <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Monthly Revenue Chart */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-serif text-[#3e3e3e] mb-4">Monthly Revenue</h2>
          <div className="h-64 flex items-end justify-between px-2">
            {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((month, i) => {
              // Generate random height for the bar (in a real app, this would be actual data)
              const height = 30 + Math.random() * 70
              const value = Math.floor(Math.random() * 100) + 50

              return (
                <div key={month} className="flex flex-col items-center">
                  <div
                    className="w-8 bg-[#8b4513] rounded-t-sm hover:bg-[#a05a2c] transition-all cursor-pointer relative group"
                    style={{ height: `${height}%` }}
                  >
                    <div className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      IDR {value}M
                    </div>
                  </div>
                  <div className="text-xs mt-1 text-gray-600">{month}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboardPage
