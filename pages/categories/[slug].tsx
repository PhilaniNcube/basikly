import { NextApiRequest, NextApiResponse } from "next";
import Head from "next/head";
import { Fragment } from "react";
import CategoryHeader from "../../components/Category/CategoryHeader";
import CategoryProductGrid from "../../components/Category/CategoryProductGrid";

import StorySection from "../../components/HomePage/StorySection";
import { Category, getCategoryBySlug } from "../../lib/getCategories";
import { getProductByCategoryId, Product } from "../../lib/getProducts";

const Category = ({ category, products }: { category :Category, products: Product[]}) => {

  console.log({category, products})

  return (
    <Fragment>
      <Head>
        <title>Category</title>
      </Head>
      <CategoryHeader category={category.title} />
      <CategoryProductGrid products={products} />

      <StorySection />
    </Fragment>
  );
};
export default Category;

export async function getServerSideProps({
  req,
  res,
  params: { slug },
}: {
  req: NextApiRequest;
  res: NextApiResponse;
  params: { slug: string };
}) {
  const category = await getCategoryBySlug(slug);

  const products = await getProductByCategoryId(category.id)


  return {
    props: {
      category,
      products,
    }, // will be passed to the page component as props
  };
}

