import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import { CartProvider } from "./contexts/CartContext"
import ProtectedRoute from "./components/auth/ProtectedRoute"
import AdminRoute from "./components/auth/AdminRoute"
import PublicRoute from "./components/auth/PublicRoute"
import Layout from "./components/layout/Layout"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import DashboardPage from "./pages/DashboardPage"
import ProfilePage from "./pages/ProfilePage"
import AdminDashboardPage from "./pages/admin/AdminDashboardPage"
import ProductsManagementPage from "./pages/admin/ProductsManagementPage"
import NotFoundPage from "./pages/NotFoundPage"
import CatalogPage from "./pages/CatalogPage"
import ProductDetailPage from "./pages/ProductDetailPage"
import SalePage from "./pages/SalePage"
import NewArrivalPage from "./pages/NewArrivalPage"
import AboutPage from "./pages/AboutPage"
import CartPage from "./pages/CartPage"
import CheckoutPage from "./pages/checkout/CheckoutPage"
import CheckoutSuccessPage from "./pages/checkout/CheckoutSuccessPage"

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            {/* Public routes - accessible to everyone */}
            <Route
              path="/"
              element={
                <PublicRoute>
                  <Layout>
                    <HomePage />
                  </Layout>
                </PublicRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              }
            />
            <Route
              path="/catalog"
              element={
                <PublicRoute>
                  <Layout>
                    <CatalogPage />
                  </Layout>
                </PublicRoute>
              }
            />
            <Route
              path="/product/:id"
              element={
                <PublicRoute>
                  <Layout>
                    <ProductDetailPage />
                  </Layout>
                </PublicRoute>
              }
            />
            <Route
              path="/sale"
              element={
                <PublicRoute>
                  <Layout>
                    <SalePage />
                  </Layout>
                </PublicRoute>
              }
            />
            <Route
              path="/new-arrival"
              element={
                <PublicRoute>
                  <Layout>
                    <NewArrivalPage />
                  </Layout>
                </PublicRoute>
              }
            />
            <Route
              path="/about"
              element={
                <PublicRoute>
                  <Layout>
                    <AboutPage />
                  </Layout>
                </PublicRoute>
              }
            />

            {/* Cart and Checkout routes */}
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/checkout/success" element={<CheckoutSuccessPage />} />

            {/* User routes - accessible to logged in users (both regular and admin) */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Layout>
                    <DashboardPage />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Layout>
                    <ProfilePage />
                  </Layout>
                </ProtectedRoute>
              }
            />

            {/* Admin routes - accessible only to admins */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <Layout>
                    <AdminDashboardPage />
                  </Layout>
                </AdminRoute>
              }
            />
            <Route
              path="/admin/products"
              element={
                <AdminRoute>
                  <Layout>
                    <ProductsManagementPage />
                  </Layout>
                </AdminRoute>
              }
            />

            {/* Catch all route */}
            <Route
              path="*"
              element={
                <Layout>
                  <NotFoundPage />
                </Layout>
              }
            />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
