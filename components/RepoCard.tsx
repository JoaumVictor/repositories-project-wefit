import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

// owner.avatar_url
// full_name,
// description,
// owner,
// stargazers_count,
// language,
// html_url,

export default function RepoCard({ repo: { item } }: any) {
  const {
    full_name,
    description,
    owner,
    stargazers_count,
    language,
    html_url,
  } = item;

  console.log(description);

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
      <View style={styles.bottom}></View>
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
    height: "50%",
  },
  description: {
    fontSize: 16,
    color: "rgba(154, 154, 154, 1)",
  },
  bottom: {
    width: "100%",
    height: "25%",
  },
});
