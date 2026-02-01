import React from "react";

export default function BlogDetail(){
    return (
        <div className="px-6 md:px-20 lg:px-56 mt-10">
            <h3 className="text-red-500 text-[12px]"> Daftar Organ</h3>
            <h3 className="text-[24px] font-bold"> Nama Organ</h3>
            <img src='' className='rounded-2xl mt-5 mb-5 object-cover w-full h-[400px]'/>
            <h3 className='line-clamp-3 text-gray-400 mt-3'> Deskrispi Organ</h3>
        </div>
    )
    
}