const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif text-[#3e3e3e] mb-4">About MODEVA</h1>
          <p className="text-gray-600">Premium fashion brand dedicated to quality and sustainability</p>
        </div>

        <div className="mb-12">
          <img src="/logo.png" alt="About MODEVA" className="w-full h-full object-cover rounded-lg" />
        </div>

        <div className="prose prose-lg max-w-none mb-12">
          <h2 className="text-2xl font-serif text-[#3e3e3e] mb-4">Our Story</h2>
          <p className="mb-4">
            Founded in 2010, MODEVA began as a small boutique in Jakarta with a vision to create timeless fashion pieces
            that celebrate Indonesian craftsmanship while embracing modern design aesthetics.
          </p>
          <p className="mb-4">
            Our founder, Maya Wijaya, a graduate from Parsons School of Design, returned to Indonesia with a dream to
            showcase the rich textile heritage of Indonesia to the world. What started as a passion project has now
            grown into a respected fashion brand with presence across Southeast Asia.
          </p>
          <p>
            Today, MODEVA continues to honor its roots while pushing boundaries in sustainable and ethical fashion. Each
            piece in our collection tells a story of tradition, innovation, and conscious creation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <h3 className="text-xl font-serif text-[#3e3e3e] mb-3">Our Mission</h3>
            <p className="text-gray-600">
              To create beautiful, timeless fashion that honors traditional craftsmanship while embracing modern design
              and sustainable practices.
            </p>
          </div>

          <div className="text-center">
            <h3 className="text-xl font-serif text-[#3e3e3e] mb-3">Our Vision</h3>
            <p className="text-gray-600">
              To be a global fashion brand that showcases Indonesian heritage and craftsmanship, setting new standards
              for ethical and sustainable fashion.
            </p>
          </div>

          <div className="text-center">
            <h3 className="text-xl font-serif text-[#3e3e3e] mb-3">Our Values</h3>
            <p className="text-gray-600">
              Quality, sustainability, ethical production, cultural appreciation, and innovation guide everything we do
              at MODEVA.
            </p>
          </div>
        </div>

        <div className="prose prose-lg max-w-none mb-12">
          <h2 className="text-2xl font-serif text-[#3e3e3e] mb-4">Sustainability Commitment</h2>
          <p className="mb-4">
            At MODEVA, sustainability isn't just a buzzword—it's at the core of our business. We carefully select
            materials that minimize environmental impact, work with suppliers who share our values, and design products
            to last.
          </p>
          <p>
            Our production facilities follow strict ethical guidelines, ensuring fair wages and safe working conditions.
            We're constantly innovating to reduce waste, water usage, and carbon emissions throughout our supply chain.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
