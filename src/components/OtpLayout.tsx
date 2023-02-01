import { Modal } from "@mui/material";
import { Box } from "@mui/system";
import React, { FormEvent, FormEventHandler, useRef, useState } from "react";
type openProps = {
  open: boolean;
  handleclose: () => void;
  randomNum:number | undefined;
  random:()=>void;
//   digit1:any
  num1:any;
  num2:any;
  num3:any;
  num4:any;
  num5:any;
};

const OtpLayout = (props: openProps) => {
    const[message,setMessqe]=useState("Enter one time passcode");
    const[msgColor,setMsgcolor]=useState("error")
   const digit1=(e:any)=>{

    let inpValu1=e.target.value;
    // props.num1.current.focus();
    // inpValu1.focus(); 
    if(!inpValu1.match(/^[0-9]*$/))
    {
        alert("please enter is number");
    }
    else{
        props.randomNum?.toString().split("").map((item,i)=>{
           
            if(item===inpValu1)
            { 
                setMessqe("One time passcode sent successfully");
                setMsgcolor("success")
                console.log(inpValu1);
            }
            else{
                setMsgcolor("error");
                setMessqe(" one time passcode is incorrect!")
            }
        }) 
    }
   }
  return (
    <Modal
      open={props.open}
      onClose={props.handleclose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <div className="modal">
        <div className="modal__header">
          <h3>Verify Your Email Address({props.randomNum})</h3>
          <h3 onClick={props.handleclose}>X</h3>
        </div>
        <div className="modal__main">
          <p>Enter your code here</p>
          <div className="modal__input">
            {/* <form onSubmit={(e)=>formsubmit(e)}> */}
            <input type="text" ref={props.num1} onChange={digit1} maxLength={1}/>
            <input type="text" ref={props.num2} onChange={digit1} maxLength={1}/>
            <input type="text" ref={props.num3} onChange={digit1} maxLength={1}/>
            <input type="text" ref={props.num4} onChange={digit1} maxLength={1}/>
            <input type="text" ref={props.num5} onChange={digit1} maxLength={1}/>
            {/* </form> */}
          </div>
        </div>
        <p className={msgColor}>{message}</p>
        <div className="modal__bottom">
            <button onClick={props.random}>Resend one time password</button>
         <p>(4 attempts left)</p>
          <p>00:23</p>
        </div>
      </div>
    </Modal>
  );
};

export default OtpLayout;
