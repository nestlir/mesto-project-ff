// Функция открытия модального окна
export function openPopup(popupElement) {
  popupElement.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscClose);
}

// Функция закрытия модального окна
export function closePopup(popupElement) {
  popupElement.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscClose);
}

// Функция-обработчик для закрытия модального окна при нажатии на клавишу Esc
function handleEscClose(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closePopup(openedPopup);
  }
}
