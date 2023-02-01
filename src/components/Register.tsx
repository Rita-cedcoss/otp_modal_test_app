import React from "react";
type registerProps = {
  modalopen: () => void;
  disable: boolean;
};
const Register = (props: registerProps) => {
  return (
    <div className="registerOtp">
      <button
        disabled={props.disable}
        className="btnOpen"
        onClick={props.modalopen}
      >
        Validate Otp
      </button>
    </div>
  );
};

export default Register;
