import { api, Apis } from "./constant";

// do login
export const login = (data) => {
  return api.post(Apis.login, data);
};

// get app info
export const getAppInformation = (data) => {
  return api.post(Apis.appInfo, data);
};

// get listening practice data
export const getListeningPractiseData = (data) => {
  return api.post(Apis.listeningPracticeData, data);
}