import React from "react";

function DogCard({ dog, favorited, onToggleFavorite }) {
  const { img, name, age, breed, zip_code } = dog;
  return (
    <div className="dog-card">
      <img className="dog-image" src={img} alt={name} />
      <div className="dog-info">
        <h4>{name}</h4>
        <p>Breed: {breed}</p>
        <p>Age: {age}</p>
        <p>Zip: {zip_code}</p>
      </div>
      <button onClick={onToggleFavorite}>
        {favorited ? "Remove from favorite" : "Add to Favorite"}
      </button>
    </div>
  );
}

export default DogCard;
