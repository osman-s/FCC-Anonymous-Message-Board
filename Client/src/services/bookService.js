import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl;

export function bookPost({ title }) {
  return http.post(apiEndpoint, {
    title: title
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
export function getBooks() {
  return http.get(apiEndpoint);
}
export function getComments() {
  return http.get(apiEndpoint + "comments");
}
