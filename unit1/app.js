const slideBase = "./assets/slides/";
const pageBase = "./assets/pages/";
const graphicBase = "./assets/infographics/";

const focusData = [
  {
    label: "焦點 1",
    title: "健康習慣與早餐導入",
    cue: "先讓學生用英語說出自己的早餐與健康習慣。",
    note: "適合用前 3 張簡報帶出情境，接著切到課本收錄頁面 2-4，讓學生找出健康行為關鍵字。",
    slides: [1, 2, 3],
    graphic: "infographic_01_healthy_habits.png",
    question: "Which answer best responds to: How do you stay healthy?",
    choices: ["I exercise regularly and eat breakfast.", "I have gone to a summer school.", "I have just finished my homework."],
    answer: 0,
  },
  {
    label: "焦點 2",
    title: "現在完成式基本句型",
    cue: "把句型拆成主詞、have / has、過去分詞三個區塊。",
    note: "可先展示公式圖表，再回到簡報第 4、8、12 張做句型替換練習。",
    slides: [4, 8, 12],
    graphic: "infographic_02_present_perfect_formula.png",
    question: "He ____ been to Taipei many times.",
    choices: ["have", "has", "having"],
    answer: 1,
  },
  {
    label: "焦點 3",
    title: "Have you ever ...?",
    cue: "用 ever 問經驗，回答要用 have / have not。",
    note: "適合搭配同儕訪問。先看簡報第 5 張，再讓學生用自己的經驗改寫問句。",
    slides: [5, 12],
    graphic: "infographic_03_ever_experience.png",
    question: "Have you ever tried frog meat?",
    choices: ["No, I don't.", "No, I haven't.", "No, I wasn't."],
    answer: 1,
  },
  {
    label: "焦點 4",
    title: "already / yet / just",
    cue: "already 常用於肯定句，yet 常用於疑問與否定句，just 表示剛剛。",
    note: "先用圖表建立三個副詞的位置感，再用簡報第 6、11 張做對照。",
    slides: [6, 11],
    graphic: "infographic_04_already_yet_just.png",
    question: "Have you finished your work ____?",
    choices: ["yet", "before", "many times"],
    answer: 0,
  },
  {
    label: "焦點 5",
    title: "How long / for / since",
    cue: "for 接一段時間，since 接起始時間點。",
    note: "請學生先判斷時間語是 duration 還是 starting point，再回到句子中填入 for 或 since。",
    slides: [7, 12],
    graphic: "infographic_05_for_since.png",
    question: "I have lived here ____ ten years.",
    choices: ["since", "for", "already"],
    answer: 1,
  },
  {
    label: "焦點 6",
    title: "have been to / have gone to",
    cue: "been to 表示去過且已回來，gone to 表示去了某地還沒回來。",
    note: "用地圖或學生熟悉的地點造句，讓學生判斷人物現在是否在現場。",
    slides: [9, 12],
    graphic: "infographic_06_been_to_gone_to.png",
    question: "Casey has gone to the UK. What does it mean?",
    choices: ["Casey is in the UK now.", "Casey has visited the UK before and is back.", "Casey will go to the UK tomorrow."],
    answer: 0,
  },
  {
    label: "焦點 7",
    title: "閱讀策略：Problem / Reason / Request",
    cue: "讀信件或訊息時，先抓問題、原因、請求。",
    note: "用收錄頁面中的閱讀文本練習三欄標記，最後讓學生口頭整理 Debbie 的需求。",
    slides: [10, 11, 12],
    graphic: "infographic_07_reading_strategy.png",
    question: "When reading a request message, what should students find first?",
    choices: ["Problem, reason, and request.", "Only every new word.", "Only the final sentence."],
    answer: 0,
  },
];

const allSlides = Array.from({ length: 12 }, (_, index) => ({
  type: "slides",
  title: `簡報 ${index + 1}`,
  src: `${slideBase}slide-${String(index + 1).padStart(2, "0")}.png`,
}));

const allPages = Array.from({ length: 24 }, (_, index) => ({
  type: "pages",
  title: `收錄頁面 ${index + 1}`,
  src: `${pageBase}unit1_page-${String(index + 1).padStart(2, "0")}.png`,
}));

const allGraphics = focusData.map((item, index) => ({
  type: "graphics",
  title: `圖表 ${index + 1}`,
  src: `${graphicBase}${item.graphic}`,
}));

const viewAssets = {
  slides: allSlides,
  pages: allPages,
  graphics: allGraphics,
};

let currentFocus = 0;
let currentView = "slides";
let currentAsset = 0;
let score = 0;
let answered = new Set();
let timerSeconds = 180;
let timerInitial = 180;
let timerId = null;
let penActive = false;
let penColor = "#fff7d6";
let drawing = false;

