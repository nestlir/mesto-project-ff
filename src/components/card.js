// Функция создания карточки
export function createCard(cardData, deleteCard, likeCard, openImagePopup) {
  const cardElement = document.querySelector('#card-template').content.querySelector('.card').cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteIcon = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  deleteIcon.addEventListener('click', () => deleteCard(cardElement));
  likeButton.addEventListener('click', () => likeCard(likeButton));
  cardImage.addEventListener('click', () => openImagePopup(cardData.link, cardData.name));

  return cardElement;
}

// Функция удаления карточки
export function deleteCard(cardElement) {
  cardElement.remove();
}

// Функция лайка карточки
export function likeCard(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}
