import { X } from "lucide-react"

const OrderSummary = ({ cartItems, orderSummary }) => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h2 className="text-2xl font-medium text-[#3e3e3e] mb-6">ORDER SUMMARY</h2>

      {/* Promo Code Alert */}
      <div className="bg-[#f5f0e9] p-4 mb-6 rounded relative">
        <p className="text-[#3e3e3e]">Hooray! You use promo code!</p>
        <button className="absolute top-4 right-4">
          <X className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      {/* Cart Items */}
      <div className="space-y-6 mb-6">
        {cartItems.map((item) => (
          <div key={item.id} className="flex">
            <img
              src={item.image || "/placeholder.svg"}
              alt={item.name}
              className="w-20 h-20 object-cover rounded mr-4"
            />
            <div>
              <h3 className="font-medium text-[#3e3e3e]">{item.name}</h3>
              <div className="flex items-center text-gray-600 mt-1">
                <span>{item.quantity}</span>
                <span className="mx-1">×</span>
                <span>{item.price}</span>
              </div>
              {item.note && <p className="text-sm text-gray-600 mt-1">{item.note}</p>}
            </div>
          </div>
        ))}
      </div>

      {/* Order Totals */}
      <div className="border-t border-gray-200 pt-4 space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">{orderSummary.subtotal}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Voucher ({orderSummary.voucherCode})</span>
          <span className="font-medium text-red-600">{orderSummary.voucher}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">{orderSummary.shipping}</span>
        </div>
        <div className="flex justify-between pt-2 border-t border-gray-200 mt-2">
          <span className="font-medium text-[#3e3e3e]">Total</span>
          <span className="font-medium text-[#3e3e3e]">{orderSummary.total}</span>
        </div>
      </div>
    </div>
  )
}

export default OrderSummary
