import {useState, useMemo} from "react";
import { NextApiRequest, NextApiResponse } from "next";
import { useRouter } from "next/router";
import Dashboard from "../../../components/Shared/Dashboard";
import { Database } from "../../../database.types";
import { createDraftProduct } from "../../../lib/createDraftProduct";
import getProducts from "../../../lib/getProducts";
import supabase from "../../../utils/supabase";
import formatCurrency from "../../../lib/format";
import Link from "next/link";

export type Product = Database["public"]["Tables"]["products"]["Insert"];

const Products = ({products, page, size}:{products:Product[], page:number, size:number}) => {

  const [filter, setFilter] = useState('')

  const nextPage = () => {

    console.log(products.length, size)

    if(products?.length < size) {
      alert("This is the last page");
      return
    }

    router.push(`/admin/products?page=${+page+1}`)
  }

  const prevPage = () => {
    if(+page === 0) {
      alert('This is the first page')
      return
    }

    router.push(`/admin/products?page=${+page-1}`)
  }


  console.log({page, size, products})

  const router = useRouter();

  const create = async () => {

  const { data, error } = await supabase
    .from("products")
    .insert([
      {
        slug: Math.random(),
        title: "Draft Product",
        description: "",
        dimensions: "",
        specifications: "",
        colour: "",
      },
    ])
    .select("*").single();

    router.push(`/admin/products/${data?.slug}`)

  }


  let filteredProducts = useMemo(() =>
  products.filter((product) =>
  product.title?.toLowerCase().includes(filter.toLowerCase()) ||
  product.description?.toLowerCase().includes(filter.toLowerCase())
  ), [filter, products]);



  return (
    <Dashboard>
      <div className="w-full flex justify-end"></div>
      <div className="sm:px-6 w-full">
        <div className="px-4 md:px-10 py-4 md:py-7">
          <div className="lg:flex items-center justify-between">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
              Products
            </p>
            <div className="md:flex items-center mt-6 lg:mt-0">
              <div className="flex items-center">


                <div className="flex items-center pl-3 bg-white border w-64 rounded border-gray-200">
                  <svg
                    className="text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={20}
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M8.33333 13.1667C11.555 13.1667 14.1667 10.555 14.1667 7.33333C14.1667 4.11167 11.555 1.5 8.33333 1.5C5.11167 1.5 2.5 4.11167 2.5 7.33333C2.5 10.555 5.11167 13.1667 8.33333 13.1667Z"
                      stroke="currentColor"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M17.5 17.5L12.5 12.5"
                      stroke="currentColor"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <input
                    type="text"
                    id="filter"
                    name="filter"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="py-2.5 pl-1 w-full border-none focus:ring-0 outline-none focus:outline-none text-sm rounded text-gray-600 placeholder-gray-500"
                    placeholder="Search"
                  />
                </div>
              </div>
              <div className="flex items-center  mt-4 md:mt-0 ml-3 ">

                <button
                  className="bg-teal-600 px-8 py-2 text-white font-medium rounded"
                  onClick={create}
                >
                  Add Product
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white px-4 md:px-8 xl:px-10 overflow-x-auto">
          <table className="w-full whitespace-nowrap">
            <thead>
              <tr className="h-20 w-full text-sm leading-none text-gray-600">
                <th className="font-normal text-left pl-4">#</th>
                <th className="font-normal text-left pl-11">Title</th>
                <th className="font-normal text-left pl-10">Price</th>
                <th className="font-normal text-left">Category</th>
                <th className="font-normal text-left">Brand</th>
                <th className="font-normal text-left">In Stock</th>
                <th className="font-normal text-left">Status</th>
                <th className="font-normal text-left w-32">Actions</th>
              </tr>
            </thead>
            <tbody className="w-full">


              {filteredProducts.map((product, i) => {
                return (
                  <tr
                    key={product.id}
                    className="h-20 text-sm leading-none text-gray-700 border-b border-t border-gray-200 bg-white hover:bg-gray-100"
                  >
                    <td className="pl-4"></td>
                    <td className="pl-11">
                      <div className="flex items-center">
                        <img
                          className="shadow-md rounded-full w-10 h-10 mr-3"
                          src={product.image?.url}
                        />
                        {product.title}
                      </div>
                    </td>
                    <td>
                      <p className="mr-16 pl-10">
                        {formatCurrency(product.price!)}
                      </p>
                    </td>
                    <td>
                      <p className="mr-16">{product.category?.title}</p>
                    </td>
                    <td>
                      <p className="mr-16">{product.brand?.title}</p>
                    </td>
                    <td>
                      <p className="mr-16">
                        {product.inStock ? "In Stcok" : "Out Of Stock"}
                      </p>
                    </td>
                    <td>
                      <div
                        className={`w-20 h-6 flex items-center mr-16 justify-center rounded-full ${
                          product.published ? "bg-green-200" : "bg-red-100"
                        }`}
                      >
                        <p className={`text-xs leading-3 ${product.published ? 'text-green-600' : 'text-red-600'}`}>
                          {product.published ? 'Published' : 'Draft'}
                        </p>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center">
                        <Link href={`/admin/products/${product.slug}`} className="bg-blue-700 font-bold mr-3 hover:bg-blue-500 py-2.5 px-5 rounded text-sm leading-3 focus:outline-none text-white">
                          View
                        </Link>

                      </div>
                    </td>
                  </tr>
                );
              })}


            </tbody>
          </table>
          <div className="w-full mt-4 flex items-center justify-between">
            <button className="bg-teal-600 text-white text-lg font-medium px-6 py-2 rounded" onClick={prevPage}>Prev Page</button>
            <button className="bg-teal-600 text-white text-lg font-medium px-6 py-2 rounded" onClick={nextPage}>Next Page</button>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};
export default Products;


export async function getServerSideProps({
query: {page='0'}
}: {
  query:{page:string}
}) {

  let size = 10

  let products = await getProducts(+page , size);



  return {
    props: {
      page,
      size,
      products,
    }, // will be passed to the page component as props
  };
}
