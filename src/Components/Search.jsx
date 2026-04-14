import React from "react";
import { useNavigate } from "react-router-dom";
import styles from '../Components/style/search.module.css'; 
import { CiSearch } from "react-icons/ci";

function Search({ onCategoryChange, selectedCategory}) {
  const navigate = useNavigate();
  
  const tags = [
    { id: 1, name: "All" },
    { id: 2, name: "Pernapasan" },
    { id: 3, name: "Pencernaan" },
    { id: 4, name: "Peredaran" },
  ];

  const activeIndex = tags.findIndex(tag => tag.name === selectedCategory);

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.topNavigation}>
        <button
          onClick={() => navigate("/")}
          className={styles.backButton}
        >
          ← Kembali
        </button>
      </div>

      <h1 className={styles.pageTitle}>
        Materi Pembelajaran
      </h1>

      <div className={styles.tagContainer}>
        {tags.map((item, index) => (
          <ul
            key={item.id}
            onClick={() => onCategoryChange(item.name)} 
            className={`${styles.tagItem} ${
              index === activeIndex ? styles.activeTag : styles.inactiveTag
            }`}
          >
            <li>{item.name}</li>
          </ul>
        ))}
      </div>
    </div>
  );
}

export default Search;