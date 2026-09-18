import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function LoginPage({ onClose, onRegister }) {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [error] = useState("");

  const navigate = useNavigate();

  const correctEmail = "admin@gmail.com";
  const correctPassword = "123456";

  const normalUser = "user@gmail.com";
  const normalUserPassword = "user#2020";

  function login(event) {
    event.preventDefault();
    if (Email === correctEmail && Password === correctPassword) {
      sessionStorage.setItem("loggedIn", "true");
      toast.success("login was successful");
      onClose();
      navigate("/CardList");
    } else if (Email !== correctEmail && Email !== normalUser) {
      toast.error("Incorrect email Address");
    } else if (Password !== correctEmail && Password !== normalUserPassword) {
      toast.error("Incorrect password");
    } else if (Email === normalUser && Password === normalUserPassword) {
      sessionStorage.setItem("loggedIn", "true");
      toast.success("Login was successful");
      onClose();
      navigate("/CardList");
    }
  }

  return (
    <div className="loginOverlay" onClick={onClose}>
      <div className="loginPopup" onClick={(event) => event.stopPropagation()}>
        <form onSubmit={login}>
          <p className="p30">Login</p>

          <div className="Section">
            <p className="par">Email Address</p>

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
            <p className="par">Password</p>

            <input
              className="bar"
              type="password"
              placeholder="Enter the password"
              value={Password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />

            {error && <p className="loginError">{error}</p>}

            <button className="loginButton" type="submit">
              Login
            </button>

            <button onClick={onRegister} className="registerLink">
              Self Registration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default LoginPage;
