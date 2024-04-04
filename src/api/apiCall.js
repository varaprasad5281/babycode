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

// start listening test
export const startListeningTest = (data) => {
  return api.post(Apis.startListeningTest, data);
}

// get listening test comments
export const getListeningComments =(data)=>{
  return api.post(Apis.listeningComments,data)
}