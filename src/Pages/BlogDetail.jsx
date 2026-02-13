// import React from "react";

// export default function BlogDetail(){
//     return (
//         <div className="px-6 md:px-20 lg:px-56 mt-10">
//             <h3 className="text-red-500 text-[12px]"> Daftar Organ</h3>
//             <h3 className="text-[24px] font-bold"> Nama Organ</h3>
//             <img src='' className='rounded-2xl mt-5 mb-5 object-cover w-full h-[400px]'/>
//             <h3 className='line-clamp-3 text-gray-400 mt-3'> Deskrispi Organ</h3>
//         </div>
//     )
    
// }
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import materiIpa from '../assets/Materi/materi-ipa';

export default function BlogDetail() {
    const { name } = useParams();
    const navigate = useNavigate();
    const [materi, setMateri] = useState(null);

    useEffect(() => {
        const foundMateri = materiIpa.find(item => item.name === name);
        
        if (foundMateri) {
            setMateri(foundMateri);
        } else {
            alert('Materi tidak ditemukan');
            navigate('/');
        }
    }, [name, navigate]);

    const getImageUrl = (imageName) => {
        try {
            return new URL(`../assets/Materi/Images/${imageName}`, import.meta.url).href;
        } catch (error) {
            return 'https://via.placeholder.com/400x200?text=Image+Not+Found';
        }
    };

    const openARPage = (url_ar) => {
        window.location.href = `/AR/${url_ar}.html`;
    };

    if (!materi) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-gray-500 text-lg">Loading...</p>
            </div>
        );
    }

    return (
        <div className="px-6 md:px-20 lg:px-56 mt-10 mb-10">
            {/* Tombol Kembali */}
            <button 
                onClick={() => navigate(-1)}
                className="mb-5 text-red-500 hover:text-red-600 flex items-center"
            >
                ← Kembali
            </button>

            {/* Category */}
            <h3 className="text-red-500 text-[12px] font-semibold">
                {materi.category}
            </h3>

            {/* Nama Organ */}
            <h3 className="text-[24px] font-bold mt-2">
                {materi.name}
            </h3>

            {/* Gambar */}
            <img 
                src={getImageUrl(materi.image)} 
                alt={materi.name}
                className='rounded-2xl mt-5 mb-5 object-cover w-full h-[400px]'
            />

            {/* Deskripsi */}
            <h3 className='text-gray-600 mt-5 leading-relaxed text-justify'>
                {materi.description}
            </h3>

            {/* Button AR */}
            <div className="flex justify-center mt-8">
                <button 
                    className='bg-red-500 rounded-full text-white flex items-center text-[16px] px-6 py-3 hover:bg-red-600 transition-colors'
                    onClick={() => openARPage(materi.url_ar)}
                >
                    Mulai AR
                </button>
            </div>
        </div>
    );
}