import axios from "axios";
import { CelestialBody, Moon } from "../types";
import { fetchWikipediaData } from "./fetchWikipediaData";

export async function fetchMoons(): Promise<CelestialBody[]> {
  try {
    const res = await axios.get(
      "https://api.le-systeme-solaire.net/rest/bodies?filter[]=aroundPlanet,neq,null"
    );

    const moons: CelestialBody[] = res.data.bodies.map((body: any) => ({
      id: body.id,
      englishName: body.englishName,
      link: body.rel,
      bodyType: "moons",
    }));

    return moons;
  } catch (error) {
    console.error("Failed to fetch moon data:", error);
    return [];
  }
}

export async function transformToMoon(link: string): Promise<Moon> {
  const response = await fetch(link);
  const data = await response.json();

  const name = data.englishName || data.name;

  const wikiInfo = await fetchWikipediaData(name);

  return {
    id: data.id,
    name,
    gravity: data.gravity,
    mass: {
      value: data.mass?.massValue,
      exponent: data.mass?.massExponent,
    },
    volume: {
      value: data.vol?.volValue,
      exponent: data.vol?.volExponent,
    },
    density: data.density,
    escapeVelocity: data.escape,
    meanRadius: data.meanRadius,
    equatorialRadius: data.equaRadius,
    polarRadius: data.polarRadius,
    flattening: data.flattening,
    rotationPeriod: data.sideralRotation,
    orbitalPeriod: data.sideralOrbit,
    semimajorAxis: data.semimajorAxis,
    perihelion: data.perihelion,
    aphelion: data.aphelion,
    eccentricity: data.eccentricity,
    inclination: data.inclination,
    axialTilt: data.axialTilt,
    avgTemp: data.avgTemp,
    discoveredBy: data.discoveredBy || "Unknown",
    discoveryDate: data.discoveryDate || "Unknown",
    orbitingPlanet: data.aroundPlanet?.planet || "Unknown",
    image: wikiInfo?.thumbnail,
    description: wikiInfo?.extract,
  };
}
