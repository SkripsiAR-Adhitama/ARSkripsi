
import React from 'react'
import css from '../Components/style/hero.module.css';
import { useNavigate } from 'react-router-dom'

function Hero({ menu }) {
  const navigate = useNavigate();

  const getImageUrl = (imageName) => {
    try {
      return new URL(`../assets/Images/AsetGambar/Menu/${imageName}`, import.meta.url).href;
    } catch (error) {
      console.error('Error loading image:', imageName, error);
      return 'https://via.placeholder.com/600x400?text=Image+Not+Found';
    }
  };

  return (
    <>
      <div className={css.content}>
        <div className={css.exploreHeader}>
        </div>
      </div>

      <div className={css.menuContainer}>
        {menu.map((item) => (
          <div
            key={item.id}
            className={css.characterCard}
            style={{ background: item.bg }}
            onClick={() => navigate(`/${item.url}`)}
          >
            <div className={css.imgWrapper}>
              <img src={getImageUrl(item.image)} alt={item.name} />
            </div>
            <div className={css.textWrapper}>
              <h4>{item.name}</h4>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Hero