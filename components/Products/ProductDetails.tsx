
import Image from "next/image";
import formatCurrency from "../../lib/format";
import { Product } from "../../lib/getProducts";
import { manrope } from "../Shared/Navbar";
import {motion } from "framer-motion"

const ProductDetails = ({product}:{product: Product}) => {
  return (
    <section className={`${manrope.className} mt-10`}>
      <motion.div
        layoutId={product.id}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto"
      >
        <Image
          src={product.image.url}
          width={product.image.width}
          height={product.image.height}
          alt={product.title}
          className="w-full object-cover aspect-square"
        />
        <div className="w-full flex flex-col justify-center p-10 md:p-16 lg:p-20">
          <h1 className="text-slate-900 text-3xl md:text-5xl font-bold uppercase">
            {product.title}
          </h1>
          <p className="text-md md:text-lg lg:text-lg text-slate-600 font-medium mt-6 tracking-wide">
            {product.description}
          </p>

          <h3 className="text-black text-3xl mt-5 font-extrabold">
            {formatCurrency(product.price)}
          </h3>

          <button className="w-fit px-8 py-2 rounded bg-brown text-white text-xl lg:text-2xl mt-6">
            Add To Cart
          </button>
        </div>
      </motion.div>
    </section>
  );
};
export default ProductDetails;
