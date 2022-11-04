import { StyleSheet, FlatList, ActivityIndicator, Image } from "react-native";

import ActionSheetSelectUsername from "./ActionSheetSelectUsername";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { useEffect } from "react";
import { getRepositories } from "../services/getRepositories";
import { useState, useContext } from "react";
import RepoCard from "../components/RepoCard";
import { IRepo } from "../services/types";
import { DataContext } from "../context/DataProvider";
import NetInfo from "@react-native-community/netinfo";

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

  const [infoNet, setInfoNet] = useState(true);

  const handleGetNetInfo = async () => {
    NetInfo.fetch().then((state: any) => {
      console.log("Internet connection?", state.isConnected);
      setInfoNet(state.isConnected);
    });
  };

  const requestRepositories = async () => {
    try {
      setLoadingRepos(true);
      handleGetNetInfo;
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
          <ActivityIndicator size={50} color="#edcb44" />
        </View>
      ) : (
        <View style={styles.content}>
          {infoNet ? (
            <View style={styles.listBox}>
              <FlatList
                data={repos.filter(
                  (repo) => !nameFavoriteRepos.includes(repo.full_name)
                )}
                style={styles.list}
                showsVerticalScrollIndicator={false}
                keyExtractor={({ full_name }) => full_name}
                renderItem={(item) => (
                  <RepoCard possibleSave={true} repo={item} />
                )}
              />
            </View>
          ) : (
            <View style={styles.noSignal}>
              <Image
                style={styles.image}
                source={require("../assets/monkeyError.png")}
              />
              <Text style={styles.noSignalText}>Opss, algo deu errado.</Text>
              <Text style={styles.noSignalText}>
                Verifique sua conexão com a internet!
              </Text>
            </View>
          )}
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
  noSignal: {
    height: "105%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  noSignalText: {
    fontSize: 18,
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
  content: {
    width: "100%",
    height: "100%",
    backgroundColor: "#E5E5E5",
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  errorBox: {
    alignItems: "center",
    justifyContent: "center",
  },
  listBox: {
    width: "100%",
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
