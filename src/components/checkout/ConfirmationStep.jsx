const ConfirmationStep = () => {
  return (
    <div>
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-medium text-[#3e3e3e]">Order Number</h3>
          <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">Waiting For Payment</span>
        </div>
        <p className="text-xl font-medium">12345ASDFGHJ</p>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-medium text-[#3e3e3e] mb-3">Payment Information</h3>
        <p className="text-gray-600">
          Upon completing a purchase, you will receive a payment confirmation email. This email will contain essential
          information about the items you have purchased and the total amount that needs to be paid.
        </p>
      </div>
    </div>
  )
}

export default ConfirmationStep
