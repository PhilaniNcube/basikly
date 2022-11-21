import { Noto_Sans } from "@next/font/google";
import { FormEvent, useState } from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";

const noto_sans = Noto_Sans({
  display: "swap",
  weight: ["400", "800"],
});

const signUp = () => {

    const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  const [loading, setLoading] = useState(false)

const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  setLoading(true)

  const { first_name, last_name, email, password } = Object.fromEntries(
    new FormData(e.currentTarget)
  );
  console.log({ first_name, last_name, email, password });

  if(typeof first_name !== 'string' || typeof last_name !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
    throw new Error('Please submit valid data')
  }

  let { data, error } = await supabaseClient.auth.signUp({
    password,
    email,
    options: {
      data: {
       first_name,
       last_name,
      },
    },
  });

  console.log({data, error})

  if(error) {
    alert('There was an error signing up!')
  } else if (data) {
    alert('Please check your email address to confirm your sign up.')
  }

  setLoading(false)
}


  return (
    <div
      className={`flex px-4 items-center justify-center h-[90vh] ${noto_sans.className}`}

    >
      <div className="max-w-7xl mx-auto mt-8 w-full h-[90%] grid grid-cols-2 rounded-2xl shadow-lg overflow-hidden">
        <div className="w-full pt-16 px-4 lg:px-16 bg-slate-100 col-span-2 md:col-span-1">
          <h1 className="font-bold text-slate-800 text-3xl md:text-4xl lg:text-6xl">Sign Up</h1>
          <form onSubmit={handleSubmit} className="w-full mt-20">
            <div className="flex flex-col">
              <label className="text-md text-slate-600 font-bold" htmlFor="first_name">
                First Name
              </label>
              <input type="text" id="first_name" name="first_name" className="border border-slate-500 rounded w-3/4 outline-none px-2 py-2 focus:outline-none" required aria-required autoComplete="first-name" />
            </div>
            <div className="flex flex-col mt-2">
              <label className="text-md text-slate-600 font-bold" htmlFor="last_name">
                Last Name
              </label>
              <input type="text" id="last_name" name="last_name" className="border border-slate-500 rounded w-3/4 outline-none px-2 py-2 focus:outline-none" required aria-required autoComplete="last_name" />
            </div>
            <div className="flex flex-col mt-2">
              <label className="text-md text-slate-600 font-bold" htmlFor="email">
                Email
              </label>
              <input type="email" id="email" name="email" className="border border-slate-500 rounded w-3/4 outline-none px-2 py-2 focus:outline-none" required aria-required autoComplete="email" />
            </div>
            <div className="flex flex-col mt-2">
              <label className="text-md text-slate-600 font-bold" htmlFor="password">
                Password
              </label>
              <input type="password" id="password" name="password" className="border border-slate-500 rounded w-3/4 outline-none px-2 py-2 focus:outline-none" required aria-required autoComplete="password" />
            </div>

            <button disabled={loading} type="submit" className="px-6 py-2 w-1/2 rounded text-white bg-teal-700 font-bold uppercase mt-4">{loading ? 'Loading' : 'Register'}</button>
          </form>
        </div>
        <div className="hidden md:flex flex-col w-full bg-teal-700 h-full"></div>
      </div>
    </div>
  );
};
export default signUp;
