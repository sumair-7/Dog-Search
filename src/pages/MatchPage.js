import React, { useState } from "react";
import { useFavorites } from "../contexts/FavoritesContext";
import { getDogsByIds, getMatch } from "../api";

function MatchPage() {
  const { favorites } = useFavorites();
  const [matchedDog, setMatchedDog] = useState(null);

  const handleMatch = async () => {
    if (!favorites.length) return;
    const { match } = await getMatch(favorites);
    if (!match) return;
    const data = await getDogsByIds([match]);
    setMatchedDog(data[0] || null);
  };

  return (
    <div className="main-container">
      <h2>Match</h2>
      <p>Favorites: {favorites.length}</p>
      <button onClick={handleMatch} disabled={!favorites.length}>
        Generate Match
      </button>
      {matchedDog && (
        <div className="matched-dog">
          <h4>Your Match</h4>
          <p><strong>Name:</strong> {matchedDog.name}</p>
          <p><strong>Breed:</strong> {matchedDog.breed}</p>
          <p><strong>Age:</strong> {matchedDog.age}</p>
          <p><strong>Zip Code:</strong> {matchedDog.zip_code}</p>
          <img
            src={matchedDog.img}
            alt={matchedDog.name}
            style={{ width: "100%", marginTop: "0.5rem" }}
          />
        </div>
      )}
    </div>
  );
}

export default MatchPage;
