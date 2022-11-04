import React, { useState, createContext, useEffect } from "react";
import { getRepositories } from "../services/getRepositories";
import {
  getFavoritesFromStorage,
  getUserFromStorage,
  setFavoritesFromStorage,
  setUserFromStorage,
} from "../services/storage";
import { IRepo } from "../services/types";

export const DataContext = createContext({} as DataContextT);

export type providerProps = {
  children: React.ReactNode;
};

export type DataContextT = {
  favorites: IRepo[];
  setFavorites: React.Dispatch<React.SetStateAction<IRepo[]>>;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  loadingRepos: boolean;
  setLoadingRepos: (condition: boolean) => void;
  addNewRepoInFavorites: (repo: IRepo) => void;
  emptyRepos: boolean;
  usernameBox: boolean;
  setUsernameBox: (condition: boolean) => void;
};

export const DataProvider = ({ children }: providerProps) => {
  const [favorites, setFavorites] = useState([] as IRepo[]);
  const [username, setUsername] = useState("");
  const [loadingRepos, setLoadingRepos] = useState(true);
  const [usernameBox, setUsernameBox] = useState(false);

  const emptyRepos = favorites.length > 0 ? false : true;

  const addNewRepoInFavorites = async (obj: IRepo) => {
    try {
      setLoadingRepos(true);
      setFavorites([...favorites, obj]);
      await setFavoritesFromStorage(JSON.stringify([...favorites, obj]));
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingRepos(false);
    }
  };

  const requestUserRepo = async () => {
    try {
      const response = await getUserFromStorage();
      if (response === null) {
        return setUsername("appswefit");
      }
      setUsername(response);
    } catch (error) {
      console.log(error);
    }
  };

  const requestFavorites = async () => {
    try {
      setLoadingRepos(true);
      const response = await getFavoritesFromStorage();
      if (response === null) {
        return setFavorites([]);
      }
      setFavorites(JSON.parse(response));
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingRepos(false);
    }
  };

  useEffect(() => {
    requestUserRepo();
    requestFavorites();
  }, []);

  return (
    <DataContext.Provider
      value={{
        favorites,
        setFavorites,
        username,
        setUsername,
        loadingRepos,
        setLoadingRepos,
        emptyRepos,
        addNewRepoInFavorites,
        usernameBox,
        setUsernameBox,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const UserConsumer = DataContext.Consumer;
