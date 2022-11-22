import Link from "next/link";
import { useRouter } from "next/router";
import { manrope } from "./Navbar";

const Footer = () => {

  const date = new Date();

  const router = useRouter()

const links = [
  {
    id: 1,
    title: "Shop",
    href: "/shop",
    active: router.asPath === "/shop",
  },
  {
    id: 2,
    title: "cellphones",
    href: "/cellphones",
    active: router.asPath === "/cellphones",
  },
  {
    id: 3,
    title: "laptops",
    href: "/Laptops",
    active: router.asPath === "/laptops",
  },
  {
    id: 4,
    title: "tablets",
    href: "/tablets",
    active: router.asPath === "/tablets",
  },
];

  return (
    <footer className={`bg-black ${manrope.className}`}>
      <div className="max-w-7xl mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="w-full">
          <h3 className="text-white text-xl md:text-2xl font-extrabold">Basikly</h3>
          <p className="mt-6 text-slate-500 text-md md:text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati facere suscipit dolorum? Adipisci tempora quisquam ullam quae in laudantium minima cupiditate eveniet repellat nemo! Voluptatum?</p>

          <p className="text-sm text-slate-400 mt-3 lg:mt-8">Copyright &copy; {date.getFullYear()}. Designed by <Link href="https://athenamedia.co.za" className="underline">Athena Media</Link> </p>
        </div>
        <div className="w-full">
          <nav className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-3 text-md text-white">
            {links.map((item) => (
              <Link key={item.id} href={item.href} className="font-medium uppercase">{item.title}</Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
