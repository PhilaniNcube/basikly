
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import formatCurrency from "../../lib/format";
import { getFeaturedProducts } from "../../lib/getProducts";
import Loader from "../Shared/Loader";
import { manrope } from "../Shared/Navbar";

const FeaturedProducts = () => {

  const {data: featuredProducts, isLoading, isSuccess} =useQuery(['featuredProducts'], getFeaturedProducts)


  return (
    <section className={`my-8 ${manrope.className}`}>
      <div className="py-10 mx-auto">
        {isLoading ? (
          <Loader />
        ) : (
          isSuccess && (
            <>
              <div className="max-w-7xl mx-auto px-4 grid gird-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {featuredProducts.map((product) => (
                  <Link
                    href={`/products/${product.slug}`}
                    className="w-full text-center rounded-lg border border-slate-300 p-3 lg:p-5"
                    key={product.id}
                  >
                    <Image
                      src={product.image.url}
                      width={product.image.width}
                      height={product.image.height}
                      alt={product.title}
                      className="w-full aspect-square object-cover"
                    />
                    <div className="w-full flex flex-col justify-around">
                      <p className="text-base md:text-md text-slate-700 mt-2 line-clamp-1">
                        {product.title}
                      </p>

                      <small className="text-xs mt-1 text-brown">
                        {product.brand.title}
                      </small>

                      <h3 className="text-xl font-medium text-slate-800">
                        {formatCurrency(product.price)}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )
        )}
      </div>
    </section>
  );
};
export default FeaturedProducts;
