import {Noto_Sans, Manrope} from "@next/font/google"
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";



export  const manrope = Manrope({
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"]
})

const noto_sans = Noto_Sans({
  display: "swap",
  weight: ["400", "500" , "600" , "700", "800", "900"],
  subsets: ["latin"],
})


const Navbar = () => {

  const router = useRouter()

  const [open, setOpen] = useState(false)


const links = [
  {
    id: 1,
    title: "Appliances",
    href: "/categories/appliances",
    active: router.asPath === "/categories/appliances",
  },
  {
    id: 2,
    title: "Computing",
    href: "/categories/computing",
    active: router.asPath === "/categories/computing",
  },
  {
    id: 3,
    title: "TV & Audio",
    href: "/categories/tv_and_audio",
    active: router.asPath === "/categories/tv_and_audio",
  },
  {
    id: 4,
    title: "Gaming",
    href: "/categories/gaming",
    active: router.asPath === "/categories/gaming",
  },
  {
    id: 5,
    title: "Phones",
    href: "/categories/phones",
    active: router.asPath === "/categories/phones",
  },
];

  return (
    <header className={`z-50 w-full ${noto_sans.className}`}>
      {/*****Desktop Nav *****/}
      <div className="hidden lg:block">
        <div className="bg-slate-300 w-full px-5 py-2 flex justify-end space-x-3 text-sm text-slate-900">
          <Link href="/help">Help & Support</Link>
          <Link href="/tracking">Track My Order</Link>
          <Link href="/returns">Returns</Link>
          <Link href="/sign-in">Sign In</Link>
          <Link href="/sign-up">Register</Link>
        </div>
        <nav className="w-full py-4 px-4 bg-slate-100">
          <div className="flex max-w-7xl gap-8 mx-auto items-center">
            <Link
              href="/"
              className="text-xl font-bold text-blue-50 px-2 w-fit aspect-square rounded-full bg-teal-700 flex items-center justify-center"
            >
              Basikl-E
            </Link>
            <div className="flex flex-col ">
              <form className="relative isolate">
                <input
                  type="text"
                  id="query"
                  name="query"
                  className="border border-slate-400 rounded-full w-[25vw] py-2 px-4"
                  placeholder="Looking for something?"
                />
                <button type="submit" className="sr-only"></button>
              </form>
              <div className="flex mt-2 items-center space-x-3">
                {links.map((link) => (
                  <Link
                    href={link.href}
                    key={link.id}
                    className={`${
                      link.active ? "text-teal-700 font-bold" : "text-slate-700"
                    } text-md`}
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex justify-end flex-1 items-center space-x-16">
              <Link
                href="/account"
                className="flex flex-col items-center space-y-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1}
                  stroke="currentColor"
                  className="w-6 h-6 text-slate-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
                <p className="text-sm text-slate-600">Account</p>
              </Link>
              <Link
                href="/cart"
                className="flex flex-col items-center space-y-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1}
                  stroke="currentColor"
                  className="w-6 h-6 text-slate-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>

                <p className="text-sm text-slate-600">Cart</p>
              </Link>
            </div>
          </div>
        </nav>
      </div>
      {/*****Desktop Nav Ends *****/}

      {/*****Mobile Nav Begins*****/}
      <div className="md:hidden px-4 flex flex-col py-3">
        <nav className="flex justify-between items-center">
          <Link
            href="/"
            className="w-fit px-2 text-md text-white flex items-center justify-center bg-teal-700 font-bold aspect-square rounded-full"
          >
            Basikl-e
          </Link>
          <ul className="flex space-x-2">
            <Link
              href="/account"
              className="flex flex-col items-center space-y-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="currentColor"
                className="w-6 h-6 text-slate-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
              <p className="text-sm text-slate-600">Account</p>
            </Link>
            <Link href="/cart" className="flex flex-col items-center space-y-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="currentColor"
                className="w-6 h-6 text-slate-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>

              <p className="text-sm text-slate-600">Cart</p>
            </Link>
          </ul>

          <div>
            <svg
              onClick={() => setOpen(true)}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 text-slate-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
            {open && (
              <MotionConfig
                transition={{ duration: 5, ease: [0.32, 0.72, 0, 1] }}
              >
                <AnimatePresence initial={false}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full absolute z-20 inset-0 bg-slate-600/30 h-screen overflow-hidden"
                  >
                    <motion.nav
                      initial={{ translateX: "120%" }}
                      animate={{ translateX: "0%" }}
                      exit={{ translateX: "120%" }}
                      className="w-[95%] mx-auto  py-1 my-2 rounded-lg bg-white"
                    >
                      <div className="border-b border-slate-500 py-2 flex justify-end items-center">
                        <svg
                          onClick={() => setOpen(false)}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-8 h-8 text-red-600"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </div>
                      <div
                        onClick={() => setOpen(false)}
                        className="flex px-4 py-3 flex-col w-full space-y-2"
                      >
                        {links.map((link) => (
                          <Link
                            key={link.id}
                            href={link.href}
                            className="text-slate-600 font-medium"
                          >
                            {link.title}
                          </Link>
                        ))}
                      </div>
                    </motion.nav>
                  </motion.div>
                </AnimatePresence>
              </MotionConfig>
            )}
          </div>
        </nav>{" "}
        <form className="relative isolate w-full mt-4">
          <input
            type="text"
            id="query"
            name="query"
            className="border border-slate-400 rounded-full w-full py-2 px-4"
            placeholder="Looking for something?"
          />
          <button
            type="submit"
            className="bg-teal-700 rounded-full my-1 mr-1 px-4 bottom-0 absolute top-0 right-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </form>
      </div>
    </header>
  );
};
export default Navbar;
