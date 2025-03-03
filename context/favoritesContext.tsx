"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type FavoritesContextType = {
  favorites: string[];
  toggleFavorite: (eventName: string) => void;
  isInitialized: boolean; // Add this
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isInitialized, setIsInitialized] = useState(false); // Track initialization

  // Load favorites from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
    setIsInitialized(true); // Mark as initialized
  }, []);

  // Save to localStorage when favorites change (after initialization)
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites, isInitialized]);

  const toggleFavorite = (eventName: string) => {
    setFavorites((prev) =>
      prev.includes(eventName)
        ? prev.filter((name) => name !== eventName)
        : [...prev, eventName]
    );
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isInitialized }} // Provide isInitialized
    >
      {children}
    </FavoritesContext.Provider>
  );
}

// Update the useFavorites hook to include isInitialized
export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
