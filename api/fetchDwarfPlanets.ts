import axios from "axios";
import { CelestialBody, DwarfPlanet } from "../types";
import { fetchWikipediaData } from "./fetchWikipediaData";

export async function fetchDwarfPlanets(): Promise<CelestialBody[]> {
  try {
    const res = await axios.get(
      "https://api.le-systeme-solaire.net/rest/bodies",
      {
        params: { "filter[]": ["bodyType,eq,Dwarf Planet"] },
        paramsSerializer: (params) =>
          new URLSearchParams(params as Record<string, string>).toString(),
      }
    );

    const dwarfs: CelestialBody[] = res.data.bodies.map((b: any) => ({
      id: b.id,
      englishName: b.englishName.split(" ")[1] || b.englishName.split(" ")[0],
      link: b.rel,
      bodyType: "dwarfs",
    }));

    return dwarfs;
  } catch (error) {
    console.error("Failed to fetch dwarf planets:", error);
    return [];
  }
}

export async function transformToDwarfPlanet(
  link: string
): Promise<DwarfPlanet> {
  try {
    const response = await axios.get(link);
    const data = response.data;

    const name = data.englishName || data.name;

    const wikiInfo = await fetchWikipediaData(name);

    return {
      id: data.id,
      name,
      englishName:
        data.englishName.split(" ")[1] || data.englishName.split(" ")[0],
      alternativeName: data.alternativeName || undefined,
      discoveredBy: data.discoveredBy,
      discoveryDate: data.discoveryDate,
      moons: data.moons || [],
      semimajorAxis: data.semimajorAxis,
      perihelion: data.perihelion,
      aphelion: data.aphelion,
      eccentricity: data.eccentricity,
      inclination: data.inclination,
      mass: data.mass,
      vol: data.vol,
      density: data.density,
      gravity: data.gravity,
      escape: data.escape,
      meanRadius: data.meanRadius,
      sideralOrbit: data.sideralOrbit,
      sideralRotation: data.sideralRotation,
      avgTemp: data.avgTemp,
      bodyType: data.bodyType,
      url: data.rel,
      image: wikiInfo?.thumbnail,
      description: wikiInfo?.extract,
    };
  } catch (error) {
    console.error(`Failed to fetch dwarf planet details from ${link}`, error);
    throw error;
  }
}
