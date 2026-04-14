import React from 'react';
import styles from '../Components/style/footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <p className={styles.copyrightText}>
        &copy; {currentYear} <strong>Moh. Rifki Adhitama</strong>. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;