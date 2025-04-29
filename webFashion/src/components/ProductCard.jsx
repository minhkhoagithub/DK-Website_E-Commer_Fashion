const ProductCard = ({ name, price, image }) => {
  return (
    <div className="flex bg-white rounded-md overflow-hidden shadow-lg">
      <div className="w-full sm:w-64 p-4 sm:p-6 flex flex-col justify-between">
        <div>
          <h3 className="text-xl sm:text-2xl font-serif text-[#3e3e3e] line-clamp-2">{name}</h3>
          <p className="text-[#757575] mt-2">{price}</p>
        </div>
        <button className="text-[#3e3e3e] font-medium mt-4 self-start hover:underline transition-all">SHOP NOW</button>
      </div>
      <div className="w-32 h-32 sm:w-40 sm:h-40 relative flex-shrink-0">
        <img src={image || "/placeholder.svg"} alt={name} className="w-full h-full object-cover" />
      </div>
    </div>
  )
}

export default ProductCard
