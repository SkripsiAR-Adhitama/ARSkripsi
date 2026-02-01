import React from 'react'
import logo from './../assets/Images/Logo.png'
import { useNavigate } from 'react-router-dom'


function Header() {
  const navigate=useNavigate();
  return (
    <div className='flex justify-between items-center cursor-pointer'>
      <img src={logo} className='w-[180px]'/>
      <ul className='flex gap-3 md:gap-14'>
        <li className='hover:font-bold' onClick={()=>navigate('/')}>Beranda</li>
        <li className='hover:font-bold' onClick={()=>navigate('materi-pembelajaran')}>Materi Pembelajaran</li>
        <li className='hover:font-bold ' onClick={()=>navigate('petunjuk-penggunaan')}>Petunjuk Penggunaan</li>
        <li className='hover:font-bold' onClick={()=>navigate('tentang-aplikasi')}>Tentang Aplikasi</li>
        <li className='hover:font-bold' onClick={()=>navigate('sk-kd')}>SK & KD</li>
        <li className='hover:font-bold mr-20' onClick={()=>navigate('kuis-aplikasi')}>Kuis</li>
      </ul>
    </div>
  )
}

export default Header