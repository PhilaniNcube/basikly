import Image from "next/image";
import Link from "next/link";
import { manrope } from "../Shared/Navbar";

const ProductFeatures = () => {
  return (
    <section className={`py-10 ${manrope.className}`}>
      <div className="max-w-7xl mx-auto">
        <div className="w-full rounded overflow-hidden relative isolate">
          <Image
            src="/images/macbook.jpg"
            width={2000}
            height={992}
            alt="Macbook"
            className="w-full object-cover aspect-[7/2]"
          />
          <article className="absolute inset-0 flex flex-col justify-center p-10 lg:p-20">
            <h3 className="text-black text-2xl md:text-4xl lg:text-5xl font-bold uppercase">
              Macbook Air M2
            </h3>
            <Link
              href="/products/macbook_pro_13_inch_m2_space_gray"
              className="px-8 py-2 w-fit bg-black text-white text-xl uppercase font-medium mt-6 rounded"
            >
              See Product
            </Link>
          </article>
        </div>

        <div className="w-full rounded grid grid-cols-1 md:grid-cols-2 gap-8 overflow-hidden relative isolate mt-8">
          <Image
            src="/images/smartphone.jpg"
            width={1500}
            height={1000}
            alt="Smartphone"
            className="w-full object-cover aspect-video rounded"
          />
          <div className="w-full aspect-video rounded bg-slate-200 p-10 lg:p-20 flex flex-col justify-center">
            <h3 className="text-black font-bold text-2xl lg:text-4xl uppercase">
              iPhone Pro/Plus
            </h3>
            <Link
              href="/products/iphone_14_pro_128gb_gold"
              className="px-8 py-2 w-fit bg-black text-white text-xl  uppercase font-medium mt-8 rounded"
            >
              See Product
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ProductFeatures;
