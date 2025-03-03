import { useEffect } from "react";

export function getFavorites() {
  let favorites: string[] = [];
  useEffect(() => {
    favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  });
  return favorites;
}

export function setFavorites(favorites: string[]) {
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  });
}
