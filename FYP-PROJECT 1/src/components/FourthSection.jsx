import Card from "./Card";
import { useState, useEffect } from "react";
const API_URL= import.meta.env.VITE_API_URL

function createCard(dog) {
  
  return (
    <Card key={dog.id} id={dog.id} image_url={dog.image_url} details={dog.details} />
  );
}

function FourthSection() {
  
  const [dogs, getDogMethod] = useState([]);
  useEffect(() => {
    fetch(`${API_URL}/dogs`)
      .then((response) => response.json())
      .then((data) => {
      //  console.log(data
        getDogMethod(data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <section className="FourthSection">
      <div className="MainContent">
        <h1 className="TitleOne">What we offer is</h1>
        <h2 className="TitleTwo">Simple and affordable pricing for dogs.</h2>
        <div className="cardsGrid">{dogs.map(createCard)}</div>
      </div>
    </section>
  );
}

export default FourthSection;
