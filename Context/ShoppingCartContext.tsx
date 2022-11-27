import {createContext, useState, useContext} from "react"
import ShoppingCart from "../components/Shared/ShoppingCart";
import { Product } from "../lib/getProducts";


type ShoppingCartProviderProps = {
  children: React.ReactNode;
};

type CartProduct = {
  quantity: number
}

export type CartItem = Product & {
  quantity: number
}

type ShoppingCartContext = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (product: Product) => number;
  increaseCartQuantity: (product: Product) => void;
  decreaseCartQuantity: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  cartQuantity: number;
  cartTotal: number;
  cartItems: CartItem[];
};

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useShoppingCart() {
  return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({children}:ShoppingCartProviderProps) {

  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const cartQuantity = cartItems.reduce((quantity, item) =>  item.quantity + quantity, 0)
  const cartTotal = cartItems.reduce(
    (quantity, item) => item.price * item.quantity + quantity,
    0
  );

  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)

  function getItemQuantity(product:Product) {
    return cartItems.find(item => item.id === product.id)?.quantity || 0
  }

  function increaseCartQuantity(product:Product) {
    setCartItems(currItems => {
      // this if statement is looking to see if our items is currently in the cart the null check means that the item is not in our cart so we need to add it to the cart
      if(currItems.find(item => item.id === product.id) == null) {
        return [...currItems, {...product, quantity: 1} ]
      } else {
        // We reach this block if the item is already in the cart therefore we need to increment the cart quantity
        return currItems.map(item  => {
          if(item.id === product.id) {
            return {...item, quantity: item.quantity + 1}
          } else {
            return item
          }
        })
      }
    })
  }

  function decreaseCartQuantity(product:Product) {
    setCartItems(currItems => {
      // this if statement is looking to see if our item quantity is equal to one
      if(currItems.find(item => item.id === product.id)?.quantity === 1) {
        // remove the item from the cart
        return currItems.filter(item => item.id !== product.id)
      } else {
        // We reach this block if the item is already in the cart therefore we need to increment the cart quantity
        return currItems.map(item  => {
          if(item.id === product.id) {
            return {...item, quantity: item.quantity - 1}
          } else {
            return item
          }
        })
      }
    })
  }

  function removeFromCart(product: Product) {
    setCartItems(currItems => {
      return currItems.filter(item => item.id !== product.id)
    })
  }


  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        openCart,
        closeCart,
        cartQuantity,
        cartItems,
        cartTotal,
      }}
    >
      {children}
      <ShoppingCart open={isOpen} />
    </ShoppingCartContext.Provider>
  );
}
