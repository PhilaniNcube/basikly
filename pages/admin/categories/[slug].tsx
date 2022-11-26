import Head from "next/head";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import slugify from "slugify";
import Dashboard from "../../../components/Shared/Dashboard";
import { useQuery } from "@tanstack/react-query";
import { Category, getCategories, getCategoryBySlug } from "../../../lib/getCategories";
import { NextApiRequest, NextApiResponse } from "next";
import supabase from "../../../utils/supabase";
import { getProduct, Product } from "../../../lib/getProducts";
import { Switch } from "@headlessui/react";
import Image from "next/image";

const uploadPreset: string = process.env.NEXT_PUBLIC_UPLOAD_PRESET || "";

const Add = ({
  category,

}: {
  category: Category;

}) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [imageData, setImageData] = useState(category.image);

  const [categoryData, setCategoryData] = useState(category);

  console.log({ category: setCategoryData });



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

    } = Object.fromEntries(new FormData(e.currentTarget));

    if (
      typeof title !== "string" ||
      typeof description !== "string"
    ) {
      throw new Error("Enter valid title or description");
    }

    const slug = slugify(title, {
      replacement: "_",
      lower: true,
      trim: true,
    });

    const { data, error } = await supabase
      .from("categories")
      .update([
        {
          title,
          description,
          slug,
          image: imageData,

        },
      ])
      .eq("id", categoryData.id)
      .select("*");

    console.log({ data, error });

    if (error) {
      alert(`${error.details}`);
      setLoading(false);
    }
    setLoading(false);
    alert("Success");
    router.push(`/admin/categories`);
  };

  return (
    <Dashboard>
      <Head>
        <title> Product</title>
      </Head>
      <div className="w-full">
        <h1 className="font-bold text-4xl text-teal-700">{category.title}</h1>
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
                accept="image/*"
                className="outline-none text-xs"
              />
            </div>
            <button className="bg-teal-700 px-6 py-1 rounded-md text-white font-medium mt-2">
              {loading ? "Loading" : "Save Image"}
            </button>
          </form>
          <div className="flex-1 w-1/3 p-10">
            {categoryData.image !== null && (
              <Image
                src={categoryData.image.url}
                width={categoryData.image.width}
                height={categoryData.image.height}
                alt={categoryData.title}
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
                value={categoryData.title}
                onChange={(e) =>
                  setCategoryData({ ...categoryData, title: e.target.value })
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
                value={categoryData.description}
                onChange={(e) =>
                  setCategoryData({
                    ...categoryData,
                    description: e.target.value,
                  })
                }
                autoComplete="product-name"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              ></textarea>
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
  params: { slug },
}: {
  req: NextApiRequest;
  res: NextApiResponse;
  params: { slug: string };
}) {
  const category = await getCategoryBySlug(slug);


  return {
    props: {
      category,
    }, // will be passed to the page component as props
  };
}
