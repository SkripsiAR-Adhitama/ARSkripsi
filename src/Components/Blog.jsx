import React from 'react'
import { useNavigate } from 'react-router-dom'
import materiIpa from '../assets/Materi/materi-ipa'

function Blog({ selectedCategory = 'All', searchTerm = '' }) {
  const navigate = useNavigate();
  
  const getImageUrl = (imageName) => {
    return new URL(`../assets/Materi/Images/${imageName}`, import.meta.url).href
  }

  const openARPage = (url_ar) => {
    window.location.href = `/AR/${url_ar}.html`;
  }

  const filteredData = materiIpa.filter((item) => {
    const matchCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10 px-10 md:px-15 lg:px-32'>
      {filteredData.length > 0 ? (
        filteredData.map((item, index) => (
          <div key={index} className='m-4'>
            <img 
              src={getImageUrl(item.image)} 
              alt={item.name}
              className='w-full rounded-2xl object-cover h-[200px] cursor-pointer hover:opacity-90 transition-opacity' 
              onClick={() => navigate(`/blog-detail/${item.name}`)} 
            />
            <h3 className='text-red-500 mt-3 font-semibold'>{item.category}</h3>
            <h3 className='font-bold mt-3'>{item.name}</h3>
            <h3 className='line-clamp-3 text-gray-400 mt-3'>{item.description}</h3>
            <div className='ml-2 flex justify-end mt-3'>
              <button 
                className='bg-red-500 rounded-full text-white flex items-center text-[14px] px-4 py-2 hover:bg-red-600 transition-colors'
                onClick={(e) => {
                  e.stopPropagation();
                  openARPage(item.url_ar);
                }}
              >
                Mulai AR
              </button>   
            </div>
          </div>
        ))
      ) : (
        <div className='col-span-full text-center py-20'>
          <p className='text-gray-500 text-lg'>😔 Tidak ada materi ditemukan</p>
          <p className='text-gray-400 text-sm mt-2'>Coba ubah filter atau kata kunci pencarian</p>
        </div>
      )}
    </div>
  )
}

export default Blog