import axios from "axios";
import { Asteroid, CelestialBody } from "../types";
import { fetchWikipediaData } from "./fetchWikipediaData";

export async function fetchAsteroids(): Promise<CelestialBody[]> {
  try {
    const res = await axios.get(
      "https://api.le-systeme-solaire.net/rest/bodies",
      {
        params: { "filter[]": ["bodyType,eq,Asteroid"] },
        paramsSerializer: (params) =>
          new URLSearchParams(params as Record<string, string>).toString(),
      }
    );

    const asteroids: CelestialBody[] = res.data.bodies.map((b: any) => ({
      id: b.id,
      englishName: b.englishName.split(" ")[1] || b.name.split(" ")[1],
      link: b.rel,
      bodyType: "asteroids",
    }));

    return asteroids;
  } catch (error) {
    console.error("Failed to fetch asteroids:", error);
    return [];
  }
}

export async function transformToAsteroid(link: string): Promise<Asteroid> {
  try {
    const response = await axios.get(link);
    const data = response.data;

    const name = data.englishName || data.name;

    const wikiInfo = await fetchWikipediaData(name);

    return {
      id: data.id,
      name,
      alternativeName: data.alternativeName || undefined,
      discoveredBy: data.discoveredBy,
      discoveryDate: data.discoveryDate,
      dimension: data.dimension || undefined,
      meanRadius: data.meanRadius,
      semimajorAxis: data.semimajorAxis || undefined,
      eccentricity: data.eccentricity || undefined,
      inclination: data.inclination || undefined,
      bodyType: data.bodyType,
      moons: data.moons || [],
      url: data.rel,
      image: wikiInfo?.thumbnail,
      description: wikiInfo?.extract,
    };
  } catch (error) {
    console.error(`Failed to fetch asteroid details from ${link}`, error);
    throw error;
  }
}
