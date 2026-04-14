import React from 'react'
import { steps } from '../Pages/steps.js';
import style from '../Pages/style/petunjuk.module.css'
import { useNavigate } from 'react-router-dom'
function PetunjukPenggunaan() {
  const navigate = useNavigate();
  const getImage = (img) => {
    return new URL(
      `../assets/Images/AsetGambar/CaraPenggunaan/${img}`,
      import.meta.url
    ).href;
  };
  return (
    <div>
       <div className={style.headerWrapper}>
            <button 
                onClick={() => navigate('/')}
                className={style.backButton}
            >
                ← Kembali
            </button>
            </div>

              <h1 className={style.headerTitle}>
                Petunjuk Penggunaan
              </h1>

            <div className={style.contentBox}>
                     <div className={style.gridContainer}>
          {steps.map((item) => (
            <div key={item.id} className={style.stepCard}>
              
              <div className={style.stepNumber}>
                {item.id}
              </div>

              <img 
                src={getImage(item.image)}
                alt={item.text}
                className={style.stepImage}
              />

              <p className={style.stepText}>
                {item.text}
              </p>

            </div>
          ))}
        </div>
            </div>
    </div>
  )
}

export default PetunjukPenggunaan