import { count } from 'console';
import React, { useEffect, useRef, useState } from 'react'
import OtpLayout from './OtpLayout';

const Register = () => {
    const inpRef=useRef<HTMLInputElement>(null);
    const [number,setNumber]=useState<any>(5);
    const[message,setmessage]=useState<string>("");
    const [random,setRandom]=useState<number>();
    const[flag,setFlag]=useState<boolean>(false);
    let [timerSec, setTimer] = useState(59);
    let [attempts,setAttempts]=useState<any>(4);
    const[disabled,setDisabled]=useState<boolean>(false);
    // take value 4 t0 8 from input
    const inpNum=(e:any)=>{
      console.log(e.target.value);
        if(e.target.value.match(/^[4-8]$/))
                {          
                    setNumber(e.target.value);
                    setmessage("")             
    }
    else{
        if(e.target.value=='')
          setNumber(e.target.value);
          setmessage("number between 4 to 8"); 
    }
    }
    // for opt generation
    const otpGenerate=()=>{
        let max : string=""
        let min: string="1"
        
        for(let i=1;i<=number;i++)
        {
            max+=9
            if(i!==1)
            {
                console.log(i);
              min+=0;
            }
        }
        let random=Math.floor(Math.random()*(parseInt(max)-parseInt(min))+parseInt(min))
        setRandom(random)
        setFlag(true);
        setTimer(59);
        setAttempts(5);
        setDisabled(true);
        
    }
    // for resend otp
 
    // for timer
    // useEffect(() => {
    //   setDisabled(true);
    //   clearInterval(intervalRef.current);
    //   intervalRef.current=setInterval(()=>{
    //     if(timerSec>0)
    //     timerSec--;
    //     setTimer(timerSec);
    //   },1000);
    //   if(timerSec==0)
    //   {
    //     setDisabled(false)
    //   }
    // }, [timerSec]);
  return (
    <>
    <div>
        <br></br>
        <p>Enter the Number to get Opt (Default value is 5) </p>
        <input type="text" placeholder='Current value 5' ref={inpRef} value={number} maxLength={1} onChange={(e)=>inpNum(e)}/>
        <p>{message}</p>
        <button onClick={otpGenerate}>Validate otp</button>
    </div>
    <OtpLayout otpGenerate={otpGenerate} flag={flag} setFlag={setFlag} random={random} disabled={disabled}  setDisabled={setDisabled}/>
    </>
  )
}

export default Register