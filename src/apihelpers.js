export const getAllPost = () => {
  return fetch(`https://jsonplaceholder.typicode.com/posts`, {
    method: "GET",
  }).then((response) => response.json());
};

export const addPost = (data) => {
  return fetch(`https://jsonplaceholder.typicode.com/posts`, {
    method: "POST",
    body: data,
  }).then((response) => response.json());
};

export const editPost = (data) => {
  return fetch(`https://jsonplaceholder.typicode.com/posts/${data._id}`, {
    method: "PUT",
    body: data,
  }).then((response) => response.json());
};

export const getComment = (id) => {
  return fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}/comments`
  ).then((response) => response.json());
};

export const delPost = () => {
  return fetch("https://jsonplaceholder.typicode.com/posts/1", {
    method: "DELETE",
  });
};

export const getFilteredPost = (id) => {
  return fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`, {
    method: "GET",
  }).then((response) => response.json());
};
