import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import LoginPage from "./pages/LoginPage";
import SearchPage from "./pages/SearchPage";
import LocationsPage from "./pages/LocationsPage";
import MatchPage from "./pages/MatchPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <FavoritesProvider>
      <Routes>
        <Route
          path="/login"
          element={<LoginPage onLoginSuccess={() => setIsLoggedIn(true)} />}
        />
        <Route
          path="/search"
          element={isLoggedIn ? <SearchPage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/locations"
          element={isLoggedIn ? <LocationsPage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/match"
          element={isLoggedIn ? <MatchPage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="*"
          element={isLoggedIn ? <Navigate to="/search" replace /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </FavoritesProvider>
  );
}

export default App;
