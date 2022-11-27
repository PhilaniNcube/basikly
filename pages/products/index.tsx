import {useState, useMemo} from "react";
import { useQuery } from "@tanstack/react-query";
import Head from "next/head";
import Loader from "../../components/Shared/Loader";
import { manrope } from "../../components/Shared/Navbar";
import { getBrands } from "../../lib/getBrands";
import { getCategories } from "../../lib/getCategories";
import { getAllProducts } from "../../lib/getProducts";
import Link from "next/link";
import Image from "next/image";
import formatCurrency from "../../lib/format";

const Products = () => {

  const [query, setQuery] = useState('')

  const {data:brands, isLoading:brandsLoading, isSuccess:brandsSuccess} = useQuery(['brands'], getBrands)
  const {data:categories, isLoading:categoriesLoading, isSuccess:categoriesSuccess} = useQuery(['categories'], getCategories)
  const {data:products, isLoading:productsLoading, isSuccess:productsSuccess} = useQuery(['products'], getAllProducts)


   let filteredProducts = useMemo(
     () =>
       products?.filter(
         (product) =>
           product.title?.toLowerCase().includes(query.toLowerCase()) ||
           product.description?.toLowerCase().includes(query.toLowerCase())
       ),
     [query, products]
   );


  return (
    <>
      <Head>
        <title>Products</title>
      </Head>
      <div
        className={`flex flex-col lg:flex-row gap-5 py-20 px-4 mx-auto ${manrope.className}`}
      >
        <aside className="w-full hidden lg:w-[20vw] lg:flex flex-col items-start ">
          <div className="w-full border-b px-3 border-slate-300 py-3">
            <p className="text-xl text-slate-700 font-bold">Filters</p>
          </div>
          <div className="w-full py-3 bg-slate-100 px-4">
            <p className="text-xl font-extrabold">By Brands</p>
            <div className="py-2">
              {brandsLoading ? (
                <Loader />
              ) : (
                brandsSuccess && (
                  <>
                    {brands.map((brand) => (
                      <p
                        className="text-md text-slate-600 rounded-lg py-2 hover:bg-slate-200 px-3 font-medium"
                        key={brand.id}
                      >
                        {brand.title}
                      </p>
                    ))}
                  </>
                )
              )}
            </div>
          </div>
          <div className="w-full py-3">
            <div className=" bg-slate-300 rounded" />
          </div>

          <div className="w-full py-3 bg-slate-100 px-4">
            <p className="text-xl font-extrabold">By Category</p>
            <div className="py-2">
              {categoriesLoading ? (
                <Loader />
              ) : (
                categoriesSuccess && (
                  <>
                    {categories.map((category) => (
                      <p
                        className="text-md text-slate-600 rounded-lg py-2 hover:bg-slate-200 px-3 font-medium"
                        key={category.id}
                      >
                        {category.title}
                      </p>
                    ))}
                  </>
                )
              )}
            </div>
          </div>
        </aside>
        <main className="flex-1 px-8">
          {productsLoading ? (
            <Loader />
          ) : (
            productsSuccess && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts?.map((product) => (
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
            )
          )}
        </main>
      </div>
    </>
  );
};
export default Products;


