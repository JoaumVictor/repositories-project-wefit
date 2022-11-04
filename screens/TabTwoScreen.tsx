import { useEffect, useContext } from "react";
import { StyleSheet, ActivityIndicator, Image, Alert } from "react-native";
import { FlatList } from "native-base";

import RepoCard from "../components/RepoCard";
import { Text, View } from "../components/Themed";
import { DataContext } from "../context/DataProvider";
import { getFavoritesFromStorage } from "../services/storage";
import ActionSheetSelectUsername from "./ActionSheetSelectUsername";

const EmptyRepos = () => {
  return (
    <View style={styles.empty}>
      <Image
        style={styles.image}
        source={require("../assets/monkeyError.png")}
      />
      <Text style={styles.emptyText}>Nenhum repositório favoritado!</Text>
    </View>
  );
};

export default function TabTwoScreen() {
  const {
    favorites,
    setFavorites,
    loadingRepos,
    setLoadingRepos,
    emptyRepos,
    usernameBox,
  } = useContext(DataContext);

  const awaitRepos = async () => {
    try {
      setLoadingRepos(true);
      const response = await getFavoritesFromStorage();
      if (response) {
        return setFavorites(JSON.parse(response));
      } else {
        setFavorites([]);
      }
    } catch (error) {
      Alert.alert("Opss", "Erro ao carregar seus repositórios!");
    } finally {
      setLoadingRepos(false);
    }
  };

  useEffect(() => {
    awaitRepos();
  }, []);

  return (
    <View style={styles.container}>
      {emptyRepos && <EmptyRepos />}
      {loadingRepos ? (
        <View style={styles.awaitBox}>
          <ActivityIndicator size={50} color="#edcb44" />
        </View>
      ) : (
        <View style={styles.listBox}>
          <FlatList
            data={favorites}
            style={styles.list}
            showsVerticalScrollIndicator={false}
            keyExtractor={({ full_name }) => full_name}
            renderItem={(item) => <RepoCard repo={item} />}
          />
        </View>
      )}
      {usernameBox && <ActionSheetSelectUsername />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#E5E5E5",
  },
  empty: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  emptyText: {
    fontSize: 18,
    color: "#c3c3c3",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  awaitBox: {
    height: "105%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  listBox: {
    width: "90%",
    backgroundColor: "transparent",
  },
  list: {
    width: "100%",
  },
});
