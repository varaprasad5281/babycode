import axios from "axios";

// export const baseUrl =
//   "https://fcc4-2401-4900-5992-cbcc-9562-e4bf-bef0-b7e.ngrok-free.app";
export const baseUrl = "https://ieltspro.babycode.org";

export const api = axios.create({
  baseURL: baseUrl,
  validateStatus: function (status) {
    return status >= 200 && status < 500; // Treat status code between 200 and 500 as successful
  },
});

export const Apis = {
  login: "/Login/",
  appInfo: "/AppInfo/",
  listeningPracticeData: "/getListeningPractiseData/",
  startListeningTest: "/startListeningTest/",
  listeningComments: "/fetchListeningTestComment/",
  vocabularyData: "/IeltsResource/",
  searchVocabulary: "/IeltsResourceSearch/",
  likeUserComment: "/likeCommentInListeningTest/",
  dislikeUserComment: "/dislikeCommentInListeningTest/",
};
