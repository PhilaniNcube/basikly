import Head from "next/head";
import { Fragment } from "react";
import ProductDetails from "../../components/Products/ProductDetails";
import getProducts, { getAllProducts, getProductBySlug, Product } from "../../lib/getProducts";


const Product = ({product}: {product:Product}) => {
  return <Fragment>
    <Head>
      <title>Product</title>
    </Head>
    <ProductDetails product={product}/>
  </Fragment>;
};
export default Product;

export const getStaticPaths = async () => {
  const products = await getAllProducts()

 const paths = products?.map((product) => ({
   params: { slug: product.slug },
 }));



  return {
    paths,
    fallback: 'blocking'
  }
}


export const getStaticProps = async ({params: {slug}}: {params: {slug:string}}) => {

  console.log(slug)

  const product = await getProductBySlug(slug)

  if(!product) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      product
    },

  }

};
