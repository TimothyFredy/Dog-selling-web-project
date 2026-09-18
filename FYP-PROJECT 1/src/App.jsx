import { Route, Routes,Navigate} from "react-router-dom";
import {useState} from "react" 
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import SecondSection from "./components/SecondSection";
import ThirdSection from "./components/ThirdSection";
import FourthSection from "./components/FourthSection";
import Footer from "./components/Footer";
import DogDetails from "./components/DogDetails";

import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage"
import CardList from "./components/CardList"


function HomePage() {
const [showLogin,setShowLogin]= useState(false);
const [showRegister,setShowRegister]=useState(false);

  return (
    <div className="App">
      <Header />

      <SecondSection />

      <ThirdSection />

      <FourthSection />
       <div className="b20">
      <button
          className="floatingButton"
          type="button"
          onClick={()=>setShowLogin(true)}
        >Login
        </button>
        
        </div>
      
      <Footer />
      {showLogin && (
        <LoginPage onClose={()=>setShowLogin(false)}
        onRegister={()=>{setShowLogin(false);
          setShowRegister(true);
        }}
      />
      )}
      {showRegister &&(
        <RegisterPage
        onClose={()=>setShowRegister(false)}
        />
      )}
</div>
  );
}

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dogs/:dogId" element={<DogDetails />} />
      <Route path="/CardList" element={sessionStorage.getItem("loggedIn")==="true"
        ?<CardList />
        :<Navigate to="/" replace/>
      }/>
    </Routes>
    <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>

    </>
  );
}

export default App;
