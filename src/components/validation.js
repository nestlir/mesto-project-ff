export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".button",
  inactiveButtonClass: "button_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

const getErrorElement = (formElement, inputElement) =>
  formElement.querySelector("." + inputElement.id + "-error");

const showInputError = (formElement, inputElement, config) => {
  const errorElement = getErrorElement(formElement, inputElement);

  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(config.errorClass);
};

const hideInputError = (formElement, inputElement, config) => {
  const errorElement = getErrorElement(formElement, inputElement);

  if (!errorElement) return;

  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement, config) => {
  inputElement.setCustomValidity(
    inputElement.validity.patternMismatch ? inputElement.dataset.error : ""
  );

  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement, config);
  } else {
    showInputError(formElement, inputElement, config);
  }
};

const hasInvalidInput = (inputList) =>
  inputList.some((inputElement) => !inputElement.validity.valid);

const toggleButtonState = (inputList, config, buttonElement) => {
  const isInvalid = hasInvalidInput(inputList);

  buttonElement.disabled = isInvalid;
  buttonElement.classList.toggle(config.inactiveButtonClass, isInvalid);
};

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, config, buttonElement);
    });
  });

  toggleButtonState(inputList, config, buttonElement);
};

const enableValidation = (config) => {
  const formElementList = Array.from(
    document.querySelectorAll(config.formSelector)
  );

  formElementList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
};

function clearValidation(formElement, config) {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, config);
  });

  toggleButtonState(inputList, config, buttonElement);
}

export { enableValidation as validation, clearValidation };
