import { POSTS_BASE_URL } from "./urls";
import { request } from "./request";

export const getPosts = () => {
  const createUrl = POSTS_BASE_URL.clone().query({ userId: 1 }).toString();

  return request({ method: "GET", url: createUrl });
};

export const updatePost = (post) => {
  const createUrl = POSTS_BASE_URL.clone().toString();

  return request({ method: "GET", url: createUrl, body: post });
};

export const deletePost = (postId) => {
  const createUrl = POSTS_BASE_URL.clone().segment(`${postId}`).toString();

  return request({ method: "DELETE", url: createUrl });
};
