import React from 'react'
import Header from '../Components/Header'
import Search from '../Components/Search'
import IntroPost from '../Components/IntroPost'
import Blog from '../Components/Blog'
import Footer from '../Components/Footer'
function Home() {
  return (
   <>
   <Search/>
   <IntroPost/>
   <Blog/>
   {/* <Footer/>  */}
   </>
  )
}

export default Home