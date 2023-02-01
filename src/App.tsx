import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import Register from './components/Register';
import OtpLayout from './components/OtpLayout';

function App() {
  const [open ,setOpen]=useState<boolean>(false);
  const [randomNum,setRandomNum]=useState<number>();
  const num1=useRef<HTMLInputElement>(null);
  const num2=useRef<HTMLInputElement>(null);
  const num3=useRef<HTMLInputElement>(null);
  const num4=useRef<HTMLInputElement>(null);
  const num5=useRef<HTMLInputElement>(null);
  // function for modal close
  const handleclose=()=>{
     setOpen(false)
  }
  // function for modal open and random generate
  const modalopen=()=>{
      setOpen(true);
  }
   // random number generator
  const random=()=>{
    let random =Math.floor(Math.random()*90000)+10000
      setRandomNum(random);
  }
  let [second,setSecond]=useState(30);
  useEffect(()=>{
    // setInterval(()=>{
    //      if(second<=30)
    //      {
    //        second--;
    //      } 
    // },1000)
    timer();
  },[]);
  let time:number=30
  const [timerSec,setTimer]=useState(time);
  const timer=()=>{
      time--;
  }
  console.log(timerSec);
  return (
    <>
   <Register modalopen={modalopen}/>
   <OtpLayout open={open} handleclose={handleclose} random={random} randomNum={randomNum} num1={num1} num2={num2} num3={num3} num4={num4} num5={num5}/>
   </>
  );
}

export default App;
