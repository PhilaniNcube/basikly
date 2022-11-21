import {Noto_Sans, Manrope} from "@next/font/google"
import Link from "next/link";
import { useRouter } from "next/router";


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



const links = [
  {
    id: 1,
    title: "Shop",
    href: "/shop",
    active: router.asPath === "/shop"
  },
  {
    id: 2,
    title: "cellphones",
    href: "/cellphones",
    active: router.asPath === "/cellphones"
  },
  {
    id: 3,
    title: "laptops",
    href: "/Laptops",
    active: router.asPath === "/laptops"
  },
  {
    id: 4,
    title: "tablets",
    href: "/tablets",
    active: router.asPath === "/tablets"
  },
]

  return (
    <header className={`py-4 px-4 z-50 w-full fixed top-0 left-0 right-0 bg-transparent ${noto_sans.className}`}>
      {/*****Desktop Nav */}
      <nav className="max-w-7xl mx-auto flex justify-between items-center border-b border-slate-400 pb-6">
        <Link href="/" className="font-bold text-white text-2xl uppercase">Basikly</Link>

        <ul className="flex space-x-4 items-center">
          {links.map((link) => (
            <Link
              href={link.href}
              key={link.id}
              className={`${
                link.active ? "text-slate-700" : "text-slate-600"
              }  text-lg uppercase`}
            >
              {link.title}
            </Link>
          ))}
        </ul>

        <div className="flex items-center space-x-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke="currentColor"
            className="w-10 h-10 text-slate-600 bg-red-200 rounded-full p-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
          <Link href="/sign-up">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="w-8 h-8 text-slate-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
          </Link>
        </div>
      </nav>
    </header>
  );
};
export default Navbar;
