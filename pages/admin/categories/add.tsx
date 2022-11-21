import Head from "next/head";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import slugify from "slugify";
import Dashboard from "../../../components/Shared/Dashboard";

const uploadPreset : string = process.env.NEXT_PUBLIC_UPLOAD_PRESET || ""

const add = () => {

   const [supabaseClient] = useState(() => createBrowserSupabaseClient());
   const router = useRouter();

const [loading, setLoading] = useState(false)
const [imageData, setImageData] = useState({})

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

       const { title, description } = Object.fromEntries(new FormData(e.currentTarget));

       if(typeof title !== 'string' || typeof description !== 'string') {
        throw new Error('Enter valid title or description')
       }

       const slug = slugify(title, {
         replacement: "_",
         lower: true,
         trim: true,
       });

       const { data, error } = await supabaseClient
         .from("categories")
         .insert([{ title, description, slug, image: imageData }]).select('*');

         console.log({data, error})

         router.reload();

  }

  return (
    <Dashboard>
      <Head>
        <title>Create Category</title>
      </Head>
      <div className="w-full">
        <h1 className="font-bold text-4xl text-teal-700">Create A Category</h1>
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

        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200" />
          </div>
        </div>

        <h2 className="text-slate-700 text-xl font-medium">Category Details</h2>

        <form onSubmit={handleSubmit} className="w-2/3">
          <div className="grid grid-cols-6 gap-3 mt-6">
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Category Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                autoComplete="product-name"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div className="col-span-6 ">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Category Description
              </label>
              <textarea
                rows={4}
                name="description"
                id="description"
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
export default add;
