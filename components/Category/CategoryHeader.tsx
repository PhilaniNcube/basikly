import { manrope } from "../Shared/Navbar";

const CategoryHeader = ({category}:{category:string}) => {
  return (
    <header className={`bg-black pt-44 pb-20 mb-5 ${manrope.className}`}>
      <div className="px-4 max-w-7xl mx-auto flex justify-center">
        <h1 className="text-white text-3xl md:text-5xl font-medium uppercase tracking-wider">
          {category}
        </h1>
      </div>
    </header>
  );
};
export default CategoryHeader;
