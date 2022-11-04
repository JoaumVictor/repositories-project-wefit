import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { useEffect } from "react";
import { getRepositories } from "../services/getRepositories";
import { useState, useContext } from "react";
import RepoCard from "../components/RepoCard";
import { IRepo } from "../services/types";
import {
  deleteFavoritesFromStorage,
  deleteUsernameFromStorage,
  getUserFromStorage,
} from "../services/storage";
import { DataContext } from "../context/DataProvider";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const [repos, setRepos] = useState([] as IRepo[]);
  const { username, loadingRepos, setLoadingRepos } = useContext(DataContext);

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
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={deleteFavoritesFromStorage}>
        <Text>Apagar todos os favoritos</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={deleteUsernameFromStorage}>
        <Text>Apagar o username do storage</Text>
      </TouchableOpacity>
      {loadingRepos ? (
        <View style={styles.awaitBox}>
          <ActivityIndicator size="large" color="#edcb44" />
        </View>
      ) : (
        <View style={styles.listBox}>
          <FlatList
            data={repos}
            style={styles.list}
            showsVerticalScrollIndicator={false}
            keyExtractor={({ full_name }) => full_name}
            renderItem={(item) => <RepoCard repo={item} />}
          />
        </View>
      )}
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
