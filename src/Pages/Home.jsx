import React from "react";
import Header from "../Components/Header";
import Hero from "../Components/Hero";
import { menu } from "../Components/menu";

function Home() {
  return (
    <div className="mobile-frame">
      <Header />
      <div className="content">
        <Hero menu={menu} />
      </div>
    </div>
  );
}

export default Home;
