import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

import ActionSheetSelectUsername from "./ActionSheetSelectUsername";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { useEffect } from "react";
import { getRepositories } from "../services/getRepositories";
import { useState, useContext } from "react";
import RepoCard from "../components/RepoCard";
import { IRepo } from "../services/types";
import { deleteFavoritesFromStorage } from "../services/storage";
import { DataContext } from "../context/DataProvider";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const [repos, setRepos] = useState([] as IRepo[]);
  const {
    username,
    loadingRepos,
    setLoadingRepos,
    usernameBox,
    nameFavoriteRepos,
  } = useContext(DataContext);

  const requestRepositories = async () => {
    try {
      setLoadingRepos(true);
      const response = await getRepositories(username);
      setRepos(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingRepos(false);
    }
  };

  useEffect(() => {
    requestRepositories();
  }, [username]);

  return (
    <View style={styles.container}>
      {loadingRepos ? (
        <View style={styles.awaitBox}>
          <ActivityIndicator size="large" color="#edcb44" />
        </View>
      ) : (
        <View style={styles.listBox}>
          <FlatList
            data={repos.filter(
              (repo) => !nameFavoriteRepos.includes(repo.full_name)
            )}
            style={styles.list}
            showsVerticalScrollIndicator={false}
            keyExtractor={({ full_name }) => full_name}
            renderItem={(item) => <RepoCard possibleSave={true} repo={item} />}
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
    paddingBottom: 20,
  },
  awaitBox: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  errorBox: {
    alignItems: "center",
    justifyContent: "center",
  },
  listBox: {
    width: "90%",
    backgroundColor: "transparent",
    paddingTop: 20,
  },
  list: {
    width: "100%",
  },
  awaitImage: {
    width: 220,
    height: 220,
  },
});
