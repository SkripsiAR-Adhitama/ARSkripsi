import React from "react";
import style from "../Pages/style/skkd.module.css";
import { useNavigate } from "react-router-dom";

function StandarKompetensi() {
  const navigate = useNavigate();

  return (
    <div>
      <div className={style.headerWrapper}>
        <button onClick={() => navigate("/")} className={style.backButton}>
          ← Kembali
        </button>
      </div>

      <h1 className={style.headerTitle}>
        Capaian Pembelajaran
      </h1>

      <div className={style.contentBox}>
        <div className={style.cardGrid}>
          
          <div className={style.card}>
            <span className={style.icon}>🧠</span>
            <h3>Standar Kompetensi</h3>
            <p>
              Memahami konsep dasar ilmu pengetahuan alam dan sosial,
              khususnya yang berkaitan dengan tubuh manusia dan
              lingkungan sekitarnya.
            </p>
          </div>

          <div className={style.card}>
            <span className={style.icon}>❤️</span>
            <h3>Kompetensi Dasar</h3>
            <ul className={style.list}>
              <li>Memahami konsep tubuh manusia</li>
              <li>Mengidentifikasi bagian dan fungsi</li>
              <li>Mengaitkan dengan kehidupan sehari-hari</li>
              <li>Menjaga kesehatan tubuh</li>
            </ul>
          </div>

          <div className={style.card}>
            <span className={style.icon}>🎯</span>
            <h3>Tujuan Pembelajaran</h3>
            <ul className={style.list}>
              <li>Memahami konsep secara sederhana</li>
              <li>Menumbuhkan rasa ingin tahu</li>
              <li>Belajar dengan media interaktif</li>
              <li>Meningkatkan kesadaran kesehatan</li>
            </ul>
          </div>

          <div className={style.card}>
            <span className={style.icon}>🔬</span>
            <h3>Aktivitas Pembelajaran</h3>
            <ul className={style.list}>
              <li>Mengamati organ melalui AR</li>
              <li>Menjelajahi bagian tubuh</li>
              <li>Mengerjakan kuis</li>
              <li>Menyimpulkan hasil belajar</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}

export default StandarKompetensi;
