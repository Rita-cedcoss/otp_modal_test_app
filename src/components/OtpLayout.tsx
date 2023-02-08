import { Modal } from "@mui/material";
import React, { SetStateAction, useEffect, useRef, useState } from "react";
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
let inpArr: any = [];
const OtpLayout = (props: OtpLayoutProps) => {
  const [massage, setMessage] = useState("");
  const [inpBorder, setInpborder] = useState("");
  let [attempts, setAttempts] = useState<any>(4);
  const [msgColor, setMsgColor] = useState("");
  const refArr = useRef<any>([]);
  //for close modal
  const handleclose = () => {
    setInpborder("inpborder1");
    setMessage("");
    setAttempts(4);
    props.setFlag(false);
  };
  //useEffect for focus on input
  useEffect(() => {
    setTimeout(() => refArr.current[0].focus(), 300);
  }, [attempts]);
  // resend opt
  const resentOtp = () => {
    setMessage("Resend Otp Successfully");
    setTimeout(()=>{
      setMessage("");
    },1000)
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
    } 
    if(attempts==0)
    {
      props.setDisabled(true); 
    }
    setAttempts(attempts);
  };
  // input Handler
  const inputHandler = (e: any, i: number) => {
    setMessage("");
    setInpborder("");
    if (e.target.value.match(/[0-9]/)) {
      refArr.current[i].value = e.target.value;
      if (i < refArr.current.length - 1) refArr.current[i + 1].focus();
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
          setMessage("One Time passcode is matched!");
          setMsgColor("successMsg");
          setInpborder("success");
        } else {
          setMessage("One Time Passcode is Not matched !");
          setInpborder("inpborder");
          setMsgColor("errorMsg");
        }
      }
    } else {
      e.target.value = "";
    }
  };
  //for back to previous input
  const backInputHandler = (e: any, i: number) => {
    console.log(inpArr[i], refArr.current[i].value);
    if (e.key == "Backspace") {
      if (refArr.current[i].value == "") {
        refArr.current[i - 1].focus();
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
                      onKeyDown={(e) => backInputHandler(e, i)}
                      maxLength={1}
                    />
                  </>
                );
              })}
          </div>
        </div>
        <p className={`${msgColor} ps-5  `}>
          {massage == "One Time passcode is matched!" ? (
            <img
              alt=""
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
            className="border-0"
            onClick={resentOtp}
            disabled={props.disabled}
          >
            Resend one time password
          </button>
          <p className="pt-3">({attempts} attempts left)</p>
          <p className="error pt-3 errorMsg">00:{props.timerSec==0?'00':props.timerSec}</p>
        </div>
      </div>
    </Modal>
  );
};

export default OtpLayout;
