import { Link } from "react-router-dom";


function Card({ id, image_url, details }) {
  return (
    <article className="card4">
      <div className="card4header">
        <img className="img7" src={image_url} alt={name} />
      </div>
      <div className="card4content">
        <h3>{details}</h3>
      </div>
      <Link className="b2" to={`/dogs/${id}`}>
        View More
      </Link>
    </article>
  );
}

export default Card;
