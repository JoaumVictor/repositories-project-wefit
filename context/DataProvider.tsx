import React, { useState, createContext, useEffect } from "react";
import { getRepositories } from "../services/getRepositories";
import {
  getFavoritesFromStorage,
  getUserFromStorage,
  setFavoritesFromStorage,
  deleteFavoritesFromStorage,
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
  actualRepo: IRepo;
  setActualRepo: (repo: IRepo) => void;
  nameFavoriteRepos: string[];
  removeRepoInFavorites: (full_name: string) => void;
};

export const DataProvider = ({ children }: providerProps) => {
  const [favorites, setFavorites] = useState([] as IRepo[]);
  const [username, setUsername] = useState("");
  const [loadingRepos, setLoadingRepos] = useState(true);
  const [usernameBox, setUsernameBox] = useState(false);
  const [actualRepo, setActualRepo] = useState({} as IRepo);

  const emptyRepos = favorites.length > 0 ? false : true;

  const nameFavoriteRepos = favorites.map((repo) => repo.full_name);

  const addNewRepoInFavorites = (obj: IRepo) => {
    try {
      setLoadingRepos(true);
      setFavorites([...favorites, obj]);
      console.log(JSON.stringify([...favorites, obj]));
      setFavoritesFromStorage(JSON.stringify([...favorites, obj]));
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingRepos(false);
    }
  };

  const removeRepoInFavorites = (full_name: string) => {
    try {
      setLoadingRepos(true);
      const newFavorites = favorites.filter(
        (repo) => repo.full_name !== full_name
      );
      setFavorites(newFavorites);
      setFavoritesFromStorage(JSON.stringify(newFavorites));
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
      console.log(response);
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

  // const updateAll = () => {
  //   requestUserRepo();
  //   requestFavorites();
  // };

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
        actualRepo,
        setActualRepo,
        nameFavoriteRepos,
        removeRepoInFavorites,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const UserConsumer = DataContext.Consumer;