const els = {
  focusList: document.querySelector("#focusList"),
  focusIndex: document.querySelector("#focusIndex"),
  focusLabel: document.querySelector("#focusLabel"),
  focusTitle: document.querySelector("#focusTitle"),
  assetLabel: document.querySelector("#assetLabel"),
  scoreText: document.querySelector("#scoreText"),
  mainImage: document.querySelector("#mainImage"),
  assetStrip: document.querySelector("#assetStrip"),
  teacherCue: document.querySelector("#teacherCue"),
  teacherNote: document.querySelector("#teacherNote"),
  questionText: document.querySelector("#questionText"),
  choiceList: document.querySelector("#choiceList"),
  feedbackText: document.querySelector("#feedbackText"),
  drawLayer: document.querySelector("#drawLayer"),
};

function init() {
  renderFocusList();
  bindEvents();
  resizeCanvas();
  setFocus(0);
  updateTimer();
}

function renderFocusList() {
  els.focusList.innerHTML = "";
  focusData.forEach((item, index) => {
    const button = document.createElement("button");
    button.className = "focus-btn";
    button.type = "button";
    button.dataset.index = index;
    button.innerHTML = `<strong>${item.label}</strong><span>${item.title}</span>`;
    els.focusList.appendChild(button);
  });
}

function setFocus(index) {
  currentFocus = index;
  const item = focusData[index];
  document.querySelectorAll(".focus-btn").forEach((button, buttonIndex) => {
    button.classList.toggle("active", buttonIndex === index);
  });
  els.focusIndex.textContent = `${index + 1} / ${focusData.length}`;
  els.focusLabel.textContent = item.label;
  els.focusTitle.textContent = item.title;
  els.teacherCue.textContent = item.cue;
  els.teacherNote.textContent = item.note;
  els.questionText.textContent = item.question;
  els.feedbackText.textContent = "";
  renderChoices();
  if (currentView === "slides") {
    currentAsset = allSlides.findIndex((asset) => asset.src.endsWith(`slide-${String(item.slides[0]).padStart(2, "0")}.png`));
  } else if (currentView === "graphics") {
    currentAsset = index;
  }
  renderAssets();
  updateScore();
}

function setView(view) {
  currentView = view;
  if (view === "slides") {
    const firstSlide = focusData[currentFocus].slides[0];
    currentAsset = firstSlide - 1;
  } else if (view === "graphics") {
    currentAsset = currentFocus;
  } else {
    currentAsset = 0;
  }
  document.querySelectorAll(".tab-btn").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === view);
  });
  renderAssets();
}

function renderAssets() {
  const assets = viewAssets[currentView];
  const asset = assets[currentAsset] || assets[0];
  els.mainImage.src = asset.src;
  els.mainImage.alt = asset.title;
  els.assetLabel.textContent = `${asset.title} / 共 ${assets.length}`;
  els.assetStrip.innerHTML = "";
  assets.forEach((item, index) => {
    const button = document.createElement("button");
    button.className = "thumb-btn";
    button.type = "button";
    button.dataset.index = index;
    button.classList.toggle("active", index === currentAsset);
    button.innerHTML = `<img src="${item.src}" alt="${item.title}" loading="lazy" /><span>${item.title}</span>`;
    els.assetStrip.appendChild(button);
  });
}

function renderChoices() {
  const item = focusData[currentFocus];
  els.choiceList.innerHTML = "";
  item.choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.className = "choice-btn";
    button.type = "button";
    button.dataset.choice = index;
    button.textContent = choice;
    els.choiceList.appendChild(button);
  });
}

function moveAsset(delta) {
  const assets = viewAssets[currentView];
  currentAsset = (currentAsset + delta + assets.length) % assets.length;
  renderAssets();
}

function checkChoice(choiceIndex, revealOnly = false) {
  const item = focusData[currentFocus];
  document.querySelectorAll(".choice-btn").forEach((button) => {
    const index = Number(button.dataset.choice);
    button.classList.toggle("correct", index === item.answer);
    button.classList.toggle("wrong", index === choiceIndex && index !== item.answer);
  });

  if (choiceIndex === item.answer) {
    els.feedbackText.textContent = revealOnly ? "答案已標示。" : "答對了。";
    if (!revealOnly && !answered.has(currentFocus)) {
      answered.add(currentFocus);
      score += 1;
      updateScore();
    }
  } else {
    els.feedbackText.textContent = "再想想，回到上方素材找線索。";
  }
}

function updateScore() {
  els.scoreText.textContent = `答題 ${score} / ${focusData.length}`;
}

