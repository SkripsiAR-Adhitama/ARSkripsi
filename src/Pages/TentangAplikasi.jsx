import React from "react";
import style from "../Pages/style/tentang.module.css";
import { useNavigate } from "react-router-dom";

function TentangAplikasi() {
  const navigate = useNavigate();

  return (
    <div>
      <div className={style.headerWrapper}>
        <button onClick={() => navigate("/")} className={style.backButton}>
          ← Kembali
        </button>
      </div>

      <h1 className={style.headerTitle}>Tentang Aplikasi</h1>

      <div className={style.contentBox}>
        <div className={style.cardGrid}>
          <div className={style.card}>
            <span className={style.icon} role="img" aria-label="deskripsi">📖</span>
            <h3>Deskripsi</h3>
            <p>
              ARnatomi adalah aplikasi  berbasis Augmented Reality (AR)
              untuk memahami anatomi tubuh manusia secara interaktif.
            </p>
          </div>

          <div className={style.card}>
            <span className={style.icon} role="img" aria-label="tujuan">🎯</span>
            <h3>Tujuan</h3>
            <p>
              Membantu siswa memahami materi dengan cara yang lebih menarik dan
              interaktif.
            </p>
          </div>

          <div className={style.card}>
            <span className={style.icon} role="img" aria-label="fitur">✨</span>
            <h3>Fitur</h3>
            <ul className={style.list}>
              <li>Visualisasi organ dengan AR</li>
              <li>Materi interaktif</li>
              <li>Kuis pembelajaran</li>
              <li>Petunjuk penggunaan</li>
            </ul>
          </div>

          <div className={style.card}>
            <span className={style.icon} role="img" aria-label="teknologi">💻</span>
            <h3>Teknologi</h3>
            <ul className={style.list}>
              <li>WebXR</li>
              <li>A-Frame</li>
              <li>React.js</li>
              <li>HTML, CSS, JS</li>
            </ul>
          </div>

          <div className={style.card}>
            <span className={style.icon} role="img" aria-label="sumber">🌐</span>
            <h3>Sumber</h3>
            <p>
              Sumber Objek AR: BodyParts3D © Life Science Integrated Database Center (CC BY 4.0) <br />
              Sumber Aset Gambar: Canva
            </p>
          </div>

          <div className={style.card}>
            <span className={style.icon} role="img" aria-label="pengembang">🧑‍💻</span>
            <h3>Pengembang</h3>
            <p>
              Moh. Rifki Adhitama <br />
              Sistem Informasi <br />
              UINSA
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TentangAplikasi;