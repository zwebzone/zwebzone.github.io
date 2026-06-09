(function () {
  const cities = document.querySelectorAll(".music-city[data-events]");
  const zutomayoKeywords = [
    "\u771f\u591c\u4e2d",
    "\u77ac\u65f6\u6e05\u9192\u68a6",
    "\u77ac\u65f6\u6df1\u591c\u6240\u6709\u5236",
    "\u591c\u665a\u65e0\u6cd5\u56de\u907f",
    "\u6211\u6709\u591c\u591c\u591c\u75c7",
    "\u4f5c\u591c\u4e2d\u901a\u4fe1",
    "ZUTOMAYO",
    "ZTMY"
  ];

  function isZutomayoEvent(event) {
    return zutomayoKeywords.some((keyword) =>
      event.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  function appendStyledEvent(line, event) {
    const parts = event.split(/(MyGO!!!!!|Ave Mujica|RAISE A SUILEN)/g);

    parts.forEach((part) => {
      if (!part) {
        return;
      }

      const span = document.createElement("span");
      if (part === "MyGO!!!!!") {
        span.className = "is-mygo";
      } else if (part === "Ave Mujica") {
        span.className = "is-ave-mujica";
      } else if (part === "RAISE A SUILEN") {
        span.className = "is-ras";
      }
      span.textContent = part;
      line.appendChild(span);
    });
  }

  cities.forEach((city) => {
    if (city.querySelector(".music-tooltip")) {
      return;
    }

    const tooltip = document.createElement("span");
    tooltip.className = "music-tooltip";
    tooltip.setAttribute("role", "tooltip");

    const events = city.getAttribute("data-events").split("\n").filter(Boolean);
    events.forEach((event) => {
      const isTicketed = event.includes("[ticketed]");
      const cleanEvent = event.replace("[ticketed]", "").trim();
      const line = document.createElement("span");
      line.className = "music-tooltip-line";
      if (isZutomayoEvent(cleanEvent)) {
        line.classList.add("is-zutomayo");
      }
      if (isTicketed) {
        line.classList.add("is-ticketed");
      }
      appendStyledEvent(line, cleanEvent);
      if (isTicketed) {
        const ticket = document.createElement("span");
        ticket.className = "music-ticket";
        ticket.setAttribute("role", "img");
        ticket.setAttribute("aria-label", "Upcoming");
        ticket.setAttribute("title", "Upcoming");
        line.appendChild(ticket);
      }
      tooltip.appendChild(line);
    });

    city.appendChild(tooltip);
  });
})();
