function Reviews() {
  const reviews = [
    {
      name: "Ahmed",
      text: "Beste kapper in de regio. Altijd vriendelijk en professioneel.",
    },
    {
      name: "Thomas",
      text: "Heel tevreden. Mooie fade en snelle service.",
    },
    {
      name: "Michael",
      text: "Topkwaliteit! Ik kom hier elke maand terug.",
    },
  ];

  return (
    <section className="reviews" id="reviews">
      <h2>Klanten Reviews</h2>

      <div className="reviews-grid">
        {reviews.map((review, index) => (
          <div className="review-card" key={index}>
            <div className="stars">★★★★★</div>

            <p>"{review.text}"</p>

            <h4>{review.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Reviews;