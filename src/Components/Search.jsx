import React, {useEffect, useState}from 'react'
import Banner from './../assets/Images/Banner.png'
import { CiSearch } from "react-icons/ci";

function Search() {
   const tags=[
        {
            id:1,
            name:'All',
        },
        {
            id:2,
            name:'Pernapasan',
        },
        {
            id:3,
            name:'Pencernaan',
        },
        {
            id:4,
            name:'Peredaran Darah',
        },
    ]
      const [activeIndex,setActiveIndex]=useState(0);
  return (
    <div className='justify-center mt-8 flex-col px-[50px]'>
      <img src={Banner} className='rounded-2xl'/>
      <div className='bg-white mt-4 shadow-lg p-4 rounded-lg flex items-center'>
        <CiSearch className='text-[20px] text-gray-500' />
          <input type='text' placeholder='Search...' className='outline-none ml-2'/>
      </div>
      <div className='flex gap-12 justify-center mt-5'>
        {tags.map((item,index)=>(
            <ul onClick={()=>setActiveIndex(index)} className={`${index===activeIndex?
            'bg-red-500 text-white ':null} p-1 pb-2 rounded-sm
            md:rounded-full cursor-pointer md:px-4
            hover:scale-110`}>
              <li>{item.name}</li>
            </ul>
        ))}
      </div>
    </div>
  )
}

export default Search