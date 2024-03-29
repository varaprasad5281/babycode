import axios from "axios";
import { Apis, baseUrl } from "./constant";

// do login
export const login = (data) => {
  return axios.post(`${baseUrl}${Apis.login}`, data);
};