function bindEvents() {
  els.focusList.addEventListener("click", (event) => {
    const button = event.target.closest(".focus-btn");
    if (!button) return;
    setFocus(Number(button.dataset.index));
  });

  document.querySelectorAll(".tab-btn").forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.view));
  });

  document.querySelector("#prevAsset").addEventListener("click", () => moveAsset(-1));
  document.querySelector("#nextAsset").addEventListener("click", () => moveAsset(1));

  els.assetStrip.addEventListener("click", (event) => {
    const button = event.target.closest(".thumb-btn");
    if (!button) return;
    currentAsset = Number(button.dataset.index);
    renderAssets();
  });

  els.choiceList.addEventListener("click", (event) => {
    const button = event.target.closest(".choice-btn");
    if (!button) return;
    checkChoice(Number(button.dataset.choice));
  });

  document.querySelector("#showAnswer").addEventListener("click", () => {
    checkChoice(focusData[currentFocus].answer, true);
  });

  bindTools();
  bindDrawing();
}

function bindTools() {
  const toolPanel = document.querySelector("#toolPanel");
  document.querySelector("#toggleTools").addEventListener("click", () => {
    toolPanel.classList.toggle("hidden");
  });
  document.querySelector("#closeTools").addEventListener("click", () => {
    toolPanel.classList.add("hidden");
  });

  document.querySelector("#pickName").addEventListener("click", () => {
    const names = document.querySelector("#rosterInput").value
      .split(/\r?\n/)
      .map((name) => name.trim())
      .filter(Boolean);
    const picked = names[Math.floor(Math.random() * names.length)] || "名單為空";
    document.querySelector("#pickedName").textContent = picked;
  });

  document.querySelectorAll(".preset-btn").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".preset-btn").forEach((preset) => preset.classList.remove("active"));
      button.classList.add("active");
      timerInitial = Number(button.dataset.seconds);
      timerSeconds = timerInitial;
      stopTimer();
      updateTimer();
    });
  });

  document.querySelector("#startTimer").addEventListener("click", startTimer);
  document.querySelector("#pauseTimer").addEventListener("click", stopTimer);
  document.querySelector("#resetTimer").addEventListener("click", () => {
    timerSeconds = timerInitial;
    stopTimer();
    updateTimer();
  });
}

function startTimer() {
  if (timerId) return;
  timerId = window.setInterval(() => {
    timerSeconds = Math.max(0, timerSeconds - 1);
    updateTimer();
    if (timerSeconds === 0) stopTimer();
  }, 1000);
}

function stopTimer() {
  window.clearInterval(timerId);
  timerId = null;
}

function updateTimer() {
  const minutes = String(Math.floor(timerSeconds / 60)).padStart(2, "0");
  const seconds = String(timerSeconds % 60).padStart(2, "0");
  document.querySelector("#timerDisplay").textContent = `${minutes}:${seconds}`;
}

function bindDrawing() {
  const context = els.drawLayer.getContext("2d");
  document.querySelector("#togglePen").addEventListener("click", (event) => {
    penActive = !penActive;
    els.drawLayer.classList.toggle("active", penActive);
    event.currentTarget.textContent = penActive ? "關閉畫筆" : "啟用畫筆";
  });
  document.querySelector("#clearPen").addEventListener("click", () => {
    context.clearRect(0, 0, els.drawLayer.width, els.drawLayer.height);
  });
  document.querySelectorAll(".swatch").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".swatch").forEach((swatch) => swatch.classList.remove("active"));
      button.classList.add("active");
      penColor = button.dataset.color;
    });
  });

  window.addEventListener("resize", resizeCanvas);
  els.drawLayer.addEventListener("pointerdown", (event) => {
    if (!penActive) return;
    drawing = true;
    context.beginPath();
    context.moveTo(event.clientX, event.clientY);
  });
  els.drawLayer.addEventListener("pointermove", (event) => {
    if (!drawing || !penActive) return;
    context.lineWidth = Number(document.querySelector("#penSize").value);
    context.lineCap = "round";
    context.lineJoin = "round";
    context.strokeStyle = penColor;
    context.lineTo(event.clientX, event.clientY);
    context.stroke();
  });
  els.drawLayer.addEventListener("pointerup", () => {
    drawing = false;
  });
  els.drawLayer.addEventListener("pointerleave", () => {
    drawing = false;
  });
}

function resizeCanvas() {
  const canvas = els.drawLayer;
  const snapshot = document.createElement("canvas");
  snapshot.width = canvas.width;
  snapshot.height = canvas.height;
  snapshot.getContext("2d").drawImage(canvas, 0, 0);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.getContext("2d").drawImage(snapshot, 0, 0);
}

init();
