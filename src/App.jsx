import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './Pages/Home'
import Header from './Components/Header'
import { Route, Routes } from 'react-router-dom'
import BlogDetail from './Pages/BlogDetail'
import MateriPembelajaran from './Pages/MateriPembelajaran'
import PetunjukPenggunaan from './Pages/PetunjukPenggunaan'
import Kuis from './Pages/Kuis'
import TentangAplikasi from './Pages/TentangAplikasi'
import StandarKompetensi from './Pages/StandarKompetensi'
import QuizPage from './quiz/quiz-page'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='p-[20px]'>
    <Header/>
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/blog-detail' element={<BlogDetail />}></Route>
      <Route path='/materi-pembelajaran' element={<MateriPembelajaran/>}></Route>
      <Route path='/petunjuk-penggunaan' element={<PetunjukPenggunaan/>}></Route>
      <Route path='/tentang-aplikasi' element={<TentangAplikasi/>}></Route>
      <Route path='/sk-kd' element={<StandarKompetensi/>}></Route>
      <Route path='/kuis-aplikasi' element={<Kuis/>}></Route>
      <Route path='/kuis-aplikasi/halaman-kuis' element={<QuizPage/>}></Route>
    </Routes>
    </div>
    </>
  )
}

export default App
