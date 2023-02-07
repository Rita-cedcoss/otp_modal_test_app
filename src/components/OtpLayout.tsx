import { Message } from '@mui/icons-material';
import { Modal } from '@mui/material'
import React, { SetStateAction, useEffect, useRef, useState } from 'react'
// import "../App.css"
type OtpLayoutProps={
  flag:boolean;
  random:number|undefined;
  // resentOtp:()=>void
  setDisabled:React.Dispatch<React.SetStateAction<boolean>>
 setFlag:React.Dispatch<React.SetStateAction<boolean>>
 otpGenerate:()=>void
//  timerSec:number;
//  attempts:number;
 disabled:boolean;
}
const OtpLayout = (props:OtpLayoutProps) => {
  const [massage,setMessage]=useState("");
  const [inpBorder,setInpborder]=useState("");
  let [timerSec, setTimer] = useState(59);
  let [attempts,setAttempts]=useState<any>(4);
  const [msgColor,setMsgColor]=useState('');
  const intervalRef=useRef<any>();
  const refArr=useRef<any>([]);
  const handleclose=()=>{
    setInpborder("inpborder1");
    setMessage("");
    setAttempts(4);
   props.setFlag(false);
   setTimer(60);
  }
// for timer
useEffect(() => {
  props.setDisabled(true);
  clearInterval(intervalRef.current);
  intervalRef.current=setInterval(()=>{
    if(timerSec>0)
    timerSec--;
    setTimer(timerSec);
  },1000);
  if(timerSec==0)
  {
    props.setDisabled(false)
  }
}, [timerSec]);

//  useEffect
    
   useEffect(()=>{
    setTimeout(()=>refArr.current[0].focus());     
   },[]);
  // resend opt
  const resentOtp=()=>{ 
    setMessage("Resend Otp Successfully");
    setMsgColor("resendMsg");
    setInpborder("");
    refArr.current.map((item:any)=>{
         item.value=''
     
    })
    
    props.setDisabled(true);
    if(attempts>0)
    {
      attempts--
      props.otpGenerate();
      setTimer(59);
    }
    else{
      props.setDisabled(true);
    }    
    setAttempts(attempts);
  }

  // input Handler
  const inputHandler=(e:any,i:number)=>{
    setMessage("");
    setInpborder("");
  let inpArr : any=[];
  if(e.target.value.match(/[0-9]/)){
    refArr.current[i].value=e.target.value;
    if(i < refArr.current.length-1){
      refArr.current[i+1]?.focus();
    }
    console.log(refArr.current[i].value);
    let count=true;
    refArr.current.map((item:any,i:any)=>{
        if(item.value==''){
          setMessage("");
          count=false;
        }
    })
    if(count)
    {
      setInpborder("inpborder1");
         refArr.current.map((item:any)=>{
          inpArr.push(item.value);
         })
         if(inpArr.join("")==props.random){
          setTimeout(()=>{
          props.setFlag(false);
          setTimer(60);
          setMessage('')
          setInpborder('');
          // setLoading(true)
          },1000)
          setMessage("otp matched!");
          setMsgColor("successMsg");
          setInpborder("success");
        }
        else{
          setMessage("opt Not matched !");
          setInpborder("inpborder");
          setMsgColor("errorMsg");
        }
    }
    // console.log(inpArr.join(""));
   
  }
  else{
    e.target.value="";
  }
  console.log(inpArr);
  }
  // backinput Handler
  const backInputHandler=(e:any)=>{
    
  }
  return (
    <Modal
      open={props.flag}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
    <div className="modalouter">
    <div className="modal__header">
          <h3>Verify Your Email Address({props.random})</h3>
          <h3 onClick={handleclose}>X</h3>
        </div>
        <div className="modal__main">
          <p>Enter your code here</p>
          <div className="modal__input">
            {props.random?.toString().split("").map((item,i)=>{
                return(<>
                 <input
                 className={`${inpBorder}`}
              type="text"
              ref={(ref)=>refArr.current[i]=ref}
              onChange={(e)=>inputHandler(e,i)}
              onKeyUp={(e)=>backInputHandler(e)}
              maxLength={1}
            />
                </>)
            })}  
          </div>    
        </div>
        <p className={`${msgColor} ps-5  `}>
        {(massage=="otp matched!")?<img height="70px" width="150px" src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921"/>:""}
          {massage}</p>
        <div className="modal__bottom">
          <button
            className="modal__btn"
            onClick={resentOtp}
            disabled={props.disabled}
          >
            Resend one time password
          </button>
          <p className='pt-3'>({attempts} attempts left)</p>
          <p className="error pt-3 errorMsg">{timerSec} sec</p>
        </div>
    </div>
    </Modal>
  )
}

export default OtpLayout