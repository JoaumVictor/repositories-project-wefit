import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useContext, useEffect } from "react";
import { DataContext } from "../context/DataProvider";
import { TextInput } from "react-native-paper";
import { setUserFromStorage } from "../services/storage";

export default function ActionSheetSelectUsername() {
  const { setUsername, username, setUsernameBox } = useContext(DataContext);
  const [text, setText] = React.useState("");

  useEffect(() => {
    setText(username);
  }, []);

  return (
    <View style={styles.shadow}>
      <View style={styles.container}>
        <View style={styles.detail} />
        <Text style={styles.title}>Alterar usuário selecionado</Text>
        <TextInput
          label="Usuário"
          style={styles.input}
          value={text}
          onChangeText={(text) => setText(text)}
        />
        <View style={styles.bottomBox}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setUsernameBox(false)}
          >
            <Text style={styles.cancelButtonText}>CANCELAR</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setUsername(text);
              setUserFromStorage(text);
              setUsernameBox(false);
            }}
            style={styles.saveButton}
          >
            <Text style={styles.saveButtonText}>SALVAR</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    backgroundColor: "rgba(0,0,0,0.5)",
    height: "120%",
    width: "100%",
    position: "absolute",
    bottom: -15,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  container: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    paddingHorizontal: "5%",
    paddingBottom: 20,
    height: "30%",
    width: "100%",
  },
  detail: {
    width: "10%",
    height: 5,
    backgroundColor: "#E5E5E5",
    borderRadius: 10,
    marginVertical: 20,
    marginLeft: "45%",
  },
  title: {
    fontSize: 16,
  },
  closeBox: {
    width: "100%",
    alignItems: "flex-end",
    paddingRight: 10,
  },
  closeText: {
    color: "#E0E0E0",
  },
  input: {
    width: "100%",
    height: 50,
    marginVertical: 15,
  },
  bottomBox: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#ffffff",
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButtonText: {
    color: "#1976D2",
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#1976D2",
    elevation: 5,
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    borderRadius: 10,
  },
  saveButtonText: {
    color: "#ffffff",
    fontSize: 16,
  },
});
