// Находим форму в DOM
export const editFormElement = document.forms["edit-profile"];
export const newPlaceFormElement = document.forms["new-place"];
export const avatarFormElement = document.forms["edit-avatar"];
export const deleteCardForm = document.forms["delete-card"];

// Кнопки
export const buttonTypeCard = document.querySelector('.popup_type_image');
export const profileEditButton = document.querySelector(".profile__edit-button");
export const profileAddButton = document.querySelector(".profile__add-button");

// Попапы
export const popupsArray = Array.from(document.querySelectorAll('.popup'));
export const editForm = document.querySelector('.popup_type_edit');
export const newCardForm = document.querySelector('.popup_type_new-card');
export const avatarForm = document.querySelector(".popup_type_avatar");
export const deletePopup = document.querySelector(".popup_type_delete-card");

// Контейнер для карточек
export const placesList = document.querySelector(".places__list");

// Поля формы
export const avatarImage = document.querySelector(".profile__image");
export const nameInput = document.querySelector('.popup__input_type_name');
export const jobInput = document.querySelector('.popup__input_type_description');

// Элементы, куда должны быть вставлены значения полей
export const userNameElement = document.querySelector('.profile__title');
export const userJobElement = document.querySelector('.profile__description');

// Получаем значения полей формы
export const newPlaceNameInput = newPlaceFormElement.elements["place-name"];
export const newLinkInput = newPlaceFormElement.elements.link;

// Попап с изображением
export const popupImageCaption = document.querySelector(".popup__caption");
export const popupImage = document.querySelector(".popup__image");
