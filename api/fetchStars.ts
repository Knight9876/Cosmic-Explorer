import { CelestialBody, Star } from "../types";
import { fetchWikipediaData } from "./fetchWikipediaData";

export async function fetchStars(): Promise<CelestialBody[]> {
  const stars: CelestialBody[] = [
    {
      id: "soleil",
      englishName: "Sun",
      link: "https://api.le-systeme-solaire.net/rest/bodies/soleil",
      bodyType: "stars",
    },
  ];

  return stars;
}

export async function transformToStar(): Promise<Star> {
  const res = await fetch(
    "https://api.le-systeme-solaire.net/rest/bodies/soleil"
  );
  const data = await res.json();

  const name = data.englishName || data.name;

  const wikiInfo = await fetchWikipediaData(name);

  return {
    id: data.id,
    name,
    mass: {
      value: data.mass?.massValue,
      exponent: data.mass?.massExponent,
    },
    volume: {
      value: data.vol?.volValue,
      exponent: data.vol?.volExponent,
    },
    density: data.density,
    gravity: data.gravity,
    escapeVelocity: data.escape,
    meanRadius: data.meanRadius,
    equatorialRadius: data.equaRadius,
    polarRadius: data.polarRadius,
    flattening: data.flattening,
    axialTilt: data.axialTilt,
    avgTemp: data.avgTemp,
    sideralRotation: data.sideralRotation,
    discoveredBy: data.discoveredBy || "Unknown",
    discoveryDate: data.discoveryDate || "Unknown",
    image: wikiInfo?.thumbnail,
    description: wikiInfo?.extract,
  };
}
