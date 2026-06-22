(function () {
  const form = document.querySelector("[data-grinning-form]");
  const response = document.querySelector("[data-grinning-response]");
  const musicPanel = document.querySelector("[data-grinning-music]");
  const musicFrame = document.querySelector("[data-grinning-music-frame]");
  const parseJsonScript = (selector) => {
    const source = document.querySelector(selector);
    const parsed = source ? JSON.parse(source.textContent) : {};
    return typeof parsed === "string" ? JSON.parse(parsed) : parsed;
  };
  const answerData = parseJsonScript("#grinning-answers");
  const musicData = parseJsonScript("#grinning-music");
  const answers = new Map(Object.entries(answerData));
  const lowerCaseAnswers = new Map(
    Object.entries(answerData).map(([key, value]) => [key.toLowerCase(), value])
  );
  const musicByAnswer = new Map(Object.entries(musicData));
  const lowerCaseMusic = new Map(
    Object.entries(musicData).map(([key, value]) => [key.toLowerCase(), value])
  );
  const fallback = "可能还需要再想想...";
  const numericFallback = "不对不对";
  const missHints = new Map([
    [5, "想想扑克的花色？"],
    [10, "似乎有两个专辑..."],
    [15, "尝试输入一下那首歌？"]
  ]);
  const musicTypeCodes = {
    playlist: 0,
    album: 1,
    song: 2
  };
  const sparkleGlyphs = ["✦", "✧", "★", "♡", "•"];
  let musicHasOpened = false;
  let missCount = 0;

  if (!form || !response) {
    return;
  }

  const getMusicForAnswer = (answer) => {
    if (musicByAnswer.has(answer)) {
      return musicByAnswer.get(answer);
    }
    return lowerCaseMusic.get(answer.toLowerCase());
  };

  const showMusic = (track) => {
    if (!musicPanel || !musicFrame || !track) {
      return;
    }

    const type = track.type || "playlist";
    const height = Number(track.height || (type === "song" ? 66 : 430));
    const width = track.width || "100%";
    const typeCode = Object.prototype.hasOwnProperty.call(musicTypeCodes, type)
      ? musicTypeCodes[type]
      : musicTypeCodes.playlist;
    const auto = musicHasOpened ? 1 : 0;
    const iframe = document.createElement("iframe");
    iframe.className = "netease-cloud-music-frame";
    iframe.title = track.title || `NetEase Cloud Music ${type} ${track.id}`;
    iframe.width = width;
    iframe.height = String(height + 20);
    iframe.loading = "lazy";
    iframe.frameBorder = "no";
    iframe.setAttribute("border", "0");
    iframe.setAttribute("marginwidth", "0");
    iframe.setAttribute("marginheight", "0");
    iframe.src = `https://music.163.com/outchain/player?type=${typeCode}&id=${encodeURIComponent(track.id)}&auto=${auto}&height=${height}`;

    musicFrame.replaceChildren(iframe);
    musicPanel.hidden = false;
    requestAnimationFrame(() => musicPanel.classList.add("is-visible"));
    musicHasOpened = true;
  };

  const celebrateHit = () => {
    form.classList.remove("is-hit");
    response.classList.remove("is-hit");
    void form.offsetWidth;
    void response.offsetWidth;
    form.classList.add("is-hit");
    response.classList.add("is-hit");

    const burst = document.createElement("span");
    burst.className = "grinning-burst";
    burst.setAttribute("aria-hidden", "true");

    sparkleGlyphs.forEach((glyph, index) => {
      const sparkle = document.createElement("span");
      const angle = (-72 + index * 36) * Math.PI / 180;
      const distance = 42 + (index % 2) * 12;
      sparkle.className = "grinning-sparkle";
      sparkle.textContent = glyph;
      sparkle.style.setProperty("--spark-x", `${Math.cos(angle) * distance}px`);
      sparkle.style.setProperty("--spark-y", `${Math.sin(angle) * distance - 20}px`);
      sparkle.style.setProperty("--spark-delay", `${index * 22}ms`);
      burst.appendChild(sparkle);
    });

    form.appendChild(burst);
    window.setTimeout(() => burst.remove(), 1300);
  };

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
    const isHit = output !== undefined;
    if (!isHit) {
      missCount += 1;
    }
    const resolvedOutput = output !== undefined
      ? output
      : (missHints.get(missCount) || (/^\d{4}$/.test(answer) ? numericFallback : fallback));
    response.textContent = resolvedOutput;
    response.classList.remove("is-visible");
    requestAnimationFrame(() => response.classList.add("is-visible"));

    if (isHit) {
      celebrateHit();
      showMusic(getMusicForAnswer(answer));
    }
  });
})();
