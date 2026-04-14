import React from 'react'
import css from '../Components/style/heroInfo.module.css';

function HeroInfo({menu}) {
  return (
     <div className={css.characterInfo}>
      <h2>{menu.name}</h2>
      <p>{menu.description}</p>
    </div>
  )
}

export default HeroInfo