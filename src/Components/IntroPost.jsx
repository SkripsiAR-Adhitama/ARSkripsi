import React from 'react'
import Banner from './../assets/Images/Banner.png'
import { useNavigate } from 'react-router-dom'
function IntroPost() {
  const navigate=useNavigate();
  return (
    <div className='grid grid-cols-1 cursor-pointer
     md:grid-cols-2 mt-10 px-10 md:px-15 lg:px-32 gap-8'  
     >
        <img src={Banner} className='
        rounded-2xl object-cover w-full h-full' onClick={()=>navigate('blog-detail')}/>
        <div>
            <h4 className='text-red-500'>All</h4>
            <h2 className='text-[23px] font-bold mt-5'>Anatomi Tubuh Manusia</h2>
            <h4 className='line-clamp-6 text-gray-400 mt-5'>Percobaan</h4>
        <div className='flex items-center mt-5'>
            <div className='ml-2'>
               <button className='bg-red-500 rounded-full text-white flex items-center text-[14px]'>
            Mulai AR</button>   
            </div>
        </div>
        </div>
    </div>
  )
}

export default IntroPost