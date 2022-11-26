import Link from "next/link";
import { useRouter } from "next/router";
import Dashboard from "../../../components/Shared/Dashboard";
import { Brand, getBrandBySlug, getBrands } from "../../../lib/getBrands";
import supabase from "../../../utils/supabase";

const Brands = ({brands}:{brands: Brand[]}) => {

  const router = useRouter()

  const create = async () => {

  const { data, error } = await supabase
    .from("brand")
    .insert([
      {
        slug: Math.random(),
        title: "Draft Brand",
        description: "",
      },
    ])
    .select("*").single();

    console.log({error, data})

    router.push(`/admin/brands/${data?.slug}`)

  }


  return (
    <Dashboard>
      <div className="flex justify-end items-center">
        <button
          onClick={create}
          className="bg-teal-700 rounded px-4 py-2 text-white font-medium"
        >
          Add Brand
        </button>
      </div>

      <div className="w-full mt-4">
        <table className="w-full whitespace-nowrap">
          <thead>
            <tr className="h-20 w-full text-sm leading-none text-gray-600">
              <th className="font-normal text-left pl-11">Title</th>

              <th className="font-normal text-left w-32">Actions</th>
            </tr>
          </thead>
          <tbody className="w-full">
            {brands?.map((brand, i) => {
              return (
                <tr
                  key={brand.id}
                  className="h-20 text-sm leading-none text-gray-700 border-b border-t border-gray-200 bg-white hover:bg-gray-100"
                >
                  <td className="pl-11">
                    <div className="flex items-center">{brand.title}</div>
                  </td>

                  <td>
                    <div className="flex items-center">
                      <Link
                        href={`/admin/brands/${brand.slug}`}
                        className="bg-blue-700 font-bold mr-3 hover:bg-blue-500 py-2.5 px-5 rounded text-sm leading-3 focus:outline-none text-white uppercase"
                      >
                        View
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Dashboard>
  );
};
export default Brands;


export async function getServerSideProps() {

  const brands = await getBrands()

  return {
    props: {
      brands
    }, // will be passed to the page component as props
  };
}
