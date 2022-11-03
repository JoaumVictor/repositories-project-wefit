import api from "./api";
import { IData, IRepo } from "./types";

export const getRepositories = async (username: string) => {
  const { data }: IData = await api.get(`/${username}/repos`);
  return data;
};

export const getRepository = async (username: string, repository: string) => {
  const { data } = await api.get(`${username}/${repository}`);
  return data;
};
