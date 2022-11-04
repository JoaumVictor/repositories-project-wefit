import React, { useState, createContext, useEffect } from "react";
import {
  getUserFromStorage,
  setFavoritesFromStorage,
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
};

export const DataProvider = ({ children }: providerProps) => {
  const [favorites, setFavorites] = useState([] as IRepo[]);
  const [username, setUsername] = useState("");
  const [loadingRepos, setLoadingRepos] = useState(true);

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

  useEffect(() => {
    requestUserRepo();
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
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const UserConsumer = DataContext.Consumer;
