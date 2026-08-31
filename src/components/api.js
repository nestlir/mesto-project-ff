const BASE_URL = "https://nomoreparties.co/v1/wff-cohort-9";

const headers = {
  Authorization: "14b58559-029e-496e-9a10-e787d4f1cf4c",
  "Content-Type": "application/json",
};

const checkResponse = (response) => {
  if (!response.ok) return Promise.reject(`Error: ${response.status}`);
  return response.json();
};

const request = (endpoint, options = {}) =>
  fetch(`${BASE_URL}/${endpoint}`, {
    ...options,
    headers: { ...headers, ...(options.headers || {}) },
  }).then(checkResponse);

export const getCards = () => request("cards");
export const getUser = () => request("users/me");
export const postCard = (name, link) =>
  request("cards", { method: "POST", body: JSON.stringify({ name, link }) });
export const deleteCardApi = (id) =>
  request(`cards/${id}`, { method: "DELETE" });
export const patchUser = (name, about) =>
  request("users/me", { method: "PATCH", body: JSON.stringify({ name, about }) });
export const addLikeCard = (id) =>
  request(`cards/likes/${id}`, { method: "PUT" });
export const deleteLikeCard = (id) =>
  request(`cards/likes/${id}`, { method: "DELETE" });
export const patchAvatar = (avatar) =>
  request("users/me/avatar", {
    method: "PATCH",
    body: JSON.stringify({ avatar }),
  });
