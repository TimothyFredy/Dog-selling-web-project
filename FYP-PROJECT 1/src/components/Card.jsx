import { Link } from "react-router-dom";


function Card({ dog }) {
  return (
    <article className="card4">
      <div className="card4header">
        <img className="img7" src={dog.image_url} alt={name} />
      </div>
      <div className="card4content">
        <h3><span>ID:{dog.id}</span></h3>
        <h3>{dog.details}</h3>
        <h5 className="PriceDeco">Price:{dog.currency_code} {Number(dog.price).toLocaleString()}</h5>
      </div>
      <Link className="b2" to={`/dogs/${dog.id}`} state={{dog}}>
        View More
      </Link>
    </article>
  );
}

export default Card;
