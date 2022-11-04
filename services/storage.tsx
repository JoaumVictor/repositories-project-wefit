import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY_USER = "@wefit:user";
const STORAGE_KEY_FAVORITES = "@wefit:favorites";

const setUserFromStorage = async (user: string) => {
  return await AsyncStorage.setItem(STORAGE_KEY_USER, user);
};

const getUserFromStorage = async () => {
  return await AsyncStorage.getItem(STORAGE_KEY_USER);
};

const setFavoritesFromStorage = async (favorites: string) => {
  return await AsyncStorage.setItem(STORAGE_KEY_FAVORITES, favorites);
};

const getFavoritesFromStorage = async () => {
  return await AsyncStorage.getItem(STORAGE_KEY_FAVORITES);
};

const deleteFavoritesFromStorage = async () => {
  return await AsyncStorage.removeItem(STORAGE_KEY_FAVORITES);
};

const deleteUsernameFromStorage = async () => {
  console.log("deletando favoritos");
  return await AsyncStorage.removeItem(STORAGE_KEY_USER);
};

export {
  setUserFromStorage,
  getUserFromStorage,
  setFavoritesFromStorage,
  getFavoritesFromStorage,
  deleteFavoritesFromStorage,
  deleteUsernameFromStorage,
};
