import { useState } from 'react';

function FlavorItem({ flavor, onAddToOrder }) {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <article
      className="flavor-card"
      onMouseEnter={() => setShowDescription(true)}
      onMouseLeave={() => setShowDescription(false)}
    >
      <img src={flavor.image} alt={flavor.name} />
      <h3>{flavor.name}</h3>
      <p className="price">{flavor.price}</p>

      {showDescription ? <p>{flavor.description}</p> : null}

      <button type="button" onClick={() => onAddToOrder(flavor)}>
        Add to Order
      </button>
    </article>
  );
}

export default FlavorItem;
