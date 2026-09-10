
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import SecondSection from "./components/SecondSection";
import ThirdSection from "./components/ThirdSection";
import FourthSection from "./components/FourthSection";
import Footer from "./components/Footer";
import DogDetails from "./components/DogDetails";

function HomePage() {
  return (
    <div className="App">
      <Header />
      <SecondSection />
      <ThirdSection />
      <FourthSection />
      <Footer />
    </div>
  );
}

function App() {
  
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dogs/:dogId" element={<DogDetails />} />
     
    </Routes>
  );
}

export default App;
