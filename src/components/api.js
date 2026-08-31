const BASE_URL = "https://nomoreparties.co/v1/wff-cohort-9";

const apiRoutes = {
  user: "users/me",
  cards: "cards",
};

const headers = {
  Authorization: "14b58559-029e-496e-9a10-e787d4f1cf4c",
  "Content-Type": "application/json",
};

const checkResponse = (response) => {
  if (response.ok) {
    return response.json();
  }

  return Promise.reject(new Error(`Request failed: ${response.status}`));
};

const request = (endpoint, options = {}) =>
  fetch(`${BASE_URL}/${endpoint}`, {
    headers,
    ...options,
  }).then(checkResponse);

const getCards = () => request(apiRoutes.cards);

const postCard = (name, link) =>
  request(apiRoutes.cards, {
    method: "POST",
    body: JSON.stringify({ name, link }),
  });

const deleteCardApi = (id) =>
  request(`${apiRoutes.cards}/${id}`, {
    method: "DELETE",
  });

const getUser = () => request(apiRoutes.user);

const patchUser = (name, about) =>
  request(apiRoutes.user, {
    method: "PATCH",
    body: JSON.stringify({ name, about }),
  });

const addLikeCard = (id) =>
  request(`${apiRoutes.cards}/likes/${id}`, {
    method: "PUT",
  });

const deleteLikeCard = (id) =>
  request(`${apiRoutes.cards}/likes/${id}`, {
    method: "DELETE",
  });

const patchAvatar = (avatar) =>
  request(`${apiRoutes.user}/avatar`, {
    method: "PATCH",
    body: JSON.stringify({ avatar }),
  });

export {
  getCards,
  postCard,
  deleteCardApi,
  getUser,
  patchUser,
  addLikeCard,
  deleteLikeCard,
  patchAvatar,
};