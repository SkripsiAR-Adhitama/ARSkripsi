import React from 'react'
import { useNavigate } from 'react-router-dom'

function Blog() {
  const navigate=useNavigate();
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
    mt-10 px-10 md:px-15 lg:px-32'>
      <div className='m-4 cursor-pointer'>
        <img src='' className='w-full rounded-2xl
        object-cover h-[200px]' onClick={()=>navigate('blog-detail')} />
          <h3 className='text-red-500 mt-3'> Daftar Organ</h3>
          <h3 className='font-bold mt-3'> Nama Organ</h3>
          <h3 className='line-clamp-3 text-gray-400 mt-3'> Deskrispi Organ</h3>
          <div className='ml-2 flex justify-end'>
               <button className='bg-red-500 rounded-full text-white flex items-center text-[14px]'>
            Mulai AR</button>   
            </div>
      </div>
    </div>
  )
}

export default Blog