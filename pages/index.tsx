import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import CategorySection from '../components/HomePage/CategorySection'
import Hero from '../components/HomePage/Hero'
import ProductFeatures from '../components/HomePage/ProductFeatures'
import StorySection from '../components/HomePage/StorySection'
import TabletFeature from '../components/HomePage/TabletFeature'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Basikly Everything</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
      <CategorySection />
      <TabletFeature/>
      <ProductFeatures />
      <StorySection />
    </>
  )
}

export default Home
