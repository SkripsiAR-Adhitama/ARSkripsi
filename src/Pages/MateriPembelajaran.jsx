import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Search from '../Components/Search';
import IntroPost from '../Components/IntroPost';
import Blog from '../Components/Blog';

function MateriPembelajaran() {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory = searchParams.get('category') || 'All';
  const searchTerm = searchParams.get('search') || '';

  const handleCategoryChange = (category) => {
    setSearchParams({ category: category});
  };


  return (
    <>
      <Search
        selectedCategory={selectedCategory} // 
        onCategoryChange={handleCategoryChange}
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
      
    </>
  );
}

export default MateriPembelajaran;