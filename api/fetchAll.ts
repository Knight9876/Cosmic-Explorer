import { CelestialBody } from "../types";
import { fetchAsteroids } from "./fetchAsteroids";
import { fetchComets } from "./fetchComets";
import { fetchDwarfPlanets } from "./fetchDwarfPlanets";
import { fetchMoons } from "./fetchMoons";
import { fetchPlanets } from "./fetchPlanets";
import { fetchSatellites } from "./fetchSatellites";
import { fetchStars } from "./fetchStars";

export async function fetchAll(): Promise<CelestialBody[]> {
  const allResults = await Promise.all([
    fetchPlanets(),
    fetchMoons(),
    fetchAsteroids(),
    fetchComets(),
    fetchStars(),
    fetchSatellites(),
    fetchDwarfPlanets(),
  ]);

  const combined = allResults.flat();

  // Remove duplicates by 'id'
  const uniqueById = new Map<string, CelestialBody>();
  for (const body of combined) {
    if (!uniqueById.has(body.id)) {
      uniqueById.set(body.id, body);
    }
  }

  const uniqueBodies = Array.from(uniqueById.values());

  return uniqueBodies;
}
