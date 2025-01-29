import React, { useState, useEffect, useCallback } from "react";
import { getLocationsByZipCodes, searchLocations } from "../api";

function LocationsPage() {
  const [zipInput, setZipInput] = useState("");
  const [zipCodesData, setZipCodesData] = useState([]);
  const [city, setCity] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [size] = useState(25);
  const [from, setFrom] = useState(0);

  const handleFetchLocations = async () => {
    if (!zipInput) return;
    const zipCodes = zipInput.split(",").map((z) => z.trim()).filter(Boolean);
    const data = await getLocationsByZipCodes(zipCodes);
    setZipCodesData(data);
  };

  const handleSearch = useCallback(async () => {
    const params = {
      city: city || undefined,
      states: stateCode ? [stateCode.toUpperCase()] : undefined,
      size,
      from
    };
    const { results, total } = await searchLocations(params);
    setSearchResults(results);
    setTotalResults(total);
  }, [city, stateCode, from, size]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  const handleNextPage = () => setFrom((prev) => prev + size);
  const handlePrevPage = () => setFrom((prev) => Math.max(0, prev - size));

  return (
    <div className="main-container">
      <h2>Locations</h2>
      <div className="locations-container">
        <h3>Fetch Locations by ZIP Codes</h3>
        <div className="locations-controls">
          <label>ZIP Code(s):</label>
          <input
            type="text"
            placeholder="e.g. 10001, 90210"
            value={zipInput}
            onChange={(e) => setZipInput(e.target.value)}
          />
          <button onClick={handleFetchLocations}>Fetch By ZIP</button>
        </div>
        <div style={{ marginTop: "1rem" }}>
          {zipCodesData.map((loc) => (
            <div key={loc.zip_code} className="location-card">
              <h4>{loc.city}, {loc.state}</h4>
              <p>ZIP: {loc.zip_code}</p>
              <p>Coordinates: ({loc.latitude}, {loc.longitude})</p>
              <p>County: {loc.county}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="locations-container" style={{ marginTop: "2rem" }}>
        <h3>Search Locations</h3>
        <div className="locations-controls">
          <label>City:</label>
          <input
            type="text"
            placeholder="e.g. New"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              setFrom(0);
            }}
          />
          <label>State (2-letter):</label>
          <input
            type="text"
            placeholder="e.g. NY"
            maxLength={2}
            value={stateCode}
            onChange={(e) => {
              setStateCode(e.target.value.toUpperCase());
              setFrom(0);
            }}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div className="locations-pagination">
          <button onClick={handlePrevPage} disabled={from === 0}>
            Prev
          </button>
          <span>Showing {searchResults.length} of {totalResults} (from: {from})</span>
          <button onClick={handleNextPage} disabled={from + size >= totalResults}>
            Next
          </button>
        </div>
        <div>
          {searchResults.map((loc) => (
            <div key={loc.zip_code} className="location-card">
              <h4>{loc.city}, {loc.state}</h4>
              <p>ZIP: {loc.zip_code}</p>
              <p>Coordinates: ({loc.latitude}, {loc.longitude})</p>
              <p>County: {loc.county}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LocationsPage;
