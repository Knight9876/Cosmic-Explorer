import axios from "axios";
import Constants from "expo-constants";
import { CelestialBody, Satellite } from "../types";
import { fetchWikipediaData } from "./fetchWikipediaData";

const apiKey = Constants?.expoConfig?.extra?.N2YO_API_KEY;

export async function fetchSatellites(
  lat: number = 0,
  lon: number = 0,
  categoryId: number = 0,
  radiusKm: number = 10000
): Promise<CelestialBody[]> {
  try {
    const url = `https://api.n2yo.com/rest/v1/satellite/above/${lat}/${lon}/0/${radiusKm}/${categoryId}/`;

    const res = await axios.get(url, {
      params: { apiKey },
    });

    const satellites: CelestialBody[] = res.data.above.map((b: any) => ({
      id: b.satid,
      englishName: b.satname,
      link: `https://www.n2yo.com/satellite/?s=${b.satid}`, // Optional: create a link to satellite detail
      bodyType: "satellites",
    }));

    return satellites;
  } catch (error) {
    console.error("Failed to fetch satellites:", error);
    return [];
  }
}

// Fetch TLE and real-time position, then return a clean Satellite object
export async function transformToSatellite(
  satelliteId: number,
  observerLat: number = 0,
  observerLon: number = 0,
  observerAlt: number = 0
): Promise<Satellite | null> {
  try {
    // Fetch TLE data
    const tleRes = await axios.get(
      `https://api.n2yo.com/rest/v1/satellite/tle/${satelliteId}`,
      {
        params: { apiKey },
      }
    );

    // Fetch position data (next 1 second just to get current position)
    const posRes = await axios.get(
      `https://api.n2yo.com/rest/v1/satellite/positions/${satelliteId}/${observerLat}/${observerLon}/${observerAlt}/1`,
      {
        params: { apiKey },
      }
    );

    const tle = tleRes.data;
    const position = posRes.data.positions[0];

    const name = tle.info.satname;

    const wikiInfo = await fetchWikipediaData(name);

    return {
      id: tle.info.satid,
      name,
      tleLine: tle.tle,
      latitude: position.satlatitude,
      longitude: position.satlongitude,
      altitude: position.sataltitude,
      elevation: position.elevation,
      timestamp: position.timestamp,
      category: tle.category || undefined,
      image: wikiInfo?.thumbnail,
      description: wikiInfo?.extract,
    };
  } catch (error) {
    console.error(
      `Failed to transform satellite with ID ${satelliteId}`,
      error
    );
    return null;
  }
}
