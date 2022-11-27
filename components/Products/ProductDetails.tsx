
import Image from "next/image";
import formatCurrency from "../../lib/format";
import { Product } from "../../lib/getProducts";
import { manrope } from "../Shared/Navbar";
import {motion } from "framer-motion"
import {ChevronRightIcon} from "@heroicons/react/24/outline"
import Link from "next/link";
import { useShoppingCart } from "../../Context/ShoppingCartContext";

const ProductDetails = ({product}:{product: Product}) => {

  const {getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart} = useShoppingCart()

  const quantity = getItemQuantity(product)


  return (
    <section className={`${manrope.className} mt-10`}>
      <div className="w-full px-2 md:px-6 mb-5 items-center space-x-2 text-xs md:text-sm font-light py-2 border-b border-t border-slate-300 flex">
        <Link href="/">Home</Link>{" "}
        <ChevronRightIcon className="h-4 w-4 text-slate-800" />
        <Link href="/products">Products</Link>
        <ChevronRightIcon className="h-4 w-4 text-slate-800" />
        <p>{product.title}</p>
      </div>
      <motion.div
        layoutId={product.id}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto"
      >
        <div className="w-full px-4">
          <h1 className="text-slate-900 text-3xl md:text-5xl  ">
            {product.title}
          </h1>
          <Image
            src={product.image.url}
            width={product.image.width}
            height={product.image.height}
            alt={product.title}
            className="w-full object-cover aspect-square"
          />
        </div>

        <div className="w-full flex flex-col justify-center p-10 md:p-16 lg:p-20">
          <p className="text-md text-slate-600 font-medium mt-6 tracking-wide">
            {product.brand.title}
          </p>
          <p className="text-md text-slate-600 font-medium mt-6 tracking-wide">
            {product.description}
          </p>

          <h3 className="text-black text-3xl mt-5 font-extrabold">
            {formatCurrency(product.price)}
          </h3>

          <p className="text-md text-slate-600 font-medium mt-1 tracking-wide">
            Category: {product.category.title}
          </p>
          <p className="text-md text-slate-600 font-medium mt-1 tracking-wide">
           Colour: {product.colour}
          </p>
          <p className="text-md text-slate-600 font-medium mt-1 tracking-wide">
           Dimensions: {product.dimensions}
          </p>
          <p className="text-md text-slate-600 font-medium mt-1 tracking-wide">
           Specifications: {product.specifications}
          </p>

          <button onClick={() => increaseCartQuantity(product)} className="w-fit px-8 py-2 rounded bg-brown text-white text-xl lg:text-2xl mt-6">
            Add To Cart
          </button>
        </div>
      </motion.div>
    </section>
  );
};
export default ProductDetails;
