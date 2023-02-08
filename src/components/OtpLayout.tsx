import { Message } from "@mui/icons-material";
import { Modal } from "@mui/material";
import React, { SetStateAction, useEffect, useRef, useState } from "react";
// import "../App.css"
type OtpLayoutProps = {
  flag: boolean;
  random: number | undefined;
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setFlag: React.Dispatch<React.SetStateAction<boolean>>;
  otpGenerate: () => void;
  timerSec: number;
  setTimer: React.Dispatch<React.SetStateAction<number>>;
  disabled: boolean;
};
const OtpLayout = (props: OtpLayoutProps) => {
  const [massage, setMessage] = useState("");
  const [inpBorder, setInpborder] = useState("");
  let [attempts, setAttempts] = useState<any>(4);
  const [msgColor, setMsgColor] = useState("");
  const refArr = useRef<any>([]);
  const handleclose = () => {
    setInpborder("inpborder1");
    setMessage("");
    setAttempts(4);
    props.setFlag(false);
  };
  //  useEffect for focus timer
  useEffect(() => {
    setTimeout(() => refArr.current[0].focus(), 300);
  }, [attempts]);
  // resend opt
  const resentOtp = () => {
    setMessage("Resend Otp Successfully");
    setMsgColor("resendMsg");
    setInpborder("");
    refArr.current.map((item: any) => {
      item.value = "";
    });
    props.setDisabled(true);
    if (attempts > 0) {
      attempts--;
      props.otpGenerate();
      props.setTimer(59);
    } else {
      props.setDisabled(true);
    }
    setAttempts(attempts);
  };
  // input Handler
  const inputHandler = (e: any, i: number) => {
    setMessage("");
    setInpborder("");
    let inpArr: any = [];
    if (e.target.value.match(/[0-9]/)) {
      refArr.current[i].value = e.target.value;
      if (i < refArr.current.length - 1) {
        refArr.current[i + 1]?.focus();
      }
      console.log(refArr.current[i].value);
      let count = true;
      refArr.current.map((item: any, i: any) => {
        if (item.value == "") {
          setMessage("");
          count = false;
        }
      });
      if (count) {
        setInpborder("inpborder1");
        refArr.current.map((item: any) => {
          inpArr.push(item.value);
        });
        if (inpArr.join("") == props.random) {
          setTimeout(() => {
            props.setFlag(false);
            setMessage("");
            setInpborder("");
          }, 1000);
          setMessage("otp matched!");
          setMsgColor("successMsg");
          setInpborder("success");
        } else {
          setMessage("opt Not matched !");
          setInpborder("inpborder");
          setMsgColor("errorMsg");
        }
      }
    } else {
      e.target.value = "";
    }
  };
  // backinput Handler
  const backInputHandler = (e: any,i:number) => {
    console.log(e.key);
    if(e.key=="Backspace"){
      if(refArr.current[i].value!=="" && e.key=="Backspace")
      {
          refArr.current[i-1].focus();
      }
      if(refArr.current[i].value==''){
          refArr.current[i-1].focus(); 
      } 
    }
  };
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
            {props.random
              ?.toString()
              .split("")
              .map((item, i) => {
                return (
                  <>
                    <input
                      className={`${inpBorder}`}
                      type="text"
                      ref={(ref) => (refArr.current[i] = ref)}
                      onChange={(e) => inputHandler(e, i)}
                      onKeyUp={(e) => backInputHandler(e,i)}
                      maxLength={1}
                    />
                  </>
                );
              })}
          </div>
        </div>
        <p className={`${msgColor} ps-5  `}>
          {massage == "otp matched!" ? (
            <img
              height="70px"
              width="150px"
              src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921"
            />
          ) : (
            ""
          )}
          {massage}
        </p>
        <div className="modal__bottom">
          <button
            className="modal__btn"
            onClick={resentOtp}
            disabled={props.disabled}
          >
            Resend one time password
          </button>
          <p className="pt-3">({attempts} attempts left)</p>
          <p className="error pt-3 errorMsg">{props.timerSec} sec</p>
        </div>
      </div>
    </Modal>
  );
};

export default OtpLayout;
