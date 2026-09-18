import { useState } from "react";

function RegisterPage({ onClose }) {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  function register(event) {
    event.preventDefault();

    // Registration code will go here
  }

  return (
    <div
      className="loginOverlay"
      onClick={onClose}
    >
      <div
        className="loginPopup"
        onClick={(event) => event.stopPropagation()}
      >

        <form onSubmit={register}>

          <p className="p30">Register</p>

          <div className="Section">
            <p className="par">Set Email Address</p>

            <input
              className="bar"
              type="text"
              placeholder="Enter your Email Address"
              value={Email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </div>

          <div className="Section">
            <p className="par">Set Password</p>

            <input
              className="bar"
              type="password"
              placeholder="Enter the password"
              value={Password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />

            <button
              className="registerButton"
              type="submit"
            >
              Register
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default RegisterPage;