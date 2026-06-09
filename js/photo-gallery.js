(function () {
  const gallery = document.querySelector("[data-photo-gallery]");
  if (!gallery) {
    return;
  }

  const pageSize = Number(gallery.dataset.photoPageSize) || 6;
  const buttons = Array.from(document.querySelectorAll("[data-photo-character]"));
  const panels = Array.from(document.querySelectorAll("[data-photo-panel]"));
  const countLabel = document.querySelector("[data-photo-count]");
  const pageStatus = document.querySelector("[data-photo-page-status]");
  const prevButton = document.querySelector("[data-photo-prev]");
  const nextButton = document.querySelector("[data-photo-next]");
  const pages = new Map(panels.map((panel) => [panel.dataset.photoPanel, 1]));

  function getActiveId() {
    const activeButton = buttons.find((button) => button.classList.contains("is-active"));
    return activeButton ? activeButton.dataset.photoCharacter : buttons[0].dataset.photoCharacter;
  }

  function setArrowState(button, disabled) {
    button.disabled = disabled;
    button.setAttribute("aria-disabled", String(disabled));
  }

  function renderPage() {
    const activeId = getActiveId();
    const panel = panels.find((item) => item.dataset.photoPanel === activeId);
    if (!panel) {
      return;
    }

    const items = Array.from(panel.querySelectorAll("[data-photo-item]"));
    const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
    const currentPage = Math.min(pages.get(activeId) || 1, totalPages);
    pages.set(activeId, currentPage);

    items.forEach((item, index) => {
      const page = Math.floor(index / pageSize) + 1;
      item.hidden = page !== currentPage;
    });

    if (countLabel) {
      countLabel.textContent = `${panel.dataset.photoName} · ${items.length} ${items.length === 1 ? "photo" : "photos"}`;
    }

    if (pageStatus) {
      pageStatus.textContent = totalPages > 1 ? `Page ${currentPage} of ${totalPages}` : "";
    }

    if (prevButton && nextButton) {
      setArrowState(prevButton, currentPage <= 1);
      setArrowState(nextButton, currentPage >= totalPages);
    }
  }

  function setCharacter(id) {
    buttons.forEach((button) => {
      const isActive = button.dataset.photoCharacter === id;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-selected", String(isActive));
    });

    panels.forEach((panel) => {
      panel.hidden = panel.dataset.photoPanel !== id;
    });

    renderPage();
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => setCharacter(button.dataset.photoCharacter));
  });

  if (prevButton) {
    prevButton.addEventListener("click", () => {
      const activeId = getActiveId();
      pages.set(activeId, Math.max(1, (pages.get(activeId) || 1) - 1));
      renderPage();
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      const activeId = getActiveId();
      pages.set(activeId, (pages.get(activeId) || 1) + 1);
      renderPage();
    });
  }

  renderPage();
})();
