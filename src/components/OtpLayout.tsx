import { Modal } from "@mui/material";
import React, { useState } from "react";
type openProps = {
  open: boolean;
  handleclose: () => void;
  randomNum: number | undefined;
  random: () => void;
  num1: any;
  num2: any;
  num3: any;
  num4: any;
  num5: any;
  timersec: number;
  disable: boolean;
  attempts: number;
};
const OtpLayout = (props: openProps) => {
  const [message, setMessqe] = useState("Enter one time passcode");
  const [msgColor, setMsgcolor] = useState("error");
  // function for val match valid otp
  const digit1 = (e: any) => {
    let num1 = props.num1.current.value;
    let num2 = props.num2.current.value;
    let num3 = props.num3.current.value;
    let num4 = props.num4.current.value;
    let num5 = props.num5.current.value;
    let inpValu1 = e.target.value;
    if (!inpValu1.match(/^[0-9]*$/)) {
      alert("please enter number");
    } else {
      if (
        props.randomNum?.toString().split("")[0] == num1 &&
        props.randomNum?.toString().split("")[1] == num2 &&
        props.randomNum?.toString().split("")[2] == num3 &&
        props.randomNum?.toString().split("")[3] == num4 &&
        props.randomNum?.toString().split("")[4] == num5
      ) {
        setMsgcolor("success");
        setMessqe("opt Sent Successfull");
      } else {
        setMsgcolor("error");
        setMessqe(" one time passcode is incorrect!");
      }
    }
  };
  //  focus on next input after press enter button
  const nextInpFocus = (e: any, num1: any) => {
    if (e.key === "Enter") {
      num1.current.nextSibling.focus();
    }
  };
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
            <input
              type="text"
              ref={props.num1}
              onChange={digit1}
              name={props.num1}
              onKeyPress={(e) => nextInpFocus(e, props.num1)}
              maxLength={1}
            />
            <input
              type="text"
              ref={props.num2}
              onChange={digit1}
              maxLength={1}
              onKeyPress={(e) => nextInpFocus(e, props.num2)}
            />
            <input
              type="text"
              ref={props.num3}
              onChange={digit1}
              maxLength={1}
              onKeyPress={(e) => nextInpFocus(e, props.num3)}
            />
            <input
              type="text"
              ref={props.num4}
              onChange={digit1}
              maxLength={1}
              onKeyPress={(e) => nextInpFocus(e, props.num4)}
            />
            <input
              type="text"
              ref={props.num5}
              onChange={digit1}
              maxLength={1}
              onKeyPress={(e) => nextInpFocus(e, props.num5)}
            />
          </div>
        </div>
        <p className={msgColor}>{message}</p>
        <div className="modal__bottom">
          <button
            disabled={props.disable}
            onClick={props.random}
            className="modal__btn"
          >
            Resend one time password
          </button>
          <p>({props.attempts} attempts left)</p>
          <p className="error">{props.timersec} sec</p>
        </div>
      </div>
    </Modal>
  );
};

export default OtpLayout;
