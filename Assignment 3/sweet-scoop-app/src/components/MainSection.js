import { useEffect, useState } from 'react';
import flavors from '../flavors';
import reviews from '../reviews';

function pickRandomItems(items, count) {
  const shuffled = [...items].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function renderStars(rating) {
  const clampedRating = Math.max(0, Math.min(5, Math.round(rating)));
  return `${'★'.repeat(clampedRating)}${'☆'.repeat(5 - clampedRating)}`;
}

function MainSection() {
  const [featuredFlavors, setFeaturedFlavors] = useState([]);
  const [featuredReviews, setFeaturedReviews] = useState([]);

  useEffect(() => {
    setFeaturedFlavors(pickRandomItems(flavors, 3));
    setFeaturedReviews(pickRandomItems(reviews, 2));
  }, []);

  return (
    <main className="main-section">
      <section>
        <h2>About Sweet Scoop</h2>
        <p>
          Sweet Scoop is your one-stop ice cream shop where you can explore flavors,
          discover customer favorites, and enjoy a smooth ordering experience.
        </p>
      </section>

      <section>
        <h2>Featured Flavors</h2>
        <div className="flavor-grid">
          {featuredFlavors.map((flavor) => (
            <article className="flavor-card" key={flavor.id}>
              <img src={flavor.image} alt={flavor.name} />
              <h3>{flavor.name}</h3>
              <p>{flavor.description}</p>
              <p className="price">{flavor.price}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2>Customer Reviews</h2>
        <div className="review-grid">
          {featuredReviews.map((entry, index) => (
            <article className="review-card" key={`${entry.customerName}-${index}`}>
              <h3>{entry.customerName}</h3>
              <p>{entry.review}</p>
              <p className="rating">{renderStars(entry.rating)}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default MainSection;
