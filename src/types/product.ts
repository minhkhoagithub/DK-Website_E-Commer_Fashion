export interface Product {
  id: number
  name: string
  category: string
  description: string
  price: number
  originalPrice?: number
  discount?: number
  rating: number
  images: string[]
  sizes: string[]
  inStock: boolean
  tags?: string[]
}

export interface CartItem extends Product {
  quantity: number
  selectedSize?: string
}
