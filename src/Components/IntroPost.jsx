import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../Components/style/intro-post.module.css'; 
import makroIpa from '../assets/Materi/makro-ipa';

function IntroPost({ selectedCategory = 'All' }) {
  const navigate = useNavigate();

  const getImageUrl = (imageName) => {
    try {
      return new URL(`../assets/Images/AsetGambar/Anatomi/${imageName}`, import.meta.url).href;
    } catch (error) {
      console.error('Error loading image:', imageName, error);
      return 'https://via.placeholder.com/600x400?text=Image+Not+Found';
    }
  };

  const openARPage = (url_ar) => {
    window.location.href = `/AR/Pages/${url_ar}.html`;
  };

  const filteredData = selectedCategory === 'All'
    ? makroIpa
    : makroIpa.filter(item => item.category === selectedCategory);

  return (
    <div className={styles.container}>
      {filteredData.length > 0 ? (
        filteredData.map((item, index) => (
          <div 
            key={index} 
            className={styles.postGrid}
            onClick={() => navigate(`/intro-detail/${item.name}`)}
          >
            
            <div className={styles.imageWrapper}>
              <img
                src={getImageUrl(item.image)}
                alt={item.name}
                className={styles.postImage}
              />
            </div>

            <div className={styles.content}>
              <span className={styles.category}>{item.category}</span>
              <h2 className={styles.title}>{item.name}</h2>
              <p className={styles.description}>{item.pengertian}</p>
              
              <div className={styles.buttonWrapper}>
                <button
                  className={styles.btnAr}
                  onClick={(e) => {
                    e.stopPropagation();
                    openARPage(item.url_ar);
                  }}
                >
                  Mulai AR
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className={styles.empty}>
          <p>Data tidak ditemukan</p>
        </div>
      )}
    </div>
  );
}

export default IntroPost;