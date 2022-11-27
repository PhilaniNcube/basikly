import Image from "next/image";
import Link from "next/link";
import { Product } from "../../lib/getProducts";
import { manrope } from "../Shared/Navbar";
import {motion} from "framer-motion"
import formatCurrency from "../../lib/format";

const CategoryProductGrid = ({products}:{products:Product[]}) => {
  return (
    <section className={`my-8 ${manrope.className}`}>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products?.map((product) => (
          <Link
            href={`/products/${product.slug}`}
            className="border border-slate-300 rounded-lg group group-hover:opacity-75 cursor-pointer"
          >
            <Image
              src={product.image.url}
              width={product.image.width}
              height={product.image.height}
              alt={product.title}
              className="w-full aspect-square p-4"
            />
            <div className="w-full p-1 md:p-4">
              <p className="text-sm md:text-md lg:text-lg line-clamp-2 md:line-clamp-1 text-slate-600 font-medium">
                {product.title}
              </p>
              <p className="text-xs sm:text-md lg:text-2xl text-slate-800 font-extrabold">
                {formatCurrency(product.price)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
export default CategoryProductGrid;
