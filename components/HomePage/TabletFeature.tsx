import Image from "next/image";
import Link from "next/link";
import { manrope } from "../Shared/Navbar";

const TabletFeature = () => {
  return (
    <section className={`py-10 ${manrope.className}`}>
      <div className="max-w-7xl mx-auto px-4 rounded-md bg-brown grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        <Image
          src="/images/ipad_pro.webp"
          className="w-full object-cover"
          height={1000}
          width={1000}
          alt="Ipad"
        />
        <div className="w-full p-10 lg:p-20 flex flex-col justify-center">
          <h2 className="text-white text-3xl lg:text-6xl font-bold uppercase">
            Ipad Pro <br />
            Wifi+Cellular
          </h2>
          <p className="text-slate-100 text-lg lg:text-xl leading-7 mt-8 tracking-wider">
            Apple iPad Pro M1 (Wifi + SIM), 2TB, Liquid Retina XDR mini-LED LCD
          </p>

          <Link href="/products/ipad_pro_12.9_m1_space_gray_2tb" className="bg-slate-700 text-white text-xl uppercase px-8 py-3 rounded w-fit mt-8">View Product</Link>
        </div>
      </div>
    </section>
  );
};
export default TabletFeature;
