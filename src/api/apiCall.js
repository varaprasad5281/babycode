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
};

// start listening test
export const startListeningTest = (data) => {
  return api.post(Apis.startListeningTest, data);
};

// get listening test comments
export const getListeningComments = (data) => {
  return api.post(Apis.listeningComments, data);
};

// get vocabulary data
export const getVocabularyData = (data) => {
  return api.post(Apis.vocabularyData, data);
};

// get vocabulary category data
export const getVocabularyCategoryData = (data) => {
  return api.post(Apis.vocabularyData, data);
};

// search vocabulary
export const vocabularySearch = (data) => {
  return api.post(Apis.searchVocabulary, data);
};

// like user comment
export const likeListeningUserComment = (data) => {
  return api.post(Apis.likeListeningUserComment, data);
};

// dislike user comment
export const dislikeListeningUserComment = (data) => {
  return api.post(Apis.dislikeListeningUserComment, data);
};

// get listening comment replies
export const getListeningUserCommentReplies = (data) => {
  return api.post(Apis.listeningCommentRepliesList, data);
};

// like user comment reply in listening test
export const likeCommentReplyInListeningTest = (data) => {
  return api.post(Apis.likeCommentReplyInListeningTest, data);
};

// dislike user comment reply in listening test
export const dislikeCommentReplyInListeningTest = (data) => {
  return api.post(Apis.dislikeCommentReplyInListeningTest, data);
};

// add comment in listening test
export const addCommentInListeningTest = (data) => {
  return api.post(Apis.addCommentInListeningTest, data);
};

// add comment reply in listening test
export const addCommentReplyInListeningTest = (data) => {
  return api.post(Apis.addCommentReplyInListeningTest, data);
};

// check listening test band score
export const checkListeningTestBandScore = (data) => {
  return api.post(Apis.checkListeningTestBandScore, data);
};

// get writing category sub category
export const getWritingCategorySubCategory = (data) => {
  return api.post(Apis.getWritingCategorySubCategory, data);
};

// fetch writing questions
export const fetchWritingQuestionAnswer = (data) => {
  return api.post(Apis.fetchWritingQuestionAnswer, data);
};

// submit writing test answer
export const submitWritingTestAnswer = (data) => {
  return api.post(Apis.submitWritingTestAnswer, data);
};