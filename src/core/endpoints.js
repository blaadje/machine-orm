import { POSTS_BASE_URL } from "./urls";
import { request } from "./request";

export const getPosts = () => {
  const createUrl = POSTS_BASE_URL.clone().query({ userId: 1 }).toString();

  return request({ method: "GET", url: createUrl });
};

export const updatePost = ({ id, updatedPost }) => {
  const createUrl = POSTS_BASE_URL.clone().segment(`${id}`).toString();

  return request({ method: "PUT", url: createUrl, body: updatedPost });
};

export const deletePost = ({ id }) => {
  const createUrl = POSTS_BASE_URL.clone().segment(`${id}`).toString();

  return request({ method: "DELETE", url: createUrl });
};
