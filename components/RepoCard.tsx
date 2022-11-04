import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import React, { useContext } from "react";
import { DataContext } from "../context/DataProvider";

export default function RepoCard({ repo: { item } }: any) {
  const {
    full_name,
    description,
    owner,
    stargazers_count,
    language,
    // html_url,
  } = item;

  const { addNewRepoInFavorites, setLoadingRepos } = useContext(DataContext);

  const formatFullNameFromRepo = (name: string) => {
    const nameSplit = name.split("/");
    const repoName = () =>
      nameSplit[1].length > 19
        ? `${nameSplit[1].slice(0, 19)}...`
        : nameSplit[1];
    return (
      <View style={styles.fullName}>
        <Text style={styles.repoName}>{nameSplit[0]}/</Text>
        <Text style={styles.repoNameSlash}>{repoName()}</Text>
      </View>
    );
  };

  const saveRepo = () => {
    try {
      setLoadingRepos(true);
      const repo: any = {
        full_name,
        description,
        owner,
        stargazers_count,
        language,
      };
      addNewRepoInFavorites(repo);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingRepos(false);
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        {formatFullNameFromRepo(full_name)}
        <Image style={styles.avatar} source={{ uri: owner.avatar_url }} />
      </View>
      <View style={styles.bar} />
      <View style={styles.middle}>
        <Text style={styles.description}>{description}</Text>
      </View>
      <View style={styles.bottom}>
        <TouchableOpacity
          onPress={saveRepo}
          style={styles.favorite}
          activeOpacity={0.6}
        >
          <FontAwesome name="star" size={16} color="#FFD700" />
          <Text style={styles.favoriteText}>Favoritar</Text>
        </TouchableOpacity>
        <View style={styles.star}>
          <FontAwesome name="star" size={24} color="#FFD700" />
          <Text style={styles.starValue}>{stargazers_count}</Text>
        </View>
        {language && (
          <View style={styles.language}>
            <View style={styles.point} />
            <Text>{language}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    elevation: 2,
    borderRadius: 6,
    width: "100%",
    height: 200,
    padding: 10,
    marginBottom: 20,
    marginTop: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "25%",
  },
  fullName: {
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "nowrap",
    width: "80%",
  },
  repoName: {
    fontSize: 16,
  },
  repoNameSlash: {
    fontSize: 16,
    fontWeight: "bold",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 25,
  },
  bar: {
    width: "100%",
    height: 1,
    backgroundColor: "#E5E5E5",
    marginVertical: 10,
  },
  middle: {
    width: "100%",
    height: "40%",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  description: {
    fontSize: 16,
    color: "rgba(154, 154, 154, 1)",
  },
  bottom: {
    width: "100%",
    height: "25%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "nowrap",
  },
  favorite: {
    height: 40,
    backgroundColor: "#FAF3DC",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "33%",
  },
  favoriteText: {
    color: "rgba(255, 208, 44, 1)",
    fontSize: 14,
    marginLeft: 5,
  },
  star: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
  },
  starValue: {
    fontSize: 16,
    marginLeft: 5,
  },
  language: {
    flexDirection: "row",
    alignItems: "center",
    width: "30%",
  },
  point: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ff2c2c",
    marginRight: 5,
  },
});
