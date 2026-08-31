function renderLoading(
  isLoading,
  button,
  initialText = "Сохранить",
  loadingText = "Сохранение..."
) {
  button.textContent = isLoading ? loadingText : initialText;
}

export function handleSubmit(request, event, loadingText = "Сохранение...") {
  event.preventDefault();

  const submitButton = event.submitter;
  const initialText = submitButton.textContent;

  renderLoading(true, submitButton, initialText, loadingText);

  request()
    .then(() => {
      event.target.reset();
    })
    .catch((error) => {
      console.error("Ошибка:", error);
    })
    .finally(() => {
      renderLoading(false, submitButton, initialText, loadingText);
    });
}
