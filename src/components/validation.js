// Функция проверки валидности всей формы
function isFormValid(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  return inputList.every(inputElement => inputElement.validity.valid);
}

// В функции isValidInput вызываем showInputError с кастомным сообщением об ошибке, если оно есть
function isValidInput(input) {
  const errorMessage = !input.validity.valid ? (input.dataset.requiredMessage || 'Вы пропустили это поле.') : '';
  const customMessage = input.validationMessage;
  showInputError(input, errorMessage, customMessage);
}

// В функции showInputError добавляем поддержку кастомного сообщения об ошибке
function showInputError(input, errorMessage, customMessage = '') {
  const errorElement = input.nextElementSibling;
  errorElement.textContent = customMessage || errorMessage;
  errorElement.classList.toggle('popup__input-error_visible', !!errorMessage || !!customMessage);
}

// Функция обработки события изменения поля ввода
const handleInputChange = event => {
  isValidInput(event.target);
  const form = event.target.closest('.popup__form');
  checkFormValidity(form);
  checkSubmitButtonValidity(form);
};

// Функция добавления обработчиков событий для полей ввода
function setEventListeners(formElement) {
  Array.from(formElement.querySelectorAll('.popup__input')).forEach(input => {
    input.addEventListener('input', handleInputChange);
  });
  checkFormValidity(formElement); // Проверяем валидность формы при установке обработчиков событий
}

// Функция включения валидации формы
function enableValidation() {
  const forms = document.querySelectorAll('.popup__form');
  forms.forEach(form => {
    form.addEventListener('submit', evt => {
      evt.preventDefault();
    });
    setEventListeners(form); // Устанавливаем обработчики событий для полей ввода
  });
}

// Функция очистки ошибок валидации формы и делает кнопку неактивной
function clearValidation(formElement) {
  Array.from(formElement.querySelectorAll('.popup__input-error')).forEach(errorElement => {
    errorElement.textContent = '';
    errorElement.classList.remove('popup__input-error_visible');
  });

  const submitButton = formElement.querySelector('.popup__button');
  submitButton.classList.add('popup__button_disabled');
  submitButton.setAttribute('disabled', true);
}

// Функция проверки состояния кнопки отправки формы
function checkSubmitButtonValidity(form) {
  const isValid = Array.from(form.querySelectorAll('.popup__input')).every(input => input.validity.valid);
  const submitButton = form.querySelector('.popup__button');
  submitButton.disabled = !isValid;
  submitButton.classList.toggle('popup__button_disabled', !isValid);
}

// Функция проверки состояния валидации для кнопки отправки
function checkFormValidity(form) {
  const isValid = Array.from(form.querySelectorAll('.popup__input')).every(input => input.validity.valid);
  if (isValid) {
    checkSubmitButtonValidity(form);
  }
}

// В функции openEditProfilePopup и openAddCardPopup вызываем clearValidation для очистки ошибок валидации
function openEditProfilePopup() {
  setProfileData(nameInputElement, descriptionInputElement);
  clearValidation(editProfileFormElement); // очистка ошибок валидации
  openPopup(editProfilePopupElement);
}

function openAddCardPopup() {
  clearValidation(addCardFormElement); // очистка ошибок валидации
  openPopup(addCardPopupElement);
}

// Добавляем вызов функции enableValidation после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
  enableValidation();
});

export { enableValidation, clearValidation, checkFormValidity };
