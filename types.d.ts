import Product from "./pages/products/[slug]"

type CartProduct = {
  quantity: number
}

export type CartItem = Product & CartProduct
