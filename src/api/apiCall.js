import { api, Apis } from "./constant";

// do login
export const login = (data) => {
  return api.post(Apis.login, data);
};

// get app info
export const getAppInformation = (data) => {
  return api.post(Apis.appInfo, data);
};
