// Base URL for the API (would be replaced with a real API endpoint in production)
const API_BASE_URL = "https://api.example.com" // Placeholder

// Mock user database (simulating server-side storage)
let users = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123",
    role: "admin",
    avatar: null,
    createdAt: "2023-01-15T08:30:00.000Z",
  },
  {
    id: 2,
    name: "Regular User",
    email: "user@example.com",
    password: "user123",
    role: "user",
    avatar: null,
    createdAt: "2023-02-20T14:15:00.000Z",
  },
]

// Helper function to simulate API delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Register a new user
export const registerUser = async (userData) => {
  await delay(800) // Simulate network delay

  // Check if email already exists
  if (users.some((user) => user.email === userData.email)) {
    return {
      success: false,
      message: "Email already in use",
    }
  }

  // Create new user
  const newUser = {
    id: users.length + 1,
    name: userData.name,
    email: userData.email,
    password: userData.password, // In a real app, this would be hashed
    role: "user", // Default role for new registrations
    avatar: null,
    createdAt: new Date().toISOString(),
  }

  // Add to "database"
  users.push(newUser)

  // Return user without password
  const { password, ...userWithoutPassword } = newUser
  return {
    success: true,
    user: userWithoutPassword,
  }
}

// Login user
export const loginUser = async (email, password) => {
  await delay(1000) // Simulate network delay

  // Find user
  const user = users.find((u) => u.email === email)

  // Check if user exists and password matches
  if (!user || user.password !== password) {
    return {
      success: false,
      message: "Invalid email or password",
    }
  }

  // Return user without password
  const { password: pwd, ...userWithoutPassword } = user
  return {
    success: true,
    user: userWithoutPassword,
  }
}

// Get user profile
export const getUserProfile = async (userId) => {
  await delay(500)

  const user = users.find((u) => u.id === userId)

  if (!user) {
    return {
      success: false,
      message: "User not found",
    }
  }

  // Return user without password
  const { password, ...userWithoutPassword } = user
  return {
    success: true,
    user: userWithoutPassword,
  }
}

// Update user profile
export const updateUserProfile = async (userId, userData) => {
  await delay(800)

  const userIndex = users.findIndex((u) => u.id === userId)

  if (userIndex === -1) {
    return {
      success: false,
      message: "User not found",
    }
  }

  // Update user data (except password and role)
  users[userIndex] = {
    ...users[userIndex],
    name: userData.name || users[userIndex].name,
    email: userData.email || users[userIndex].email,
    // Don't update password or role here
  }

  // Return updated user without password
  const { password, ...userWithoutPassword } = users[userIndex]
  return {
    success: true,
    user: userWithoutPassword,
  }
}

// Change password
export const changePassword = async (userId, currentPassword, newPassword) => {
  await delay(800)

  const userIndex = users.findIndex((u) => u.id === userId)

  if (userIndex === -1) {
    return {
      success: false,
      message: "User not found",
    }
  }

  // Verify current password
  if (users[userIndex].password !== currentPassword) {
    return {
      success: false,
      message: "Current password is incorrect",
    }
  }

  // Update password
  users[userIndex].password = newPassword

  return {
    success: true,
    message: "Password updated successfully",
  }
}

// Upload avatar
export const uploadAvatar = async (userId, avatarData) => {
  await delay(1200) // Longer delay to simulate file upload

  const userIndex = users.findIndex((u) => u.id === userId)

  if (userIndex === -1) {
    return {
      success: false,
      message: "User not found",
    }
  }

  // In a real app, this would handle file upload to a server or cloud storage
  // For this mock, we'll just store the data URL
  users[userIndex].avatar = avatarData

  // Return updated user without password
  const { password, ...userWithoutPassword } = users[userIndex]
  return {
    success: true,
    user: userWithoutPassword,
  }
}

// Delete user account
export const deleteUserAccount = async (userId, password) => {
  await delay(1000)

  const userIndex = users.findIndex((u) => u.id === userId)

  if (userIndex === -1) {
    return {
      success: false,
      message: "User not found",
    }
  }

  // Verify password
  if (users[userIndex].password !== password) {
    return {
      success: false,
      message: "Password is incorrect",
    }
  }

  // Remove user from "database"
  users = users.filter((u) => u.id !== userId)

  return {
    success: true,
    message: "Account deleted successfully",
  }
}
