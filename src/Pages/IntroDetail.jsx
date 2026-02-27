import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import makroIpa from '../assets/Materi/makro-ipa';

export default function IntroDetail() {
    const { name } = useParams();
    const navigate = useNavigate();
    const [materi, setMateri] = useState(null);

    useEffect(() => {
        const foundMateri = makroIpa.find(item => item.name === name);
        
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
        window.location.href = `/AR/Pages/${url_ar}.html`;
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
            <button 
                onClick={() => navigate(-1)}
                className="mb-5 flex items-center text-red-500 hover:text-red-600 transition-colors"
            >
                <svg 
                    className="w-5 h-5 mr-2" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M10 19l-7-7m0 0l7-7m-7 7h18" 
                    />
                </svg>
                Kembali
            </button>

            <h3 className="text-red-500 text-[12px] font-semibold uppercase">
                {materi.category}
            </h3>

            <h3 className="text-[24px] md:text-[32px] font-bold mt-2">
                {materi.name}
            </h3>

            <img 
                src={getImageUrl(materi.image)} 
                alt={materi.name}
                className='rounded-2xl mt-5 mb-5 object-cover w-full h-[400px] shadow-lg'
            />

            <div className="mt-5 mb-8">
                <h4 className="text-[18px] font-bold mb-3">Deskripsi</h4>
                <p className='text-gray-600 leading-relaxed text-justify'>
                    {materi.description}
                </p>
            </div>

            <div className="flex justify-center mb-10">
                <button 
                    className='bg-red-500 rounded-full text-white flex items-center text-[16px] px-8 py-3 hover:bg-red-600 active:bg-red-700 transition-colors shadow-lg'
                    onClick={() => openARPage(materi.url_ar)}
                >
                    <svg 
                        className="w-5 h-5 mr-2" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" 
                        />
                    </svg>
                    Mulai AR
                </button>
            </div>

            <div className="mt-10 mb-10">
                <h4 className="text-[20px] font-bold mb-5">Materi Terkait</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {makroIpa
                        .filter(item => item.category === materi.category && item.name !== materi.name)
                        .map((relatedItem, index) => (
                            <div 
                                key={index} 
                                className="cursor-pointer hover:shadow-lg transition-shadow rounded-lg overflow-hidden bg-white"
                                onClick={() => navigate(`/intro-detail/${relatedItem.name}`)}
                            >
                                <img 
                                    src={getImageUrl(relatedItem.image)} 
                                    alt={relatedItem.name}
                                    className="w-full h-[150px] object-cover"
                                />
                                <div className="p-3">
                                    <h5 className="font-bold text-sm">{relatedItem.name}</h5>
                                    <p className="text-gray-400 text-xs mt-1 line-clamp-2">
                                        {relatedItem.description}
                                    </p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}