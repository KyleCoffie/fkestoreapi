import React from 'react';

interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const stars: React.ReactNode[] = [];
  for (let i = 1; i <= 5; i++) {
    const starValue = i <= rating ? 'full' : i - 1 < rating ? 'partial' : 'empty';
    stars.push(
      <span key={i} className={`star ${starValue}`} >
        &#9733;
      </span>
    );
  }

  return <div className="star-rating">{stars}</div>;
};

export default StarRating;
