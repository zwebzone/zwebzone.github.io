(function () {
  const form = document.querySelector("[data-grinning-form]");
  const response = document.querySelector("[data-grinning-response]");
  const answers = new Map([
    ["0623", "Happy birthday!"]
  ]);
  const fallback = "可能还需要再想想...";

  if (!form || !response) {
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const input = form.elements.answer;
    const answer = input.value.trim();
    if (!answer) {
      input.focus();
      return;
    }

    response.textContent = answers.get(answer) || fallback;
    response.classList.remove("is-visible");
    requestAnimationFrame(() => response.classList.add("is-visible"));
  });
})();
