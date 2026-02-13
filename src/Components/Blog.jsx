import React from 'react'
import { useNavigate } from 'react-router-dom'
import materiIpa from '../assets/Materi/materi-ipa'

function Blog() {
  const navigate = useNavigate();
  
  const getImageUrl = (imageName) => {
    return new URL(`../assets/Materi/Images/${imageName}`, import.meta.url).href
  }

   const openARPage = (url_ar) => {
    window.location.href = `/AR/${url_ar}.html`;
  }
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10 px-10 md:px-15 lg:px-32'>
      {materiIpa.map((item, index) => (
        <div key={index} className='m-4'>
           <img 
            src={getImageUrl(item.image)} 
            alt={item.name}
            className='w-full rounded-2xl object-cover h-[200px] cursor-pointer' 
            onClick={() => navigate(`/blog-detail/${item.name}`)} 
          />
          <h3 className='text-red-500 mt-3'>{item.category}</h3>
          <h3 className='font-bold mt-3'>{item.name}</h3>
          <h3 className='line-clamp-3 text-gray-400 mt-3'>{item.description}</h3>
          <div className='ml-2 flex justify-end mt-3'>
            <button 
            className='bg-red-500 rounded-full text-white flex items-center text-[14px] px-4 py-2'
            onClick={(e) => {
                e.stopPropagation();
                openARPage(item.url_ar);
              }}
            >
              Mulai AR
            </button>   
          </div>
        </div>
      ))}
    </div>
  )
}

export default Blog