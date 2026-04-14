import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../Components/style/blog.module.css'; 
import materiIpa from '../assets/Materi/materi-ipa';

function Blog({ selectedCategory = 'All', searchTerm = '' }) {
  const navigate = useNavigate();
  
  const getImageUrl = (category, imageName) => {
    return new URL(`../assets/Images/AsetGambar/Materi/${category}/${imageName}`, import.meta.url).href;
  };

 const openARPage = (url_ar) => {
    sessionStorage.setItem("lastPage", window.location.pathname);
    window.location.href = `/AR/Pages/${url_ar}.html`;
  };
  
  const filteredData = materiIpa.filter((item) => {
    const matchCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className={styles.gridContainer}>
      {filteredData.length > 0 ? (
        filteredData.map((item, index) => (
          <div 
            key={index} 
            className={styles.card} 
            onClick={() => navigate(`/blog-detail/${item.name}`)}
          >
            
            <div className={styles.imageWrapper}>
              <img 
                src={getImageUrl(item.category, item.image)} 
                alt={item.name}
                className={styles.cardImage} 
              />
            </div>
            

            <div className={styles.infoContent}>
              <span className={styles.category}>{item.category}</span>
              <h3 className={styles.title}>{item.name}</h3>
              <p className={styles.description}>{item.pengertian}</p>
            </div>
            
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
        ))
      ) : (
        <div className={styles.emptyState}>
          <p className={styles.emptyTitle}>😔 Tidak ada materi ditemukan</p>
        </div>
      )}
    </div>
  );
}

export default Blog;