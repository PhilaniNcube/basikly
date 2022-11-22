import Image from "next/image";
import { manrope } from "../Shared/Navbar";

const StorySection = () => {
  return (
    <section className={`${manrope.className} py-8`}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="w-full flex flex-col justify-center p-10 md:p-20 bg-slate-200 rounded">
          <h3 className="text-black text-2xl lg:text-4xl font-bold uppercase">
            Bringing the newest <span className="text-brown">tech</span> to you.
          </h3>
          <p className="text-md lg:text-lg font-medium text-slate-600 mt-8">We are based in Harare and can deliver all over the city. If there is anything you need you cannot find here we can ge it for you because we can do <span className="text-brown font-extrabold">Basikly Everything</span></p>
        </div>

        <Image alt="Devices" src="/images/devices.jpg" width={1360} height={2000} className="w-full rounded aspect-square object-cover" />
      </div>
    </section>
  );
};
export default StorySection;
