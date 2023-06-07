import React, { useState, useEffect } from 'react';
import style from "../styles/Footer.module.css"

const Footer = () => {
  const openNewTab = (url) => {
    const newTab = window.open();
    newTab.opener = null;
    newTab.location.href =url;
  };
  return (
    <div className={style.footer}>
   
     <p onClick={()=>openNewTab("https://github.com/HARSHAL-AP/touch-typing")}>How to use?</p>
     <p>Created by  <span onClick={()=>openNewTab("https://github.com/HARSHAL-AP")}>@harshal-ap</span></p>
    
    </div>
  );
};


export default Footer