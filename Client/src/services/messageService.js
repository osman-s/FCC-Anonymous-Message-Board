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
export function downvoteThread(_id) {
  return http.put(`${apiEndpoint}upvote`, {
    _id: _id
  });
}
export function bookComment({ _id, comment }) {
  return http.post(apiEndpoint + "comments", {
    bookId: _id,
    comment: comment
  });
}

export function bookDelete(_id) {
  return http.delete(apiEndpoint, {
    data: { _id: _id }
  });
}
export function getComments() {
  return http.get(apiEndpoint + "comments");
}
