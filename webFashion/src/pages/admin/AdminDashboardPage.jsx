import { Link } from "react-router-dom"
import { Users, ShoppingBag, DollarSign, TrendingUp } from "lucide-react"
import { useEffect, useState } from "react"

const AdminDashboardPage = () => {
  const [statsData, setStatsData] = useState([])
  const [recentOrders, setRecentOrders] = useState([]) 

  useEffect(() => {

    fetch("https://68178ad726a599ae7c3ab478.mockapi.io/api/v1/data/Dashboard")
      .then((res) => res.json())
      .then((data) => setStatsData(data))
      .catch((err) => console.error("Lỗi khi fetch API:", err))


    
  }, [])

  useEffect(() => {fetch("https://68178ad726a599ae7c3ab478.mockapi.io/api/v1/data/data1")
    .then((res) => res.json())
    .then((data) => {
      setStatsData(data)
      if (data.length > 0) {
        setRecentOrders(data.slice(0, 5)) 
      }
    })
    .catch((err) => console.error("Lỗi khi fetch API:", err));
  }, [])

  const latest = statsData.length > 0 ? statsData[statsData.length - 1] : null

  const stats = latest ? [
    {
      icon: Users,
      label: "Total Users",
      value: latest.totalUser,
      change: latest.change,
      changeType: latest.changeType
    },
    {
      icon: ShoppingBag,
      label: "Total Orders",
      value: latest.totalOrders,
      change: latest.change,
      changeType: latest.changeType
    },
    {
      icon: DollarSign,
      label: "Revenue",
      value: `IDR ${parseFloat(latest.revenue).toLocaleString("id-ID")}`,
      change: latest.change,
      changeType: latest.changeType
    },
    {
      icon: TrendingUp,
      label: "Conversion Rate",
      value: `${latest.conversionRate}%`,
      change: latest.change,
      changeType: latest.changeType
    },
  ] : []

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif text-[#3e3e3e]">Admin Dashboard</h1>
          <div>
            <Link
              to="/admin/products"
              className="inline-block px-4 py-2 bg-[#8b4513] text-white rounded-md hover:bg-[#a05a2c] transition-colors"
            >
              Manage Products
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
            <h2 className="text-xl font-serif text-[#3e3e3e] mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {recentOrders.map((order, index) => (
                <div key={index} className="border-b pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-[#3e3e3e]">New order placed</p>
                      <p className="text-sm text-gray-600">Order ID: {order.orderId}</p>
                    </div>
                    <p className="text-xs text-gray-500">{order.timeAgo}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <button className="text-[#8b4513] text-sm hover:underline">View All Activity</button>
            </div>
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
              <Link to="/admin/products" className="text-[#8b4513] text-sm hover:underline">
                Manage Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboardPage
