import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import makroIpa from "../assets/Materi/makro-ipa";
import styles from "../Pages/style/introDetail.module.css";

export default function IntroDetail() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [materi, setMateri] = useState(null);

  useEffect(() => {
    const foundMateri = makroIpa.find((item) => item.name === name);
    if (foundMateri) {
      setMateri(foundMateri);
    } else {
      alert("Materi tidak ditemukan");
      navigate("/");
    }
  }, [name, navigate]);

  const openARPage = (url_ar) => {
    sessionStorage.setItem("lastPage", window.location.pathname);
    window.location.href = `/AR/Pages/${url_ar}.html`;
  };

  const getImageUrl = (imageName) => {
    try {
      return new URL(
        `../assets/Images/AsetGambar/Anatomi/${imageName}`,
        import.meta.url,
      ).href;
    } catch {
      return "https://via.placeholder.com/400x200?text=Image+Not+Found";
    }
  };

  if (!materi) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.container}>
      <button onClick={() => navigate(-1)} className={styles.backButton}>
        ← Kembali
      </button>

      <header className={styles.header}>
        <span className={styles.badge}>{materi.category}</span>
        <h1 className={styles.title}>{materi.name}</h1>
      </header>

      <div className={styles.heroSection}>
        <img
          src={getImageUrl(materi.image)}
          alt={materi.name}
          className={styles.mainImage}
        />
      </div>

      <div className={styles.arContainer}>
        <button
          className={styles.arButton}
          onClick={() => openARPage(materi.url_ar)}
        >
          Mulai AR
        </button>
      </div>

      
      <div className={styles.contentGrid}>
      
        <div className={styles.infoCard}>
          <h4 className={styles.cardTitle}> Pengertian</h4>
          <p>{materi.pengertian}</p>
        </div>

      
        <div className={styles.infoCard}>
          <h4 className={styles.cardTitle}>Organ Terkait</h4>
          <div className={styles.organGrid}>
            {materi.organTerkait.map((item, index) => (
              <div key={index} className={styles.organItem}>
                <strong>{item.nama}</strong>
                <p style={{ fontSize: "16px", marginTop: "5px" }}>
                  {item.fungsi}
                </p>
              </div>
            ))}
          </div>
        </div>

        
        <div className={styles.twoColumn}>
          <div className={styles.infoCard}>
            <h4 className={styles.cardTitle}>Cara Kerja</h4>
            <ul className={styles.list}>
              {materi.caraKerja.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
          <div className={styles.infoCard}>
            <h4 className={styles.cardTitle}> Fungsi Utama</h4>
            <ul className={styles.list}>
              {materi.fungsi.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className={`${styles.infoCard} ${styles.dangerCard}`}>
          <h4 className={styles.cardTitle}>Gangguan Kesehatan</h4>
          <ul className={styles.list}>
            {materi.gangguan.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
