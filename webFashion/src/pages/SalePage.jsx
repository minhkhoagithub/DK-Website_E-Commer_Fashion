const SalePage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif text-[#3e3e3e] mb-4">Sale</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our special offers and discounts on premium fashion items.
          </p>
        </div>

        <div className="bg-[#8b4513]/10 rounded-lg p-8 mb-12 text-center">
          <h2 className="text-2xl font-serif text-[#8b4513] mb-2">Special Discount</h2>
          <p className="text-xl text-[#3e3e3e] mb-4">Get up to 50% off on selected items</p>
          <p className="text-gray-600 mb-6">Limited time offer. While stocks last.</p>
          <button className="px-6 py-3 bg-[#8b4513] text-white rounded-md font-medium hover:bg-[#a05a2c] transition-colors">
            Shop Now
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="relative h-80 rounded-lg overflow-hidden">
            <img src="/product1.png" alt="Sale item" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white p-6">
              <h3 className="text-2xl font-serif mb-2">Summer Collection</h3>
              <p className="text-center mb-4">Up to 30% off on summer essentials</p>
              <button className="px-4 py-2 bg-white text-[#3e3e3e] rounded-md font-medium hover:bg-gray-100 transition-colors">
                View Collection
              </button>
            </div>
          </div>

          <div className="relative h-80 rounded-lg overflow-hidden">
            <img src="/product2.png" alt="Sale item" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white p-6">
              <h3 className="text-2xl font-serif mb-2">Winter Clearance</h3>
              <p className="text-center mb-4">Up to 50% off on winter items</p>
              <button className="px-4 py-2 bg-white text-[#3e3e3e] rounded-md font-medium hover:bg-gray-100 transition-colors">
                View Collection
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-serif text-[#3e3e3e] mb-4">Featured Sale Items</h2>
          <p className="text-gray-600">Handpicked items with the best discounts</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="group">
              <div className="relative overflow-hidden rounded-lg mb-3">
                <img
                  src={item % 2 === 0 ? "/product1.png" : "/product2.png"}
                  alt="Sale product"
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                  -30%
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="bg-white text-[#3e3e3e] px-4 py-2 rounded-md font-medium transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    Quick View
                  </button>
                </div>
              </div>
              <h3 className="text-[#3e3e3e] font-medium">Sale Product {item}</h3>
              <p className="text-gray-600 text-sm">Category</p>
              <div className="flex items-center mt-1">
                <p className="text-red-600 font-medium">IDR 700,000</p>
                <p className="text-gray-500 line-through text-sm ml-2">IDR 1,000,000</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SalePage
