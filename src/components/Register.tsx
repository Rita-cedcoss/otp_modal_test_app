import React from "react";
type registerProps = {
  modalopen: () => void;
};
const Register = (props: registerProps) => {
  return (
    <div className="registerOtp">
      <button className="btnOpen" onClick={props.modalopen}>
        Open
      </button>
    </div>
  );
};

export default Register;
