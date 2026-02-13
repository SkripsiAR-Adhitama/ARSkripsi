import React, {useState} from 'react'
import Header from '../Components/Header'
import Search from '../Components/Search'
import IntroPost from '../Components/IntroPost'
import Blog from '../Components/Blog'
import Footer from '../Components/Footer'
function Home() {

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  return (
   <>
   <Search
    onCategoryChange={setSelectedCategory}
    onSearchChange={setSearchTerm}
    />
   
    <IntroPost
   selectedCategory={selectedCategory}
   />

    {selectedCategory !== 'All' && (
        <Blog 
          selectedCategory={selectedCategory}
          searchTerm={searchTerm}
        />
      )}
   {/* <Footer/>  */}
   </>
  )
}

export default Home