"use client"

import { useState, useEffect, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { User, Camera, Loader2 } from "lucide-react"
import { fetchUserOrders } from "../services/api"
import { changePassword, uploadAvatar, deleteUserAccount } from "../services/userApi"

const ProfilePage = () => {
  const { currentUser, isAuthenticated, updateUserInContext, logout } = useAuth()
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
                <AvatarUpload currentUser={currentUser} updateUserInContext={updateUserInContext} />
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
                <OrderHistory userId={currentUser.id} />
              </div>
            )}

            {activeTab === "settings" && (
              <div>
                <h2 className="text-xl font-serif text-[#3e3e3e] mb-6">Account Settings</h2>
                <div className="space-y-6">
                  <PasswordChangeForm userId={currentUser.id} />

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

                  <DeleteAccountSection userId={currentUser.id} logout={logout} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Avatar Upload Component
const AvatarUpload = ({ currentUser, updateUserInContext }) => {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState(null)
  const fileInputRef = useRef(null)

  const handleAvatarClick = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file")
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size should be less than 5MB")
      return
    }

    setIsUploading(true)
    setError(null)

    try {
      // Convert file to data URL
      const reader = new FileReader()
      reader.onload = async (event) => {
        const avatarData = event.target.result

        // Upload avatar
        const result = await uploadAvatar(currentUser.id, avatarData)

        if (result.success) {
          // Update user in context
          updateUserInContext(result.user)
        } else {
          setError(result.message || "Failed to upload avatar")
        }

        setIsUploading(false)
      }

      reader.onerror = () => {
        setError("Failed to read file")
        setIsUploading(false)
      }

      reader.readAsDataURL(file)
    } catch (err) {
      setError("An unexpected error occurred")
      setIsUploading(false)
      console.error(err)
    }
  }

  return (
    <div className="relative">
      <div
        className="w-32 h-32 bg-white rounded-full flex items-center justify-center text-[#8b4513] text-4xl font-bold border-4 border-white cursor-pointer overflow-hidden"
        onClick={handleAvatarClick}
      >
        {isUploading ? (
          <Loader2 className="w-10 h-10 animate-spin" />
        ) : currentUser.avatar ? (
          <img
            src={currentUser.avatar || "/placeholder.svg"}
            alt={currentUser.name}
            className="w-full h-full object-cover"
          />
        ) : (
          currentUser.name.charAt(0)
        )}
      </div>

      <button
        className="absolute bottom-0 right-0 bg-[#3e3e3e] text-white p-2 rounded-full hover:bg-[#5e5e5e] transition-colors"
        onClick={handleAvatarClick}
      >
        <Camera className="w-4 h-4" />
      </button>

      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />

      {error && (
        <div className="absolute -bottom-10 left-0 right-0 text-xs text-red-600 bg-red-100 p-1 rounded">{error}</div>
      )}
    </div>
  )
}

// Password Change Form Component
const PasswordChangeForm = ({ userId }) => {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [validationErrors, setValidationErrors] = useState({})

  const validateForm = () => {
    const errors = {}

    if (!currentPassword) {
      errors.currentPassword = "Current password is required"
    }

    if (!newPassword) {
      errors.newPassword = "New password is required"
    } else if (newPassword.length < 6) {
      errors.newPassword = "Password must be at least 6 characters"
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Please confirm your new password"
    } else if (newPassword !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match"
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      const result = await changePassword(userId, currentPassword, newPassword)

      if (result.success) {
        setSuccess(true)
        setCurrentPassword("")
        setNewPassword("")
        setConfirmPassword("")
      } else {
        setError(result.message || "Failed to change password")
      }
    } catch (err) {
      setError("An unexpected error occurred")
      console.error(err)
    }

    setLoading(false)
  }

  return (
    <div>
      <h3 className="text-lg font-medium text-[#3e3e3e] mb-3">Change Password</h3>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {success && (
        <div className="bg-green-100 border-l-4 border-green-500 p-4 mb-4">
          <p className="text-green-700">Password updated successfully!</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
          <input
            type="password"
            className={`w-full px-3 py-2 border ${
              validationErrors.currentPassword ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-[#8b4513] focus:border-[#8b4513]`}
            value={currentPassword}
            onChange={(e) => {
              setCurrentPassword(e.target.value)
              if (validationErrors.currentPassword) {
                setValidationErrors({
                  ...validationErrors,
                  currentPassword: null,
                })
              }
            }}
          />
          {validationErrors.currentPassword && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.currentPassword}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
          <input
            type="password"
            className={`w-full px-3 py-2 border ${
              validationErrors.newPassword ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-[#8b4513] focus:border-[#8b4513]`}
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value)
              if (validationErrors.newPassword) {
                setValidationErrors({
                  ...validationErrors,
                  newPassword: null,
                })
              }
            }}
          />
          {validationErrors.newPassword && <p className="mt-1 text-sm text-red-600">{validationErrors.newPassword}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
          <input
            type="password"
            className={`w-full px-3 py-2 border ${
              validationErrors.confirmPassword ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-[#8b4513] focus:border-[#8b4513]`}
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value)
              if (validationErrors.confirmPassword) {
                setValidationErrors({
                  ...validationErrors,
                  confirmPassword: null,
                })
              }
            }}
          />
          {validationErrors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.confirmPassword}</p>
          )}
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-[#8b4513] text-white rounded-md hover:bg-[#a05a2c] transition-colors disabled:bg-[#d3a27e] flex items-center"
          >
            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {loading ? "Updating..." : "Update Password"}
          </button>
        </div>
      </form>
    </div>
  )
}

