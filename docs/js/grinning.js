(function () {
  const form = document.querySelector("[data-grinning-form]");
  const response = document.querySelector("[data-grinning-response]");
  const answerSource = document.querySelector("#grinning-answers");
  const parsedAnswerData = answerSource ? JSON.parse(answerSource.textContent) : {};
  const answerData = typeof parsedAnswerData === "string"
    ? JSON.parse(parsedAnswerData)
    : parsedAnswerData;
  const answers = new Map(Object.entries(answerData));
  const lowerCaseAnswers = new Map(
    Object.entries(answerData).map(([key, value]) => [key.toLowerCase(), value])
  );
  const fallback = "可能还需要再想想...";
  const numericFallback = "不对不对";

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

    const output = answers.has(answer)
      ? answers.get(answer)
      : lowerCaseAnswers.get(answer.toLowerCase());
    const resolvedOutput = output !== undefined
      ? output
      : (/^\d{4}$/.test(answer) ? numericFallback : fallback);
    response.textContent = resolvedOutput;
    response.classList.remove("is-visible");
    requestAnimationFrame(() => response.classList.add("is-visible"));
  });
})();
