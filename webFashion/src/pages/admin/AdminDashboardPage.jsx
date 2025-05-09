import { Link } from "react-router-dom"
import { Users, ShoppingBag, DollarSign, TrendingUp } from "lucide-react"

const AdminDashboardPage = () => {
  // Mock data for admin dashboard
  const stats = [
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
      value: "856",
      change: "+5%",
      changeType: "positive",
    },
    {
      icon: DollarSign,
      label: "Revenue",
      value: "IDR 125M",
      change: "+18%",
      changeType: "positive",
    },
    {
      icon: TrendingUp,
      label: "Conversion Rate",
      value: "3.2%",
      change: "-0.5%",
      changeType: "negative",
    },
  ]

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
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="border-b pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-[#3e3e3e]">New order placed</p>
                      <p className="text-sm text-gray-600">Order ID: #MOD-2023-{1000 + item}</p>
                    </div>
                    <p className="text-xs text-gray-500">{item} hour(s) ago</p>
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
