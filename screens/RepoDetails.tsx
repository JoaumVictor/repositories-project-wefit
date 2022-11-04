import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { WebView } from "react-native-webview";
import { FontAwesome } from "@expo/vector-icons";

import { DataContext } from "../context/DataProvider";

export default function RepoDetails() {
  const {
    actualRepo,
    nameFavoriteRepos,
    removeRepoInFavorites,
    setLoadingRepos,
    addNewRepoInFavorites,
  } = useContext(DataContext);
  const [goUrl, setGoUrl] = useState(false);
  const [url, setUrl] = useState("");
  const { full_name, description, language, html_url } = actualRepo;

  useEffect(() => {
    setUrl(html_url);
  }, [html_url]);

  const saveRepoInFavorites = () => {
    try {
      setLoadingRepos(true);
      addNewRepoInFavorites(actualRepo);
    } catch (error) {
      Alert.alert("Opss", "Erro ao salvar o repositório");
    } finally {
      setLoadingRepos(false);
    }
  };

  const formatFullNameFromRepo = (name: string) => {
    const nameSplit = name.split("/");
    return (
      <View style={styles.fullName}>
        <Text style={styles.repoName}>{nameSplit[0]}/</Text>
        <Text style={styles.repoNameSlash}>{nameSplit[1]}</Text>
      </View>
    );
  };

  if (goUrl) {
    return <WebView source={{ uri: url }} style={{ marginTop: 20 }} />;
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.box}>
          {formatFullNameFromRepo(full_name)}
          <Text style={styles.gray}>{description}</Text>
          <Text style={styles.gray}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce porta
            magna sit amet ante faucibus sodales. Ut tempor massa risus, vel
            consectetur diam efficitur in. Suspendisse ut enim augue. Donec
            ullamcorper odio in tellus feugiat venenatis. Phasellus eleifend
            nisl neque, a pulvinar nisl mattis ac. Phasellus vitae velit eu dui
            tempus ullamcorper eget ut metus. Proin vestibulum sodales justo,
            vitae iaculis ipsum volutpat a. Nam vel leo vitae leo volutpat
            varius.
          </Text>
          {language && (
            <View style={styles.language}>
              <View style={styles.point} />
              <Text>{language}</Text>
            </View>
          )}
        </View>
        <View style={styles.bottomBox}>
          <TouchableOpacity
            onPress={() => setGoUrl(true)}
            style={styles.repositoryButton}
          >
            <Text style={styles.repositoryButtonText}>VER REPOSITÓRIO</Text>
            <FontAwesome name="link" size={20} color="rgba(25, 118, 210, 1)" />
          </TouchableOpacity>
          {nameFavoriteRepos.includes(full_name) ? (
            <TouchableOpacity
              onPress={() => removeRepoInFavorites(full_name)}
              style={styles.unfavoriteButton}
            >
              <Text style={styles.favoriteButtonText}>DESFAVORITAR</Text>
              <FontAwesome name="star-o" size={24} color="#000000" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={saveRepoInFavorites}
              style={styles.favoriteButton}
            >
              <Text style={styles.favoriteButtonText}>FAVORITAR</Text>
              <FontAwesome name="star-o" size={24} color="#000000" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "rgba(154, 154, 154, 1)",
    height: "100%",
    width: "100%",
  },
  box: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingBottom: 20,
    height: "60%",
    width: "100%",
  },
  fullName: {
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    marginVertical: 20,
    width: "80%",
  },
  repoName: {
    fontSize: 18,
  },
  repoNameSlash: {
    fontSize: 18,
    fontWeight: "bold",
  },
  gray: {
    color: "rgba(154, 154, 154, 1)",
    fontSize: 16,
    marginVertical: 20,
  },
  language: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    width: "30%",
  },
  point: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ff2c2c",
    marginRight: 5,
  },
  bottomBox: {
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "column",
    flexWrap: "nowrap",
    width: "100%",
    height: "15%",
    position: "absolute",
    bottom: 50,
    backgroundColor: "#ffffff",
  },
  repositoryButton: {
    backgroundColor: "#ffffff",
    width: "80%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  repositoryButtonText: {
    color: "rgba(25, 118, 210, 1)",
    marginRight: 10,
  },
  favoriteButton: {
    backgroundColor: "#fcd031",
    width: "90%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 8,
    elevation: 5,
  },
  unfavoriteButton: {
    backgroundColor: "transparent",
    width: "90%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 8,
    borderWidth: 1,
  },
  favoriteButtonText: {
    color: "#000000",
    marginRight: 10,
    fontWeight: "bold",
  },
});
