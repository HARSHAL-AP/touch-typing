import React, {useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {fetchData } from '../redux/store';
import style from "../styles/Navbar.module.css"


const Navbar = () => {
  const dispatch = useDispatch();
const [level,setlevel]=useState("l4")
  useEffect(() => {
    
    dispatch(fetchData(level));
  }, [dispatch,level]);

  const handleChangedata = (e) => {
   
    setlevel(e.target.value);
  };
  return (
    <div className={style.navbar}>
        <div  className={style.navbarcontent}>
         <h2 className={style.logo}>Touch-Typing</h2>
         <div>
         <select name="" id="" className={style.timeselecter} onChange={handleChangedata}>
         <option value="l5">Select Lesson</option >
            <option value="l1">Lesson 1</option>
            <option value="l2">Lesson 2</option>
            <option value="l3">Lesson 3</option>
            <option value="l4">Lesson 4</option>
            <option value="l5">Lesson 5</option>
         </select>
        
        </div>
         </div>
         
    </div>
  )
}

export default Navbar