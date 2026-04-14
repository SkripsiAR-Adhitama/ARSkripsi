import React from "react";
import logo from "./../assets/Images/home_image.png";
import Hero from "../Components/Hero";
import css from "../Components/style/header.module.css";
import { useNavigate } from "react-router-dom";

function Header() {
  return (
    <div className={css.headerContainer}>
      <h1 className={css.headerTitle}>ARnatomi</h1>
    </div>
  );
}

export default Header;
