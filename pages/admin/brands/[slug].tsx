import Head from "next/head";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import slugify from "slugify";
import Dashboard from "../../../components/Shared/Dashboard";
import { useQuery } from "@tanstack/react-query";
import {
  Category,
} from "../../../lib/getCategories";
import { NextApiRequest, NextApiResponse } from "next";
import supabase from "../../../utils/supabase";
import Image from "next/image";
import { Brand, getBrandBySlug } from "../../../lib/getBrands";

const uploadPreset: string = process.env.NEXT_PUBLIC_UPLOAD_PRESET || "";

const Add = ({ brand }: { brand: Brand }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [brandData, setBrandData] = useState(brand);





  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const { title, description } = Object.fromEntries(
      new FormData(e.currentTarget)
    );

    if (typeof title !== "string" || typeof description !== "string") {
      throw new Error("Enter valid title or description");
    }

    const slug = slugify(title, {
      replacement: "_",
      lower: true,
      trim: true,
    });

    const { data, error } = await supabase
      .from("brand")
      .update([
        {
          title,
          description,
          slug,
        },
      ]).eq("id", brandData.id).select("*");

    console.log({ data, error });

    if (error) {
      alert(`${error.details}`);
      setLoading(false);
      return
    }
    setLoading(false);
    alert("Success");
    router.push(`/admin/brands`);
  };

  return (
    <Dashboard>
      <Head>
        <title> Brand</title>
      </Head>
      <div className="w-full">
        <h1 className="font-bold text-4xl text-teal-700">{brand.title}</h1>

        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200" />
          </div>
        </div>

        <h2 className="text-slate-700 my-4 text-xl font-medium">
          Brand Details
        </h2>

        <form onSubmit={handleSubmit} className="w-2/3">
          <div className="flex items-center justify-between"></div>

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
                value={brandData.title}
                onChange={(e) =>
                  setBrandData({ ...brandData, title: e.target.value })
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
                value={brandData.description}
                onChange={(e) =>
                  setBrandData({
                    ...brandData,
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
  const brand = await getBrandBySlug(slug);

  return {
    props: {
      brand,
    }, // will be passed to the page component as props
  };
}
