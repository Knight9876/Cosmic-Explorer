export interface CelestialBody {
  image?: string;
  description?: string;
  id: string;
  englishName: string;
  gravity?: number;
  mass?: {
    massValue: number;
    massExponent: number;
  };
  discoveryDate?: string;
  isPlanet?: boolean;
  link: string;
  bodyType: string;
}

export interface Asteroid {
  image?: string;
  description?: string;
  id: string;
  name: string;
  alternativeName?: string;
  discoveredBy: string;
  discoveryDate: string;
  dimension?: string;
  meanRadius: number;
  semimajorAxis?: number;
  eccentricity?: number;
  inclination?: number;
  bodyType: string;
  moons?: {
    moon: string;
    rel: string;
  }[];
  url: string;
}

export interface Planet {
  image?: string;
  description?: string;
  id: string;
  name: string;
  gravity: number;
  mass: { value: number; exponent: number };
  volume: { value: number; exponent: number };
  density: number;
  escapeVelocity: number;
  meanRadius: number;
  equatorialRadius: number;
  polarRadius: number;
  flattening: number;
  rotationPeriod: number;
  orbitalPeriod: number;
  semimajorAxis: number;
  perihelion: number;
  aphelion: number;
  eccentricity: number;
  inclination: number;
  axialTilt: number;
  avgTemp: number;
  discoveredBy: string;
  discoveryDate: string;
  moons: { name: string; link: string }[];
}

export interface Moon {
  image?: string;
  description?: string;
  id: string;
  name: string;
  gravity: number;
  mass: {
    value: number;
    exponent: number;
  };
  volume: {
    value: number;
    exponent: number;
  };
  density: number;
  escapeVelocity: number;
  meanRadius: number;
  equatorialRadius: number;
  polarRadius: number;
  flattening: number;
  rotationPeriod: number;
  orbitalPeriod: number;
  semimajorAxis: number;
  perihelion: number;
  aphelion: number;
  eccentricity: number;
  inclination: number;
  axialTilt: number;
  avgTemp: number;
  discoveredBy: string;
  discoveryDate: string;
  orbitingPlanet: string; // new field from aroundPlanet
}

export interface Comet {
  image?: string;
  description?: string;
  id: string;
  name: string;
  meanRadius: number;
  dimension: string;
  mass: {
    value: number;
    exponent: number;
  };
  density: number;
  eccentricity: number;
  semimajorAxis: number;
  inclination: number;
  axialTilt: number;
  discoveredBy: string;
  discoveryDate: string;
  bodyType: string;
}

export interface Star {
  image?: string;
  description?: string;
  id: string;
  name: string;
  mass: {
    value: number;
    exponent: number;
  };
  volume: {
    value: number;
    exponent: number;
  };
  density: number;
  gravity: number;
  escapeVelocity: number;
  meanRadius: number;
  equatorialRadius: number;
  polarRadius: number;
  flattening: number;
  axialTilt: number;
  avgTemp: number;
  sideralRotation: number;
  discoveredBy: string;
  discoveryDate: string;
}

export interface Satellite {
  image?: string;
  description?: string;
  id: number;
  name: string;
  tleLine: string;
  latitude: number;
  longitude: number;
  altitude: number;
  elevation: number;
  timestamp: number;
  launchDate?: string; // N2YO doesn’t provide this in TLE, but we can leave it for later enhancement
  category?: string;
}

export interface DwarfPlanet {
  image?: string;
  description?: string;
  id: string;
  name: string;
  englishName: string;
  alternativeName?: string;
  discoveredBy: string;
  discoveryDate: string;
  moons?: {
    moon: string;
    rel: string;
  }[];
  semimajorAxis?: number;
  perihelion?: number;
  aphelion?: number;
  eccentricity?: number;
  inclination?: number;
  mass?: {
    massValue: number;
    massExponent: number;
  };
  vol?: {
    volValue: number;
    volExponent: number;
  };
  density?: number;
  gravity?: number;
  escape?: number;
  meanRadius?: number;
  sideralOrbit?: number;
  sideralRotation?: number;
  avgTemp?: number;
  bodyType: string;
  url: string;
}
