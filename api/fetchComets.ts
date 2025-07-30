import axios from "axios";
import { CelestialBody, Comet } from "../types";
import { fetchWikipediaData } from "./fetchWikipediaData";

export async function fetchComets(): Promise<CelestialBody[]> {
  try {
    const res = await axios.get(
      "https://api.le-systeme-solaire.net/rest/bodies?filter[]=bodyType,eq,Comet"
    );

    const comets: CelestialBody[] = res.data.bodies.map((body: any) => ({
      id: body.id,
      englishName: body.englishName,
      link: body.rel,
      bodyType: "comets",
    }));

    return comets;
  } catch (error) {
    console.error("Failed to fetch comet data:", error);
    return [];
  }
}

export async function transformToComet(link: string): Promise<Comet> {
  const response = await fetch(link);
  const data = await response.json();

  const name = data.englishName || data.name;

  const wikiInfo = await fetchWikipediaData(name);

  return {
    id: data.id,
    name,
    meanRadius: data.meanRadius || 0,
    dimension: data.dimension || "Unknown",
    mass: {
      value: data.mass?.massValue || 0,
      exponent: data.mass?.massExponent || 0,
    },
    density: data.density || 0,
    eccentricity: data.eccentricity || 0,
    semimajorAxis: data.semimajorAxis || 0,
    inclination: data.inclination || 0,
    axialTilt: data.axialTilt || 0,
    discoveredBy: data.discoveredBy || "Unknown",
    discoveryDate: data.discoveryDate || "Unknown",
    bodyType: data.bodyType || "Comet",
    image: wikiInfo?.thumbnail,
    description: wikiInfo?.extract,
  };
}
