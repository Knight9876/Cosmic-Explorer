import { fetchAsteroids } from "../api/fetchAsteroids";
import { fetchPlanets } from "../api/fetchPlanets";
import { fetchMoons } from "../api/fetchMoons";
import { fetchComets } from "../api/fetchComets";
import { fetchStars } from "../api/fetchStars";
import { fetchSatellites } from "../api/fetchSatellites";
import { fetchDwarfPlanets } from "../api/fetchDwarfPlanets";
import { CelestialBody } from "../types";
import { fetchAll } from "../api/fetchAll";

export async function fetchByCategory(type: string): Promise<CelestialBody[]> {
  switch (type) {
    case "asteroids":
      return fetchAsteroids();

    case "comets":
      return fetchComets();

    case "planets":
      return fetchPlanets();

    case "moons":
      return fetchMoons();

    case "stars":
      return fetchStars();

    case "satellites":
      return fetchSatellites();

    case "dwarfs":
      return fetchDwarfPlanets();

    case "all":
       return fetchAll();

    default:
      return [];
  }
}