// Delete Account Section Component
const DeleteAccountSection = ({ userId, logout }) => {
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleDeleteAccount = async (e) => {
    e.preventDefault()
    setError(null)

    if (!password) {
      setError("Please enter your password to confirm")
      return
    }

    setLoading(true)

    try {
      const result = await deleteUserAccount(userId, password)

      if (result.success) {
        logout()
        navigate("/")
      } else {
        setError(result.message || "Failed to delete account")
      }
    } catch (err) {
      setError("An unexpected error occurred")
      console.error(err)
    }

    setLoading(false)
  }

  return (
    <div className="border-t pt-6">
      <h3 className="text-lg font-medium text-red-600 mb-3">Danger Zone</h3>
      <p className="text-sm text-gray-600 mb-4">
        Once you delete your account, there is no going back. Please be certain.
      </p>

      {!showConfirmation ? (
        <button
          onClick={() => setShowConfirmation(true)}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          Delete Account
        </button>
      ) : (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <h4 className="font-medium text-red-800 mb-2">Confirm Account Deletion</h4>
          <p className="text-sm text-red-700 mb-4">
            Please enter your password to confirm that you want to permanently delete your account.
          </p>

          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 p-3 mb-4">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleDeleteAccount} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex space-x-3">
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:bg-red-300 flex items-center"
              >
                {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {loading ? "Deleting..." : "Confirm Deletion"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowConfirmation(false)
                  setPassword("")
                  setError(null)
                }}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

// Order History Component
const OrderHistory = ({ userId }) => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [showOrderModal, setShowOrderModal] = useState(false)

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true)
        const data = await fetchUserOrders(userId)
        setOrders(data)
      } catch (err) {
        console.error("Error loading orders:", err)
        setError("Failed to load your order history. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    loadOrders()
  }, [userId])

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
  }

  // Format price
  const formatPrice = (price) => {
    return `IDR ${price.toLocaleString("id-ID")}`
  }

  // Handle viewing order details
  const handleViewOrderDetails = (orderId) => {
    setSelectedOrder(orders.find((order) => order.id === orderId))
    setShowOrderModal(true)
  }

  // Order Details Modal
  const OrderDetailsModal = () => {
    if (!selectedOrder) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center p-6 border-b">
            <h3 className="text-xl font-serif text-[#3e3e3e]">Order Details</h3>
            <button onClick={() => setShowOrderModal(false)} className="text-gray-500 hover:text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="text-lg font-medium mb-3">Order Information</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Number:</span>
                    <span className="font-medium">{selectedOrder.orderNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span>{formatDate(selectedOrder.orderDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        selectedOrder.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : selectedOrder.status === "processing"
                            ? "bg-blue-100 text-blue-800"
                            : selectedOrder.status === "shipped"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-green-100 text-green-800"
                      }`}
                    >
                      {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-medium mb-3">Order Items</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {selectedOrder.items.map((item, index) => (
                      <tr key={index}>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <img
                                className="h-10 w-10 rounded-md object-cover"
                                src={item.product.images[0] || "/placeholder.svg"}
                                alt={item.product.name}
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{item.product.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantity}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{formatPrice(item.price)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-medium mb-3">Order Summary</h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between border-t pt-2 mt-2">
                  <span className="text-gray-800 font-medium">Total:</span>
                  <span className="text-gray-800 font-medium">{formatPrice(selectedOrder.totalAmount)}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowOrderModal(false)}
                className="px-4 py-2 bg-[#8b4513] text-white rounded-md hover:bg-[#a05a2c] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-10 bg-gray-200 rounded w-full"></div>
        <div className="h-10 bg-gray-200 rounded w-full"></div>
        <div className="h-10 bg-gray-200 rounded w-full"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4">
        <p className="text-red-700">{error}</p>
        <button onClick={() => window.location.reload()} className="mt-2 text-[#8b4513] hover:underline">
          Try Again
        </button>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-lg">
        <div className="text-gray-500 mb-4">You haven't placed any orders yet.</div>
        <Link
          to="/catalog"
          className="inline-block px-4 py-2 bg-[#8b4513] text-white rounded-md hover:bg-[#a05a2c] transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.orderNumber}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(order.orderDate)}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    order.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : order.status === "processing"
                        ? "bg-blue-100 text-blue-800"
                        : order.status === "shipped"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-green-100 text-green-800"
                  }`}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatPrice(order.totalAmount)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button onClick={() => handleViewOrderDetails(order.id)} className="text-[#8b4513] hover:underline">
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showOrderModal && <OrderDetailsModal />}
    </div>
  )
}

export default ProfilePage
