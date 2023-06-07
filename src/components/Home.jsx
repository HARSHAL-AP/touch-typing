import React from "react";
import style from "../styles/Home.module.css";
import Wordcomparison from "./Wordcomparison";

const Home = () => {
  
  return (
    <div className={style.home}>
      
    
      <div className={style.typingcontener}>
        <h2 className={style.typingcontener}>"Elevate Your Typing Skills: Boost Speed and Efficiency!"</h2>
      < Wordcomparison/>

      </div>
    </div>
  );
};

export default Home;
