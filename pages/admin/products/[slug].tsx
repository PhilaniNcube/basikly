import Head from "next/head";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import slugify from "slugify";
import Dashboard from "../../../components/Shared/Dashboard";
import { useQuery } from "@tanstack/react-query";
import { Category, getCategories } from "../../../lib/getCategories";
import { NextApiRequest, NextApiResponse } from "next";
import supabase from "../../../utils/supabase";
import { getProduct, Product } from "../../../lib/getProducts";
import { Switch } from "@headlessui/react";
import Image from "next/image";
import { Brand, getBrands } from "../../../lib/getBrands";

const uploadPreset: string = process.env.NEXT_PUBLIC_UPLOAD_PRESET || "";

const Add = ({ categories, product, brands }: { categories: Category[], product: Product, brands: Brand[] }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [imageData, setImageData] = useState(product.image);

  const [productData, setProductData] = useState(product);

  console.log({product: productData})

  const {
    data: categoryQuery,
    isLoading,
    isSuccess,
  } = useQuery(["categories"], getCategories, {
    initialData: categories,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  console.log({ categories });

  const handleImageUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const { image } = Object.fromEntries(new FormData(e.currentTarget));

    // const fileInput = Array.from(form.elements).find((item) => item.getAttribute('type') === 'file')

    const formData = new FormData();

    formData.append("file", image);
    formData.append("upload_preset", uploadPreset);

    const data = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    )
      .then((r) => r.json())
      .catch((err) => err.json());
    console.log({ data });

    setImageData({
      url: data.secure_url,
      width: data.width,
      height: data.height,
    });

    setLoading(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const {
      title,
      description,
      price,
      dimensions,
      category,
      specifications,
      brand,
      published,
      inStock,
      colour,
    } = Object.fromEntries(new FormData(e.currentTarget));

    if (
      typeof title !== "string" ||
      typeof description !== "string" ||
      typeof price !== "string" ||
      typeof dimensions !== "string" ||
      typeof colour !== "string" ||
      typeof category !== "string" ||
      typeof brand !== "string" ||
      typeof specifications !== "string"
    ) {
      throw new Error("Enter valid title or description");
    }

    const slug = slugify(title, {
      replacement: "_",
      lower: true,
      trim: true,
    });

    const { data, error } = await supabase
      .from("products")
      .update([
        {
          title,
          description,
          slug,
          image: imageData,
          price,
          dimensions,
          colour,
          category,
          brand,
          specifications,
          published: productData.published,
          inStock: productData.inStock,
        },
      ])
      .eq("id", productData.id)
      .select("*");

    console.log({ data, error });

    if (error) {
      alert(`${error.details}`);
      setLoading(false);
    }
    setLoading(false);
    alert('Success')
    router.push(`/admin/products`);
  };

  return (
    <Dashboard>
      <Head>
        <title> Product</title>
      </Head>
      <div className="w-full">
        <h1 className="font-bold text-4xl text-teal-700">{product.title}</h1>
        <div className="w-full flex items-center justify-between gap-3">
          <form
            className="mt-6 p-8 w-2/3 border border-dashed rounded-lg"
            onSubmit={handleImageUpload}
          >
            <div className="flex flex-col space-y-2">
              <label
                htmlFor="image"
                className="text-lg text-gray-600 font-medium"
              >
                Upload Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                className="outline-none text-xs"
              />
            </div>
            <button className="bg-teal-700 px-6 py-1 rounded-md text-white font-medium mt-2">
              {loading ? "Loading" : "Save Image"}
            </button>
          </form>
          <div className="flex-1 w-1/3 p-10">
            {productData.image !== null && (
              <Image
                src={productData.image.url}
                width={productData.image.width}
                height={productData.image.height}
                alt={productData.title}
                className="w-full object-cover aspect-square"
              />
            )}
          </div>
        </div>

        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200" />
          </div>
        </div>

        <h2 className="text-slate-700 my-4 text-xl font-medium">
          Product Details
        </h2>

        <form onSubmit={handleSubmit} className="w-2/3">
          <div className="flex items-center justify-between">
            <div className="flex flex-col space-y-2">
              <p className="font-medium text-xl text-slate-800">Published</p>
              <Switch
                checked={productData.published}
                onChange={() =>
                  setProductData({
                    ...productData,
                    published: !productData.published,
                  })
                }
                className={`${
                  productData.published ? "bg-teal-600" : "bg-red-700"
                }
          relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
              >
                <span className="sr-only">Published</span>
                <span
                  aria-hidden="true"
                  className={`${
                    productData.published ? "translate-x-9" : "translate-x-0"
                  }
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
              </Switch>
            </div>
            <div className="flex flex-col space-y-2">
              <p className="font-medium text-xl text-slate-800">Featured</p>
              <Switch
                checked={productData.featured}
                onChange={() =>
                  setProductData({
                    ...productData,
                    featured: !productData.featured,
                  })
                }
                className={`${
                  productData.featured ? "bg-teal-600" : "bg-red-700"
                }
          relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
              >
                <span className="sr-only">Featured</span>
                <span
                  aria-hidden="true"
                  className={`${
                    productData.featured ? "translate-x-9" : "translate-x-0"
                  }
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
              </Switch>
            </div>

            <div className="flex flex-col space-y-2">
              <p className="font-medium text-xl text-slate-800">In Stock</p>
              <Switch
                checked={productData.inStock}
                onChange={() =>
                  setProductData({
                    ...productData,
                    inStock: !productData.inStock,
                  })
                }
                className={`${
                  productData.inStock ? "bg-teal-600" : "bg-red-700"
                }
          relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
              >
                <span className="sr-only">In Stock</span>
                <span
                  aria-hidden="true"
                  className={`${
                    productData.inStock ? "translate-x-9" : "translate-x-0"
                  }
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
              </Switch>
            </div>
          </div>

          <div className="grid grid-cols-6 gap-3 mt-6">
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Product Title
              </label>
              <input
                type="text"
                name="title"
                value={productData.title}
                onChange={(e) =>
                  setProductData({ ...productData, title: e.target.value })
                }
                id="title"
                autoComplete="product-title"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div className="col-span-6 ">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Product Description
              </label>
              <textarea
                rows={4}
                name="description"
                id="description"
                value={productData.description}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    description: e.target.value,
                  })
                }
                autoComplete="product-name"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              ></textarea>
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Product price
              </label>
              <input
                type="number"
                name="price"
                value={productData.price}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    price: parseInt(e.target.value),
                  })
                }
                id="price"
                autoComplete="product-price"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="dimensions"
                className="block text-sm font-medium text-gray-700"
              >
                Product dimensions
              </label>
              <input
                type="text"
                name="dimensions"
                id="dimensions"
                value={productData.dimensions}
                onChange={(e) =>
                  setProductData({ ...productData, dimensions: e.target.value })
                }
                autoComplete="product-dimensions"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="specifications"
                className="block text-sm font-medium text-gray-700"
              >
                Product specifications
              </label>
              <input
                type="text"
                name="specifications"
                id="specifications"
                value={productData.specifications}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    specifications: e.target.value,
                  })
                }
                autoComplete="product-specifications"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="colour"
                className="block text-sm font-medium text-gray-700"
              >
                Product colour
              </label>
              <input
                type="text"
                name="colour"
                id="colour"
                value={productData.colour}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    colour: e.target.value,
                  })
                }
                autoComplete="product-colour"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="brand"
                className="block text-sm font-medium text-gray-700"
              >
                Brand
              </label>
              <select
                id="brand"
                name="brand"
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              >
                <option value={product?.brand?.id}>
                  {product?.brand?.title}
                </option>
                {isSuccess &&
                  brands.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.title}
                    </option>
                  ))}
              </select>
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              >
                <option value={product?.category?.id}>
                  {product?.category?.title}
                </option>
                {isSuccess &&
                  categoryQuery.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.title}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <button
            className="bg-teal-700 text-white font-medium text-lg px-10 py-2 mt-3 rounded-lg"
            disabled={loading}
          >
            {loading ? "Loading" : "Submit"}
          </button>
        </form>
      </div>
    </Dashboard>
  );
};
export default Add;

export async function getServerSideProps({
  req,
  res,
  params:{slug}
}: {
  req: NextApiRequest;
  res: NextApiResponse;
  params:{slug:string}
}) {
  const categories = await getCategories();
  const product = await getProduct(slug)
   const brands = await getBrands();

  return {
    props: {
      categories,
      product,
      brands
    }, // will be passed to the page component as props
  };
}
