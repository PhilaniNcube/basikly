import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import FeaturedProducts from '../components/HomePage/FeaturedProducts'
import Hero from '../components/HomePage/Hero'
import Offers from '../components/HomePage/Offers'
import ProductFeatures from '../components/HomePage/ProductFeatures'
import StorySection from '../components/HomePage/StorySection'
import TabletFeature from '../components/HomePage/TabletFeature'
import { manrope } from '../components/Shared/Navbar'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Basikly Everything</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={manrope.className}>
        <Hero />
        <Offers />
        <FeaturedProducts />
      </main>
    </>
  );
}




export default Home
