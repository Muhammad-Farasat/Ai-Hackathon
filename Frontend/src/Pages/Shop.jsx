import React, { useEffect, useRef } from 'react'
import Hero from '../Components/Hero/Hero'
import Popular from '../Components/Popular/Popular'
import NewCollection from '../Components/NewCollection/NewCollection'
import Footer from '../Components/Footer/Footer'
import WhyUs from '../Components/WhyUs/WhyUs'

function Shop() {


return (
    <>
      <Hero />
      <Popular />
      <NewCollection />
      <WhyUs />
      <Footer />
    </>
  )
}

export default Shop