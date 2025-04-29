"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { User, Camera } from "lucide-react"

const ProfilePage = () => {
  const { currentUser, isAuthenticated } = useAuth()
  const [activeTab, setActiveTab] = useState("profile")

  // If not authenticated, show login prompt
  if (!isAuthenticated()) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-md rounded-lg p-8 text-center">
            <div className="mb-6">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-2xl font-bold mb-4 mx-auto">
                <User className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-serif text-[#3e3e3e]">Guest User</h2>
              <p className="text-gray-600 mt-2">Please log in to view your profile information</p>
            </div>

            <Link
              to="/login"
              className="inline-block px-6 py-3 bg-[#8b4513] text-white rounded-md hover:bg-[#a05a2c] transition-colors"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // If authenticated, show user profile
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {/* Profile Header */}
          <div className="relative h-48 bg-gradient-to-r from-[#8b4513] to-[#a05a2c]">
            <div className="absolute -bottom-16 left-8 flex items-end">
              <div className="relative">
                <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center text-[#8b4513] text-4xl font-bold border-4 border-white">
                  {currentUser.name.charAt(0)}
                </div>
                <button className="absolute bottom-0 right-0 bg-[#3e3e3e] text-white p-2 rounded-full hover:bg-[#5e5e5e] transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <div className="ml-4 mb-4 text-white">
                <h1 className="text-2xl font-serif">{currentUser.name}</h1>
                <p>{currentUser.email}</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="pt-20 px-8">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "profile"
                      ? "border-[#8b4513] text-[#8b4513]"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Profile Information
                </button>
                <button
                  onClick={() => setActiveTab("orders")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "orders"
                      ? "border-[#8b4513] text-[#8b4513]"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Order History
                </button>
                <button
                  onClick={() => setActiveTab("settings")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "settings"
                      ? "border-[#8b4513] text-[#8b4513]"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Account Settings
                </button>
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === "profile" && (
              <div>
                <h2 className="text-xl font-serif text-[#3e3e3e] mb-6">Profile Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#8b4513] focus:border-[#8b4513]"
                      value={currentUser.name}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#8b4513] focus:border-[#8b4513]"
                      value={currentUser.email}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">User ID</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#8b4513] focus:border-[#8b4513]"
                      value={currentUser.id}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#8b4513] focus:border-[#8b4513]"
                      value={currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)}
                      readOnly
                    />
                  </div>
                </div>

                {currentUser.role === "admin" && (
                  <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4">
                    <p className="text-yellow-700">
                      <span className="font-bold">Admin Access:</span> You have administrator privileges. Visit the{" "}
                      <Link to="/admin" className="text-[#8b4513] hover:underline">
                        Admin Dashboard
                      </Link>{" "}
                      to manage the system.
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "orders" && (
              <div>
                <h2 className="text-xl font-serif text-[#3e3e3e] mb-6">Order History</h2>
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
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#MOD-2023-001</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Apr 15, 2023</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Delivered
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">IDR 1,250,000</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <a href="#" className="text-[#8b4513] hover:underline">
                            View
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#MOD-2023-002</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Mar 28, 2023</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            Shipped
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">IDR 850,000</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <a href="#" className="text-[#8b4513] hover:underline">
                            View
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div>
                <h2 className="text-xl font-serif text-[#3e3e3e] mb-6">Account Settings</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-[#3e3e3e] mb-3">Change Password</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                        <input
                          type="password"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#8b4513] focus:border-[#8b4513]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                        <input
                          type="password"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#8b4513] focus:border-[#8b4513]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                        <input
                          type="password"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#8b4513] focus:border-[#8b4513]"
                        />
                      </div>
                      <div>
                        <button className="px-4 py-2 bg-[#8b4513] text-white rounded-md hover:bg-[#a05a2c] transition-colors">
                          Update Password
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="text-lg font-medium text-[#3e3e3e] mb-3">Notification Preferences</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <input
                          id="email-notifications"
                          name="email-notifications"
                          type="checkbox"
                          className="h-4 w-4 text-[#8b4513] focus:ring-[#8b4513] border-gray-300 rounded"
                          defaultChecked
                        />
                        <label htmlFor="email-notifications" className="ml-2 block text-sm text-gray-700">
                          Email notifications
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="sms-notifications"
                          name="sms-notifications"
                          type="checkbox"
                          className="h-4 w-4 text-[#8b4513] focus:ring-[#8b4513] border-gray-300 rounded"
                        />
                        <label htmlFor="sms-notifications" className="ml-2 block text-sm text-gray-700">
                          SMS notifications
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="marketing-emails"
                          name="marketing-emails"
                          type="checkbox"
                          className="h-4 w-4 text-[#8b4513] focus:ring-[#8b4513] border-gray-300 rounded"
                          defaultChecked
                        />
                        <label htmlFor="marketing-emails" className="ml-2 block text-sm text-gray-700">
                          Marketing emails
                        </label>
                      </div>
                    </div>
                    <div className="mt-4">
                      <button className="px-4 py-2 bg-[#8b4513] text-white rounded-md hover:bg-[#a05a2c] transition-colors">
                        Save Preferences
                      </button>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="text-lg font-medium text-red-600 mb-3">Danger Zone</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
