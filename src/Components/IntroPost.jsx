import React from 'react'
import { useNavigate } from 'react-router-dom'
import makroIpa from '../assets/Materi/makro-ipa'

function IntroPost({ selectedCategory = 'All' }) {
  const navigate = useNavigate();

  const getImageUrl = (imageName) => {
    try {
      return new URL(`../assets/Materi/Images/${imageName}`, import.meta.url).href;
    } catch (error) {
      console.error('Error loading image:', imageName, error);
      return 'https://via.placeholder.com/600x400?text=Image+Not+Found';
    }
  };

  const openARPage = (url_ar) => {
    window.location.href = `/AR/${url_ar}.html`;
  };


  const filteredData = selectedCategory === 'All' 
    ? makroIpa 
    : makroIpa.filter(item => item.category === selectedCategory);

  return (
    <div className='mt-10 px-10 md:px-15 lg:px-32'>
      {filteredData.length > 0 ? (
        filteredData.map((item, index) => (
          <div 
            key={index}
            className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-10'
          >
      
            <img 
              src={getImageUrl(item.image)} 
              alt={item.name}
              className='rounded-2xl object-cover w-full h-full cursor-pointer hover:opacity-90 transition-opacity' 
              onClick={() => navigate(`/intro-detail/${item.name}`)}
            />

           
            <div>
              <h4 className='text-red-500 font-semibold'>{item.category}</h4>

              <h2 className='text-[23px] font-bold mt-5'>{item.name}</h2>

              <h4 className='line-clamp-6 text-gray-400 mt-5 leading-relaxed'>
                {item.description}
              </h4>

              <div className='flex items-center mt-5'>
                <button 
                  className='bg-red-500 rounded-full text-white flex items-center text-[14px] px-6 py-2 hover:bg-red-600 transition-colors'
                  onClick={(e) => {
                    e.stopPropagation();
                    openARPage(item.url_ar);
                  }}
                >
                  Mulai AR
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className='text-center py-20'>
          <p className='text-gray-500 text-lg'>Tidak ada data untuk kategori ini</p>
        </div>
      )}
    </div>
  )
}

export default IntroPost