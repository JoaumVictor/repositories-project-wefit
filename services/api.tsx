import axios from "axios";

const api = axios.create({
  baseURL: "https://api.github.com/users/",
});

api.interceptors.request.use(
  async (response) => {
    // sucesso na requisição
    // console.log(response.data);
    return response;
  },
  (error) => {
    // falha na requisição
    // console.log(error.response);
    return error;
  }
);

export default api;
