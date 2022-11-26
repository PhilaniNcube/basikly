import Image from "next/image";
import Link from "next/link";
import { manrope } from "../Shared/Navbar";
import {motion, MotionConfig} from 'framer-motion'

const Hero = () => {
  return (
    <MotionConfig transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}>
      <section className="w-full lg:h-screen overflow-hidden rounded-b-lg bg-black py-12">
        <div
          className={`max-w-7xl mx-auto px-4 grid grid-cols-2 relative ${manrope.className}`}
        >
          <motion.div initial={{scaleX: 0}} animate={{scaleX: 1}} className="w-full flex flex-col col-span-2 lg:col-span-1 col-start-1 justify-center text-center lg:text-start items-center lg:items-start z-30">
            <p className="text-lg text-slate-400 uppercase tracking-widest">
              Now In Stock
            </p>
            <h1 className="text-slate-100 font-bold uppercase text-3xl md:text-5xl lg:text-7xl">
              Iphone 14 Pro 256GB
            </h1>
            <p className="text-lg md:text-xl text-slate-50 lg:text-slate-500 mt-4 leading-7 tracking-wider">
              Apple iPhone Pro 256GB, Dual SIM, IP68 dust/water resistant, Super
              Retina XDR OLED, HDR10, Dolby Vision, 800 nits. Triple Main Camera
              - 48 MP, f/1.8, 24mm (wide), 12 MP (telephoto), 3x optical zoom,
              12 MP, 120˚ ultrawide. Selfie Camera - 12 MP
            </p>

            <Link
              href="/products"
              className="w-fit px-12 py-4 mt-4 rounded bg-brown hover:bg-light-brown text-white text-lg uppercase"
            >
              Shop Now
            </Link>
          </motion.div>
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: "0%", opacity: 1 }}
            className="w-full absolute inset-0 lg:static col-span-2 lg:col-span-1 col-start-1 z-20 lg:col-start-2"
          >
            <Image
              src="/iphone_14_pro.png"
              width={1000}
              height={1000}
              className="aspect-square w-full object-cover"
              alt="iPhone 14 Pro"
            />
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
};
export default Hero;
