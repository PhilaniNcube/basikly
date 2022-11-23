import Image from "next/image";
import Link from "next/link";

const CategorySection = () => {

  const categories = [
    {
      id: 1,
      title: "Cellphones",
      href: "/categories/cellphones",
      image: "/iphone_14_pro.png",
    },
    {
      id: 2,
      title: "Tablets",
      href: "/categories/tablets",
      image: "/images/ipad_pro.webp",
    },
    {
      id: 3,
      title: "Laptops",
      href: "/categories/laptops",
      image: "/images/macbook_air.png",
    },
  ];

  return (
    <section className="py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
        {categories.map((item) => (
          <div
            key={item.id}
            className="relative w-full flex flex-col items-center"
          >
            <Image
              src={`${item.image}`}
              width={500}
              height={500}
              alt={item.title}
              className="w-3/4 object-cover aspect-square z-30"
            />
            <div className="w-full rounded pt-20 pb-10 z-10 shadow-md -translate-y-20 flex flex-col items-center bg-slate-200">
              <p className="text-slate-600 font-medium text-2xl mb-3 uppercase">
                {item.title}
              </p>
              <div className="flex w-full justify-center items-center text-brown space-x-1">
                <Link
                  href={item.href}
                  className="text-brown text-xl uppercase font-medium"
                >
                  Shop
                </Link>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
export default CategorySection;
