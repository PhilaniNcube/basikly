import Image from "next/image";
import Link from "next/link";
import { Product } from "../../lib/getProducts";
import { manrope } from "../Shared/Navbar";

const CategoryProductGrid = ({products}:{products:Product[]}) => {
  return (
    <section className={`my-8 ${manrope.className}`}>
      <div className="max-w-7xl mx-auto px-4">
        {products.map((product, i) => (
          <article key={product.id}
            className={`flex flex-col gap-8 my-4 ${
              i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
            }`}
          >
           <div className="md:w-1/2 w-full rounded overflow-hidden">
            <Image className="w-full object-cover rounded-lg" src={product.image.url} width={product.image.width} height={product.image.height} alt={product.title} />
           </div>
            <div className="md:w-1/2 w-full rounded overflow-hidden p-4 md:p-10 flex flex-col justify-center lg:p-20">
              <h3 className="uppercase text-slate-900 text-3xl md:text-5xl font-medium">{product.title}</h3>

              <p className="text-sm mt-3 lg:text-md text-slate-600 tracking-wide leading-7">{product.description}</p>

              <Link href={`/products/${product.slug}`} className="bg-brown hover:bg-light-brown w-fit px-8 py-3 rounded text-white font-medium uppercase mt-4">See Product</Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
export default CategoryProductGrid;
