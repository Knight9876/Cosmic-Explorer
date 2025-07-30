import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  TextInput,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { CelestialBody } from "../types";
import StarBackground from "../components/StarBackground";
import { fetchByCategory } from "../utils/fetchCategory";

type Props = NativeStackScreenProps<RootStackParamList, "Category">;

export default function CategoryScreen({ route, navigation }: Props) {
  const [bodies, setBodies] = useState<CelestialBody[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortDescending, setSortDescending] = useState(false);

  const bodyType = route.params.type;

  useEffect(() => {
    const loadData = async () => {
      try {
        const results = await fetchByCategory(bodyType);
        setBodies(results);
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [bodyType]);

  const filteredBodies = bodies
    .filter((body) =>
      body.englishName.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) =>
      sortDescending
        ? b.englishName.toLowerCase().localeCompare(a.englishName.toLowerCase())
        : a.englishName.toLowerCase().localeCompare(b.englishName.toLowerCase())
    );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <StarBackground />
        <ActivityIndicator size="large" color="#ffffff" />
        <Text style={styles.loadingText}>Loading {bodyType}...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <StarBackground />

      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor="#aaa"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity onPress={() => setSearchQuery("")}>
          <Text style={styles.closeIcon}>x</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSortDescending((prev) => !prev)}>
          <Text style={styles.searchIcon}>{sortDescending ? "🔽" : "🔼"}</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        contentContainerStyle={styles.listContent}
        data={filteredBodies}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={true}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() =>
              navigation.navigate("Details", {
                link: item.link,
                bodyType: item.bodyType,
                ...(typeof item.id === "number" ? { id: item.id } : {}),
              })
            }
          >
            <Text style={styles.itemText}>{item.englishName}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: "#0a0a0a",
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    color: "#ccc",
    marginTop: 10,
    fontSize: 16,
    fontFamily: "System",
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 8,
    margin: 16,
    paddingHorizontal: 12,
  },

  searchIcon: {
    fontSize: 18,
    color: "#aaa",
    marginRight: 8,
  },

  closeIcon: {
    fontSize: 28,
    color: "#fff",
    marginRight: 16,
    flex: 1,
    alignSelf: "center",
  },

  searchInput: {
    flex: 1,
    height: 40,
    color: "#fff",
  },

  listContent: {
    padding: 16,
  },

  item: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    borderColor: "#5ac8fa",
    borderWidth: 1,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    shadowColor: "#5ac8fa",
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
  },

  itemText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});
