import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import description from "./Description";

const API_URL= import.meta.env.VITE_API_URL;

function DogDetails() {
  const [dogs, getDogMethod] = useState([]);
  useEffect(() => {
    fetch(`${API_URL}/dogs`)
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        getDogMethod(data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const { dogId } = useParams();
  const dog = dogs.find((item) => item.id === Number(dogId));
  const [quantity, setQuantity] = useState(0);

  if (!dog) {
    return (
      <main className="dogPage notFound">
        <h1>Dog not found</h1>
        <Link className="backLink" to="/">
          Back to dogs
        </Link>
      </main>
    );
  }
const dogDescription = description.find((item) =>item.id===dog.id);
  function addToCart() {
    setQuantity((currentQuantity) => currentQuantity + 1);
  }

  return (
    <main className="dogPage">
      <nav className="dogNav">
        <Link className="brand" to="/" aria-label="Tiny Dog home">
          <span>Tiny Dog</span>
        </Link>
        <Link className="backLink" to="/">
          ← Back to dogs
        </Link>
      </nav>

      <section className="dogDetailCard">
        <div className="dogImagePanel">
          <img className="img7" src={dog.image_url} alt={dog.name} />
        </div>

        <div className="dogInformation">
          <p className="smallLabel">Name</p>
          <h1>{dog.name}</h1>

          <p className="smallLabel">Description</p>
          <p className="dogDescription">{dogDescription.info}</p>

          <div className="purchaseControls">
            <span className="priceBox">{dog.price}</span>

            <button className="addCartButton" type="button" onClick={addToCart}>
              Add to cart
            </button>
            <button
              className="quantityButton"
              type="button"
              onClick={addToCart}
              aria-label="Add one dog to cart"
            >
              +
            </button>
          </div>
        </div>
      </section>

      <section className="cartSection" aria-live="polite">
        <h2>Your cart</h2>
        {quantity === 0 ? (
          <p className="emptyCart">Your cart is empty.</p>
        ) : (
          <div className="cartRow">
            <img src={dog.image_url} alt="" />
            <div className="cartName">
              <strong>{dog.name} </strong>
              <span>{dog.price*quantity}</span>
            </div>
            <div className="cartQuantity">
              <span>Qty: {quantity}</span>
              <button
                type="button"
                onClick={addToCart}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>
        )}
        
      </section>
    </main>
  );
}

export default DogDetails;
