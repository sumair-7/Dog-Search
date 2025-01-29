import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchDogs, getDogsByIds } from "../api";
import { useFavorites } from "../contexts/FavoritesContext";
import DogCard from "../components/DogCard";

function SearchPage() {
  const navigate = useNavigate();
  const { favorites, setFavorites } = useFavorites();
  const [sortField, setSortField] = useState("breed");
  const [sortDirection, setSortDirection] = useState("asc");
  const [from, setFrom] = useState(0);
  const [dogIds, setDogIds] = useState([]);
  const [total, setTotal] = useState(0);
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    (async () => {
      const size = 25;
      const result = await searchDogs({
        sort: `${sortField}:${sortDirection}`,
        size,
        from
      });
      setDogIds(result.resultIds);
      setTotal(result.total);
      setNextUrl(result.next || null);
      setPrevUrl(result.prev || null);
      const data = await getDogsByIds(result.resultIds);
      setDogs(data);
    })();
  }, [sortField, sortDirection, from]);

  const getFromValueFromUrl = (urlString) => {
    if (!urlString) return null;
    const url = new URL(urlString, "https://frontend-take-home-service.fetch.com");
    return url.searchParams.get("from");
  };

  const handleNextPage = () => {
    if (!nextUrl) return;
    const newFrom = getFromValueFromUrl(nextUrl);
    if (newFrom !== null) setFrom(Number(newFrom));
  };

  const handlePrevPage = () => {
    if (!prevUrl) return;
    const newFrom = getFromValueFromUrl(prevUrl);
    if (newFrom !== null) setFrom(Number(newFrom));
  };

  const handleToggleFavorite = (dogId) => {
    setFavorites((prev) =>
      prev.includes(dogId) ? prev.filter((id) => id !== dogId) : [...prev, dogId]
    );
  };

  return (
    <div className="main-container">
      <div className="search-controls">
        <button onClick={() => navigate("/locations")}>Go to Locations</button>
        <label>Sort:</label>
        <select
          value={sortField}
          onChange={(e) => {
            setSortField(e.target.value);
            setFrom(0);
          }}
        >
          <option value="breed">Breed</option>
          <option value="name">Name</option>
          <option value="age">Age</option>
        </select>
        <button
          onClick={() => {
            setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
            setFrom(0);
          }}
        >
          {sortDirection === "asc" ? "Ascending" : "Descending"}
        </button>
        <button onClick={() => navigate("/match")}>Go to Match</button>
      </div>
      <div className="search-pagination">
        <button onClick={handlePrevPage} disabled={!prevUrl}>
          Prev
        </button>
        <span>
          Showing {dogIds.length} of {total}
        </span>
        <button onClick={handleNextPage} disabled={!nextUrl}>
          Next
        </button>
      </div>
      <div className="search-dog-list">
        {dogs.map((dog) => (
          <DogCard
            key={dog.id}
            dog={dog}
            favorited={favorites.includes(dog.id)}
            onToggleFavorite={() => handleToggleFavorite(dog.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default SearchPage;
