import { StyleSheet, FlatList } from "react-native";

import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { useEffect } from "react";
import { getRepositories } from "../services/getRepositories";
import { useState } from "react";
import RepoCard from "../components/RepoCard";
import { IRepo } from "../services/types";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const [loadingRepos, setLoadingRepos] = useState(true);
  const [failedToLoadRepos, setFailedToLoadRepos] = useState(false);
  const [repos, setRepos] = useState<IRepo[]>([] as IRepo[]);

  const username = "appswefit";

  const requestRepositories = async () => {
    try {
      setLoadingRepos(true);
      const response = await getRepositories(username);
      setRepos(response);
      console.log(response);
    } catch (error) {
      setFailedToLoadRepos(true);
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
      {loadingRepos ? (
        <Text>Carregando...</Text>
      ) : (
        <View style={styles.listBox}>
          <FlatList
            data={repos}
            style={styles.list}
            showsVerticalScrollIndicator={false}
            keyExtractor={({ id }) => String(id)}
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
  },
  listBox: {
    width: "90%",
    backgroundColor: "transparent",
    paddingTop: 20,
  },
  list: {
    width: "100%",
  },
});
