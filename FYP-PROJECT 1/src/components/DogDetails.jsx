import { useState} from "react";
import { Link, useLocation} from "react-router-dom";


function DogDetails() {
  const location = useLocation();
  const dog = location.state?.dog;
  
  const [quantity, setQuantity] = useState(0);

  if (!dog) {
    return (
      <main className="dogPage notFound">
        <h1>Dog not found</h1>
        <Link className="backLink" to="/homepage">
          Back to dogs
        </Link>
      </main>
    );
  }

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
          <img className="img8" src={dog.image_url} alt={dog.name} />
        </div>

        <div className="dogInformation">
          <p className="smallLabel">Name</p>
          <h1>{dog.name}</h1>

          <p className="smallLabel">Description</p>
          <p className="dogDescription">{dog.details}</p>

          <div className="purchaseControls">
            <span className="priceBox">{dog.currency_code} {Number(dog.price).toLocaleString()}</span>

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
              <span>{dog.currency_code}</span>
              <span>{Number(dog.price*quantity).toLocaleString()}</span>
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
      <div className="CartDiv">
      <button className="toCart"> Proceed to Cart </button>
      </div>
    </main>
  );
}

export default DogDetails;
