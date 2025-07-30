import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import StarBackground from "../components/StarBackground";
import { transformToAsteroid } from "../api/fetchAsteroids";
import {
  Asteroid,
  Comet,
  DwarfPlanet,
  Moon,
  Planet,
  Satellite,
  Star,
} from "../types";
import { transformToPlanet } from "../api/fetchPlanets";
import { transformToMoon } from "../api/fetchMoons";
import { transformToComet } from "../api/fetchComets";
import { transformToStar } from "../api/fetchStars";
import { transformToDwarfPlanet } from "../api/fetchDwarfPlanets";
import { transformToSatellite } from "../api/fetchSatellites";
import { GlobalDisclaimer } from "../components/GlobalDisclaimer";

type Props = {
  route: { params: { link: string; bodyType: string; id?: number } };
};

export default function DetailScreen({ route }: Props) {
  const [asteroidData, setAsteroidData] = useState<Asteroid | null>(null);
  const [planetData, setPlanetData] = useState<Planet | null>(null);
  const [moonData, setMoonData] = useState<Moon | null>(null);
  const [cometData, setCometData] = useState<Comet | null>(null);
  const [starData, setStarData] = useState<Star | null>(null);
  const [satelliteData, setSatelliteData] = useState<Satellite | null>(null);
  const [dwarfData, setDwarfData] = useState<DwarfPlanet | null>(null);
  const [loading, setLoading] = useState(true);
  const detailLink = route?.params?.link;
  const bodyType = route?.params?.bodyType;
  const satelliteId = route?.params?.id;

  useEffect(() => {
    const load = async () => {
      try {
        let result;

        switch (bodyType) {
          case "asteroids":
            result = await transformToAsteroid(detailLink);
            setAsteroidData(result);
            break;

          case "planets":
            result = await transformToPlanet(detailLink);
            setPlanetData(result);
            break;

          case "moons":
            result = await transformToMoon(detailLink);
            setMoonData(result);
            break;

          case "comets":
            result = await transformToComet(detailLink);
            setCometData(result);
            break;

          case "stars":
            result = await transformToStar(); // No link needed for the Sun
            setStarData(result);
            break;

          case "satellites":
            result = await transformToSatellite(satelliteId!);
            setSatelliteData(result);
            break;

          case "dwarfs":
            result = await transformToDwarfPlanet(detailLink);
            setDwarfData(result);
            break;

          default:
            throw new Error(`Unsupported body type: ${bodyType}`);
        }
      } catch (err) {
        console.error("Failed to load details:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [detailLink, bodyType]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <StarBackground />
        <ActivityIndicator size="large" color="#ffffff" />
        <Text style={styles.loadingText}>Loading details...</Text>
      </View>
    );
  }

  if (
    !asteroidData &&
    !planetData &&
    !moonData &&
    !cometData &&
    !starData &&
    !satelliteData &&
    !dwarfData
  ) {
    return (
      <View style={styles.loadingContainer}>
        <StarBackground />
        <Text style={styles.loadingText}>No data found for this body.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StarBackground />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
      >
        {bodyType === "planets" && planetData && (
          <>
            <Text style={styles.title}>{planetData?.name}</Text>

            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri:
                    planetData.name === "Mercury"
                      ? "https://imgs.search.brave.com/_lNKtf5lARW8HfuVeA4CIpHgzWZQfPLccbl0vc2iN3o/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLm5h/dGdlb2ZlLmNvbS9u/L2M2ZjdjZWU5LWNk/ZTYtNDRhMi1hNjg2/LTlhODBmNWJmYzFl/OC8wMV9tZXJjdXJ5/X3BpYTE1MTkwX29y/aWcuanBn"
                      : planetData.image, // fallback to original image
                }}
                style={styles.image}
                resizeMode="cover"
              />
            </View>

            <Text style={styles.description}>
              {planetData.name === "Mercury"
                ? `Mercury is the first planet from the Sun and the smallest in the Solar System. It is a rocky planet with a trace atmosphere and a surface gravity slightly higher than that of Mars. The surface of Mercury is similar to Earth's Moon, heavily cratered, with expansive rupes system, generated from thrust faults, and bright ray systems, formed by ejecta. Its largest crater, Caloris Planitia, has a diameter of 1,550 km (960 mi), which is about one-third the diameter of the planet (4,880 km or 3,030 mi). Being the most inferior orbiting planet it appears in Earth's sky, always close to the Sun, either as a "morning star" or an "evening star". It stays most of the time the closest to all other planets and is the planet with the highest delta-v needed to travel to from all other planets of the Solar System.`
                : planetData.description}
            </Text>

            <Info label="Gravity" value={`${planetData?.gravity} m/s²`} />

            {planetData?.mass?.value && (
              <Info
                label="Mass"
                value={`${planetData.mass.value} × 10^${planetData.mass.exponent} kg`}
              />
            )}

            {planetData?.volume?.value && (
              <Info
                label="Volume"
                value={`${planetData.volume.value} × 10^${planetData.volume.exponent} km³`}
              />
            )}

            {planetData?.density && (
              <Info label="Density" value={`${planetData?.density} g/cm³`} />
            )}

            <Info label="Mean Radius" value={`${planetData?.meanRadius} km`} />

            {planetData?.equatorialRadius && (
              <Info
                label="Equatorial Radius"
                value={`${planetData.equatorialRadius.toLocaleString()} km`}
              />
            )}

            {planetData?.polarRadius && (
              <Info
                label="Polar Radius"
                value={`${planetData.polarRadius.toLocaleString()} km`}
              />
            )}

            {planetData?.flattening && (
              <Info label="Flattening" value={`${planetData.flattening}`} />
            )}

            {planetData?.discoveredBy && (
              <Info label="Discovered By" value={planetData.discoveredBy} />
            )}

            {planetData?.discoveryDate && (
              <Info label="Discovery Date" value={planetData.discoveryDate} />
            )}

            {planetData?.rotationPeriod && (
              <Info
                label="Rotation Period"
                value={`${planetData.rotationPeriod} hours`}
              />
            )}

            {planetData?.orbitalPeriod && (
              <Info
                label="Orbital Period"
                value={`${planetData.orbitalPeriod} days`}
              />
            )}

            {planetData?.semimajorAxis && (
              <Info
                label="Semi-Major Axis"
                value={`${planetData.semimajorAxis.toLocaleString()} km`}
              />
            )}

            {planetData?.eccentricity && (
              <Info label="Eccentricity" value={`${planetData.eccentricity}`} />
            )}

            {planetData?.inclination && (
              <Info label="Inclination" value={`${planetData.inclination}°`} />
            )}

            {planetData?.axialTilt && (
              <Info label="Axial Tilt" value={`${planetData.axialTilt}°`} />
            )}

            {planetData?.perihelion && (
              <Info
                label="Perihelion"
                value={`${planetData.perihelion.toLocaleString()} km`}
              />
            )}

            {planetData?.aphelion && (
              <Info
                label="Aphelion"
                value={`${planetData.aphelion.toLocaleString()} km`}
              />
            )}

            {planetData?.avgTemp && (
              <Info label="Average Temp" value={`${planetData.avgTemp} K`} />
            )}

            {planetData?.escapeVelocity && (
              <Info
                label="Escape Velocity"
                value={`${planetData.escapeVelocity.toLocaleString()} m/s`}
              />
            )}

            {planetData?.moons?.length > 0 && (
              <Info
                label="Moons"
                value={planetData.moons.map((m) => m.name).join(", ")}
              />
            )}
          </>
        )}

        {bodyType === "moons" && moonData && (
          <>
            <Text style={styles.title}>{moonData.name}</Text>

            {moonData.image && (
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: moonData.image }}
                  style={styles.image}
                  resizeMode="cover"
                />
              </View>
            )}

            {moonData.description && (
              <Text style={styles.description}>{moonData.description}</Text>
            )}

            <Info
              label="Orbiting Planet"
              value={
                moonData.orbitingPlanet
                  ? moonData.orbitingPlanet.charAt(0).toUpperCase() +
                    moonData.orbitingPlanet.slice(1)
                  : ""
              }
            />

            <Info label="Gravity" value={`${moonData.gravity} m/s²`} />

            <Info
              label="Mass"
              value={`${moonData.mass.value} × 10^${moonData.mass.exponent} kg`}
            />

            <Info
              label="Volume"
              value={`${moonData.volume.value} × 10^${moonData.volume.exponent} km³`}
            />

            <Info label="Density" value={`${moonData.density} g/cm³`} />

            <Info
              label="Escape Velocity"
              value={`${moonData.escapeVelocity} m/s`}
            />

            <Info label="Mean Radius" value={`${moonData.meanRadius} km`} />

            <Info
              label="Equatorial Radius"
              value={`${moonData.equatorialRadius} km`}
            />

            <Info label="Polar Radius" value={`${moonData.polarRadius} km`} />

            <Info label="Flattening" value={`${moonData.flattening}`} />

            <Info
              label="Rotation Period"
              value={`${moonData.rotationPeriod} hours`}
            />

            <Info
              label="Orbital Period"
              value={`${moonData.orbitalPeriod} days`}
            />

            <Info
              label="Semi-Major Axis"
              value={`${moonData.semimajorAxis} km`}
            />

            <Info label="Perihelion" value={`${moonData.perihelion} km`} />

            <Info label="Aphelion" value={`${moonData.aphelion} km`} />

            <Info label="Eccentricity" value={`${moonData.eccentricity}`} />

            <Info label="Inclination" value={`${moonData.inclination}°`} />

            <Info label="Axial Tilt" value={`${moonData.axialTilt}°`} />

            <Info label="Average Temperature" value={`${moonData.avgTemp} K`} />

            <Info label="Discovered By" value={moonData.discoveredBy} />

            <Info label="Discovery Date" value={moonData.discoveryDate} />
          </>
        )}

        {bodyType === "asteroids" && asteroidData && (
          <>
            <Text style={styles.title}>{asteroidData.name}</Text>

            {asteroidData.image && (
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: asteroidData.image }}
                  style={styles.image}
                  resizeMode="cover"
                />
              </View>
            )}

            {asteroidData.description && (
              <Text style={styles.description}>{asteroidData.description}</Text>
            )}

            <Info
              label="Alternative Name"
              value={asteroidData.alternativeName || "—"}
            />

            <Info
              label="Discovered By"
              value={asteroidData.discoveredBy || "—"}
            />

            <Info
              label="Discovery Date"
              value={asteroidData.discoveryDate || "—"}
            />

            {asteroidData.dimension && (
              <Info label="Dimensions" value={asteroidData.dimension} />
            )}

            <Info
              label="Mean Radius"
              value={
                asteroidData.meanRadius
                  ? `${asteroidData.meanRadius.toLocaleString()} km`
                  : "—"
              }
            />

            {asteroidData.semimajorAxis && (
              <Info
                label="Semi-Major Axis"
                value={`${asteroidData.semimajorAxis.toLocaleString()} km`}
              />
            )}

            {asteroidData.eccentricity !== undefined && (
              <Info
                label="Eccentricity"
                value={asteroidData.eccentricity.toFixed(3)}
              />
            )}

            {asteroidData.inclination !== undefined && (
              <Info
                label="Inclination"
                value={`${asteroidData.inclination.toFixed(2)}°`}
              />
            )}

            {asteroidData.moons && asteroidData.moons.length > 0 && (
              <Info
                label="Moons"
                value={asteroidData.moons.map((m) => m.moon).join(", ")}
              />
            )}
          </>
        )}

        {bodyType === "comets" && cometData && (
          <>
            <Text style={styles.title}>{cometData.name}</Text>

            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri:
                    cometData.name === "Shoemaker-Levy 9"
                      ? "https://imgs.search.brave.com/LBUxEJ-NBYvI6coTtHMx4QS9OjUr7o9nltMe4Up6TAI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9raWRz/LmtpZGRsZS5jby9p/bWFnZXMvdGh1bWIv/Ny83MS9TaG9lbWFr/ZXItTGV2eV85X29u/XzE5OTQtMDUtMTcu/cG5nLzMwMHB4LVNo/b2VtYWtlci1MZXZ5/Xzlfb25fMTk5NC0w/NS0xNy5wbmc"
                      : cometData.image, // fallback to original image
                }}
                style={
                  cometData.name === "Shoemaker-Levy 9"
                    ? styles.shoemaker
                    : styles.image
                }
                // resizeMode="cover"
              />
            </View>

            {cometData.description && (
              <Text style={styles.description}>{cometData.description}</Text>
            )}

            <Info label="Mean Radius" value={`${cometData.meanRadius} km`} />

            <Info label="Dimensions" value={cometData.dimension} />

            <Info
              label="Mass"
              value={`${cometData.mass.value} × 10^${cometData.mass.exponent} kg`}
            />

            <Info label="Density" value={`${cometData.density} g/cm³`} />

            <Info label="Eccentricity" value={`${cometData.eccentricity}`} />

            <Info
              label="Semi-Major Axis"
              value={`${cometData.semimajorAxis.toLocaleString()} km`}
            />

            <Info label="Inclination" value={`${cometData.inclination}°`} />

            <Info label="Axial Tilt" value={`${cometData.axialTilt}°`} />

            <Info label="Discovered By" value={cometData.discoveredBy} />

            <Info label="Discovery Date" value={cometData.discoveryDate} />
          </>
        )}

        {bodyType === "stars" && starData && (
          <>
            <Text style={styles.title}>Sun</Text>

            {starData.image && (
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: starData.image }}
                  style={styles.image}
                  resizeMode="cover"
                />
              </View>
            )}

            {starData.description && (
              <Text style={styles.description}>{starData.description}</Text>
            )}

            <Info label="Mean Radius" value={`${starData.meanRadius} km`} />

            <Info
              label="Equatorial Radius"
              value={`${starData.equatorialRadius} km`}
            />

            {starData.polarRadius ? (
              <Info label="Polar Radius" value={`${starData.polarRadius} km`} />
            ) : null}

            <Info
              label="Mass"
              value={`${starData.mass.value} × 10^${starData.mass.exponent} kg`}
            />

            <Info
              label="Volume"
              value={`${starData.volume.value} × 10^${starData.volume.exponent} km³`}
            />

            <Info label="Density" value={`${starData.density} g/cm³`} />

            <Info label="Gravity" value={`${starData.gravity} m/s²`} />

            <Info
              label="Escape Velocity"
              value={`${starData.escapeVelocity} m/s`}
            />

            <Info label="Axial Tilt" value={`${starData.axialTilt}°`} />

            <Info
              label="Sidereal Rotation"
              value={`${starData.sideralRotation} hours`}
            />

            <Info label="Discovered By" value={starData.discoveredBy} />

            <Info label="Discovery Date" value={starData.discoveryDate} />
          </>
        )}

        {bodyType === "satellites" && satelliteData && (
          <>
            <Text style={styles.title}>{satelliteData.name}</Text>

            {satelliteData.image && (
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: satelliteData.image }}
                  style={styles.image}
                  resizeMode="cover"
                />
              </View>
            )}

            {satelliteData.description && (
              <Text style={styles.description}>
                {satelliteData.description}
              </Text>
            )}

            <Info label="NORAD ID" value={satelliteData.id.toString()} />

            {satelliteData.category && (
              <Info label="Category" value={satelliteData.category} />
            )}

            <Info
              label="Latitude"
              value={`${satelliteData.latitude.toFixed(4)}°`}
            />

            <Info
              label="Longitude"
              value={`${satelliteData.longitude.toFixed(4)}°`}
            />

            <Info
              label="Altitude"
              value={`${satelliteData.altitude.toFixed(2)} km`}
            />

            {satelliteData.elevation !== undefined && (
              <Info
                label="Elevation"
                value={`${satelliteData.elevation.toFixed(2)}°`}
              />
            )}

            <Info
              label="Timestamp"
              value={new Date(satelliteData.timestamp * 1000).toLocaleString()}
            />

            <Info label="TLE" value={satelliteData.tleLine} />

            {satelliteData.launchDate && (
              <Info label="Launch Date" value={satelliteData.launchDate} />
            )}

            <Text style={styles.disclaimerText}>
              Disclaimer: This satellite data is based on a fixed observer
              location at 0° latitude, 0° longitude (sea level). It may not
              reflect real-time visibility from your actual location.
              {"\n"}
            </Text>
          </>
        )}

        {bodyType === "dwarfs" && dwarfData && (
          <>
            <Text style={styles.title}>{dwarfData.name}</Text>

            {dwarfData.image && (
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: dwarfData.image }}
                  style={styles.image}
                  resizeMode="cover"
                />
              </View>
            )}

            {dwarfData.description && (
              <Text style={styles.description}>{dwarfData.description}</Text>
            )}

            {dwarfData.alternativeName && (
              <Info
                label="Alternative Name"
                value={dwarfData.alternativeName}
              />
            )}

            <Info label="Discovered By" value={dwarfData.discoveredBy || "—"} />

            <Info
              label="Discovery Date"
              value={dwarfData.discoveryDate || "—"}
            />

            {dwarfData.meanRadius !== undefined && (
              <Info
                label="Mean Radius"
                value={`${dwarfData.meanRadius.toLocaleString()} km`}
              />
            )}

            {dwarfData.mass && (
              <Info
                label="Mass"
                value={`${dwarfData.mass.massValue} × 10^${dwarfData.mass.massExponent} kg`}
              />
            )}

            {dwarfData.vol && (
              <Info
                label="Volume"
                value={`${dwarfData.vol.volValue} × 10^${dwarfData.vol.volExponent} km³`}
              />
            )}

            {dwarfData.density !== undefined && (
              <Info
                label="Density"
                value={`${dwarfData.density.toFixed(2)} g/cm³`}
              />
            )}

            {dwarfData.gravity !== undefined && (
              <Info
                label="Surface Gravity"
                value={`${dwarfData.gravity.toFixed(2)} m/s²`}
              />
            )}

            {dwarfData.escape !== undefined && (
              <Info
                label="Escape Velocity"
                value={`${dwarfData.escape.toLocaleString()} m/s`}
              />
            )}

            {dwarfData.semimajorAxis && (
              <Info
                label="Semi-Major Axis"
                value={`${dwarfData.semimajorAxis.toLocaleString()} km`}
              />
            )}

            {dwarfData.perihelion && (
              <Info
                label="Perihelion"
                value={`${dwarfData.perihelion.toLocaleString()} km`}
              />
            )}

            {dwarfData.aphelion && (
              <Info
                label="Aphelion"
                value={`${dwarfData.aphelion.toLocaleString()} km`}
              />
            )}

            {dwarfData.eccentricity !== undefined && (
              <Info
                label="Eccentricity"
                value={dwarfData.eccentricity.toFixed(5)}
              />
            )}

            {dwarfData.inclination !== undefined && (
              <Info
                label="Inclination"
                value={`${dwarfData.inclination.toFixed(2)}°`}
              />
            )}

            {dwarfData.sideralOrbit && (
              <Info
                label="Orbital Period"
                value={`${dwarfData.sideralOrbit.toLocaleString()} days`}
              />
            )}

            {dwarfData.sideralRotation && (
              <Info
                label="Rotation Period"
                value={`${dwarfData.sideralRotation.toFixed(2)} hours`}
              />
            )}

            {dwarfData.avgTemp !== undefined && (
              <Info
                label="Average Temperature"
                value={`${dwarfData.avgTemp} K`}
              />
            )}

            {dwarfData.moons && dwarfData.moons.length > 0 && (
              <Info
                label="Moons"
                value={dwarfData.moons.map((m) => m.moon).join(", ")}
              />
            )}
          </>
        )}
        <GlobalDisclaimer />
      </ScrollView>
    </View>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.section}>
      <Text style={styles.label}>{label}:</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
    padding: 20,
  },

  scrollContent: {
    paddingBottom: 0,
  },

  loadingContainer: {
    flex: 1,
    backgroundColor: "#0a0a0a",
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    fontFamily: "System",
    color: "#ffffff",
    marginTop: 10,
    fontSize: 16,
  },

  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 24,
  },

  imageContainer: {
    alignItems: "center",
    marginBottom: 16,
  },

  image: {
    width: 200,
    height: 200,
    resizeMode: "contain"
  },
  
  shoemaker: {
    width: 500,
    height: 100,
  },

  description: {
    color: "#ccc",
    fontSize: 14,
    marginBottom: 20,
    lineHeight: 20,
  },

  section: {
    marginBottom: 20,
  },

  label: {
    fontSize: 16,
    color: "#888",
    marginBottom: 4,
  },

  value: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "500",
  },

  disclaimerText: {
    fontSize: 14,
    color: "#444",
    lineHeight: 20,
    fontStyle: "italic",
  },
});
