import { TODOS_BASE_URL } from "./urls";
import { request } from "./request";

export const getTodos = () => {
  const createUrl = TODOS_BASE_URL.clone().toString();

  return request({ method: "GET", url: createUrl });
};

export const setTodo = (todo) => {
  const createUrl = TODOS_BASE_URL.clone().toString();

  return request({ method: "GET", url: createUrl, body: todo });
};

export const deleteTodo = (todoId) => {
  const createUrl = TODOS_BASE_URL.clone().segment(`${todoId}`).toString();

  return request({ method: "DELETE", url: createUrl });
};
