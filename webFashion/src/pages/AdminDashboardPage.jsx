const AdminDashboardPage = () => {
  // Mock data for admin dashboard
  const stats = [
    { label: "Total Users", value: "1,234" },
    { label: "Active Users", value: "1,021" },
    { label: "New Users (Today)", value: "12" },
    { label: "Total Revenue", value: "$12,345" },
  ]

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <p className="text-yellow-700">
          <span className="font-bold">Admin Only:</span> This page is only accessible to administrators.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="border-b pb-2">
                <p className="font-medium">User login</p>
                <p className="text-sm text-gray-600">User ID: {1000 + item}</p>
                <p className="text-xs text-gray-500">{item} hour(s) ago</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">System Status</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Server Status</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Online</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Database Status</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Online</span>
            </div>
            <div className="flex justify-between items-center">
              <span>API Status</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Online</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Cache Status</span>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Degraded</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboardPage
