const token = '14b58559-029e-496e-9a10-e787d4f1cf4c'; // Ваш токен
const groupId = 'wff-cohort-9'; // Ваш идентификатор группы

fetch(`https://mesto.nomoreparties.co/v1/${groupId}/cards`, {
  method: 'GET',
  headers: {
    authorization: token
  }
})
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
  })
  .then(data => {
    console.log(data); // Вывод полученных данных в консоль
    // Здесь вы можете использовать полученные данные для отрисовки карточек и информации о пользователе в DOM
  })
  .catch(error => {
    console.error('Ошибка при выполнении запроса:', error);
  });
