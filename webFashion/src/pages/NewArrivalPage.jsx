const NewArrivalPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif text-[#3e3e3e] mb-4">New Arrivals</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our latest collection of premium fashion items, fresh off the runway.
          </p>
        </div>

        <div className="relative h-96 rounded-lg overflow-hidden mb-12">
          <img src="../img/new-arrivals-modeva.png" alt="New collection" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white p-6">
            <h2 className="text-3xl font-serif mb-2">Spring/Summer 2023</h2>
            <p className="text-center mb-6 max-w-md">
              Our newest collection inspired by the vibrant colors and energy of summer
            </p>
            <button className="px-6 py-3 bg-white text-[#3e3e3e] rounded-md font-medium hover:bg-gray-100 transition-colors">
              Explore Collection
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="group">
              <div className="relative overflow-hidden rounded-lg mb-3">
                <img
                  src={item % 2 === 0 ? "/product1.png" : "/product2.png"}
                  alt="New arrival product"
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 bg-[#8b4513] text-white text-xs font-bold px-2 py-1 rounded">
                  NEW
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="bg-white text-[#3e3e3e] px-4 py-2 rounded-md font-medium transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    Quick View
                  </button>
                </div>
              </div>
              <h3 className="text-[#3e3e3e] font-medium">New Product {item}</h3>
              <p className="text-gray-600 text-sm">Category</p>
              <p className="text-[#8b4513] font-medium mt-1">IDR 850,000</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-[#8b4513]/10 rounded-lg p-6 text-center">
            <h3 className="text-xl font-serif text-[#3e3e3e] mb-2">Free Shipping</h3>
            <p className="text-gray-600">On all new arrivals for a limited time</p>
          </div>

          <div className="bg-[#8b4513]/10 rounded-lg p-6 text-center">
            <h3 className="text-xl font-serif text-[#3e3e3e] mb-2">Exclusive Access</h3>
            <p className="text-gray-600">Members get early access to new items</p>
          </div>

          <div className="bg-[#8b4513]/10 rounded-lg p-6 text-center">
            <h3 className="text-xl font-serif text-[#3e3e3e] mb-2">Limited Edition</h3>
            <p className="text-gray-600">Special pieces available for a short time</p>
          </div>
        </div>

        <div className="text-center">
          <button className="px-6 py-3 border-2 border-[#8b4513] text-[#8b4513] rounded-md font-medium hover:bg-[#8b4513] hover:text-white transition-colors">
            View All New Arrivals
          </button>
        </div>
      </div>
    </div>
  )
}

export default NewArrivalPage
