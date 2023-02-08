import { count } from "console";
import React, { useEffect, useRef, useState } from "react";
import OtpLayout from "./OtpLayout";

const Register = () => {
  const inpRef = useRef<HTMLInputElement>(null);
  const [number, setNumber] = useState<any>();
  const [message, setmessage] = useState<string>("");
  const [random, setRandom] = useState<number>();
  const [flag, setFlag] = useState<boolean>(false);
  const intervalRef = useRef<any>();
  let [timerSec, setTimer] = useState(59);
  const [disabled, setDisabled] = useState<boolean>(false);
  // take value 4 t0 8 from input
  const inpNum = (e: any) => {
    console.log(e.target.value);
    if (e.target.value.match(/^[4-8]$/)) {
      setNumber(e.target.value);
      setmessage("");
    } else {
      if (e.target.value == "") setNumber(e.target.value);
      setmessage("Please Enter number between range 4 to 8");
    }
  };
  // for opt generation
  const otpGenerate = () => {
    console.log(number);
    if (number == "" || number == undefined) {
      setmessage("Please Enter number between range 4 to 8");
    } else {
      let max: string = "";
      let min: string = "1";

      for (let i = 1; i <= number; i++) {
        max += 9;
        if (i !== 1) {
          min += 0;
        }
      }
      let random = Math.floor(
        Math.random() * (parseInt(max) - parseInt(min)) + parseInt(min)
      );
      setRandom(random);
      setFlag(true);
      setTimer(59);
      setDisabled(true);
    }
  };
  //for Timer
  useEffect(() => {
    setDisabled(true);
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (timerSec > 0) timerSec--;
      setTimer(timerSec);
    }, 1000);
    if (timerSec == 0) {
      setDisabled(false);
    }
  }, [timerSec]);
  return (
    <>
      <div className="registerOuter">
        <br></br>
        <h1>OTP Validation</h1>
        <p>Enter the Number between range 4 to 8</p>
        <input
          type="text"
          ref={inpRef}
          value={number}
          maxLength={1}
          onChange={(e) => inpNum(e)}
        />
        <p className="text-danger pt-3">{message}</p>
        <button onClick={otpGenerate} className="btn btn-primary">
          Validate otp
        </button>
      </div>
      {flag && (
        <OtpLayout
          otpGenerate={otpGenerate}
          timerSec={timerSec}
          setTimer={setTimer}
          flag={flag}
          setFlag={setFlag}
          random={random}
          disabled={disabled}
          setDisabled={setDisabled}
        />
      )}
    </>
  );
};

export default Register;
