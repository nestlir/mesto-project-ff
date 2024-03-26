const BASE_URL = "https://nomoreparties.co/v1/wff-cohort-9";

// Объект с маршрутами API
const apiRoutes = {
  user: "users/me",
  cards: "cards",
  likes: "likes",
};

// Заголовки запроса
const headers = {
  Authorization: "14b58559-029e-496e-9a10-e787d4f1cf4c",
  "Content-Type": "application/json",
};

// Функция для проверки данных
const checkData = (data) => {
  if (data.ok) {
    return data.json();
  } else {
    return Promise.reject(`Error: ${data.status}`);
  }
};

// Функция для отправки запроса
function request(endpoint, options) {
  return fetch(`${BASE_URL}/${endpoint}`, options).then(checkData);
}

// Получение всех карточек
const getCards = () => {
  return request(apiRoutes.cards, {
    method: "GET",
    headers,
  });
};

// Добавление новой карточки
const postCard = (name, link) => {
  return request(apiRoutes.cards, {
    method: "POST",
    headers,
    body: JSON.stringify({
      name,
      link,
    }),
  });
};

// Удаление карточки по идентификатору
const deleteCardApi = (id) => {
  return request(`${apiRoutes.cards}/${id}`, {
    method: "DELETE",
    headers,
  });
};

// Получение информации о пользователе
const getUser = () => {
  return request(apiRoutes.user, {
    method: "GET",
    headers,
  });
};

// Обновление информации о пользователе
const patchUser = (name, about) => {
  return request(apiRoutes.user, {
    method: "PATCH",
    headers,
    body: JSON.stringify({
      name,
      about,
    }),
  });
};

// Добавление лайка карточке
const addLikeCard = (id)  => {
  return request(`${apiRoutes.cards}/${apiRoutes.likes}/${id}`, {
    method: "PUT",
    headers
  });
};

// Удаление лайка с карточки
const deleteLikeCard = (id) => {
  return request(`${apiRoutes.cards}/${apiRoutes.likes}/${id}`, {
    method: "DELETE",
    headers,
  });
};

// Обновление аватара пользователя
const patchAvatar = (avatar) => {
  return request(`${apiRoutes.user}/avatar`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({ avatar: avatar }),
  });
};

export {
  getCards,
  postCard,
  deleteCardApi,
  getUser,
  patchUser,
  addLikeCard,
  deleteLikeCard,
  patchAvatar
};
