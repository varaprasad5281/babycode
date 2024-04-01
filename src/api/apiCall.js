import { api, Apis } from "./constant";

// do login
export const login = (data) => {
  return api.post(Apis.login, data);
};
