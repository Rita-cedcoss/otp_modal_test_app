import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import Register from "./components/Register";
import OtpLayout from "./components/OtpLayout";

function App() {
  const [open, setOpen] = useState<boolean>(false);
  const [randomNum, setRandomNum] = useState<number>();
  const num1 = useRef<HTMLInputElement>(null);
  const num2 = useRef<HTMLInputElement>(null);
  const num3 = useRef<HTMLInputElement>(null);
  const num4 = useRef<HTMLInputElement>(null);
  const num5 = useRef<HTMLInputElement>(null);
  let [timerSec, setTimer] = useState(5);
  let [attempts, setAttempt] = useState(4);
  const [disable, setDisable] = useState(false);
  const [message, setMessqe] = useState("Enter one time passcode");
  const [msgColor, setMsgcolor] = useState("error");
  const intervalRef=useRef<any>();
  // function for modal close
  const handleclose = () => {
    setOpen(false);
    setDisable(true);
  };
  // function for modal open and random generate
  const modalopen = () => {
    setOpen(true);
    let random = Math.floor(Math.random() * 90000) + 10000;
    setRandomNum(random);
    setAttempt(5);
  };
  // random number generator
  const random = () => {
    attempts--;
    setAttempt(attempts);
    if (attempts > 0) {
      let random = Math.floor(Math.random() * 90000) + 10000;
      setRandomNum(random);
      setTimer(5);
      if(num1.current!==null && num2.current!==null &&num3.current!==null&& num4.current!==null && num5.current!==null ){
        num1.current.value="";
        num2.current.value="";
        num3.current.value="";
        num4.current.value="";
        num5.current.value="";
        setMsgcolor("success");
        setMessqe("sent otp successfully");
      }
    } else {
      setDisable(true);
    }
  };
  //for timer
  useEffect(() => {
    clearInterval(intervalRef.current);
    intervalRef.current=setInterval(()=>{
      if(timerSec>0)
      timerSec--;
      setTimer(timerSec);
    },1000);
    if (timerSec == 0) {
      // setOpen(false);
    }
  }, [timerSec]);
  // for timer
  const timer = () => {
    setInterval(() => {
      if (timerSec > 0) {
        timerSec--;
      }
      setTimer(timerSec);
    }, 1000);
  };
  return (
    <>
      <Register modalopen={modalopen} disable={disable}/>
      <OtpLayout
        open={open}
        handleclose={handleclose}
        random={random}
        randomNum={randomNum}
        num1={num1}
        num2={num2}
        num3={num3}
        num4={num4}
        num5={num5}
        timersec={timerSec}
        disable={disable}
        attempts={attempts}
        setOpen={setOpen}
        message={message}
        setMessqe={setMessqe}
        msgColor={msgColor}
        setMsgcolor={setMsgcolor}
      />
    </>
  );
}

export default App;
