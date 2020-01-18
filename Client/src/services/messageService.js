import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl;

export function getThreads() {
  return http.get(apiEndpoint);
}
export function getThread(id) {
  return http.get(`${apiEndpoint}thread/${id}`);
}
export function postThread({ username, password, subject, message, imageURL }) {
  return http.post(apiEndpoint, {
    username: username,
    password: password,
    subject: subject,
    message: message,
    imageURL: imageURL
  });
}
export function upvoteThread(_id) {
  return http.put(`${apiEndpoint}upvote`, {
    _id: _id
  });
}
export function removeUpvoteThread(_id) {
  return http.put(`${apiEndpoint}removeupvote`, {
    _id: _id
  });
}
export function deleteThread(_id) {
  return http.delete(apiEndpoint, {
    data: { _id: _id }
  });
}
export function Comment({ _id, username, comment }) {
  console.log("this be stuff", username, _id, comment);
  return http.post(apiEndpoint + "comments", {
    threadId: _id,
    username: username,
    comment: comment
  });
}
export function getComments(threadId) {
  return http.get(`${apiEndpoint}comments/${threadId}`);
}
