// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(cardData, deleteCardCallback) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  const deleteIcon = cardElement.querySelector('.card__delete-button');
  deleteIcon.addEventListener('click', function () {
    deleteCardCallback(cardElement);
  });

  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(cardElement) {
  if (cardElement) {
    cardElement.remove();
  }
}

// @todo: Вывести карточки на страницу
function renderInitialCards() {
  initialCards.forEach((cardData) => {
    const cardElement = createCard(cardData, deleteCard);
    placesList.appendChild(cardElement);
  });
}

// Вызываем функцию для вывода карточек на страницу
renderInitialCards();
