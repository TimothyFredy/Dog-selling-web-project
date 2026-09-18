import Card from "./Card";
import { useState, useEffect } from "react";
const API_URL= import.meta.env.VITE_API_URL

function createCard(dog) {
  
  return (
    <Card key={dog.id} dog={dog} />
  );
}

function FourthSectioned({refreshKey}) {
  
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
  }, [refreshKey]);

  return (
    <section className="FourthSection">
      <div className="MainContent">
        <div className="cardsGrid">{dogs.map(createCard)}</div>
      </div>
    </section>
  );
}

export default FourthSectioned;
