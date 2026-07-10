const slideBase = "./assets/slides/";
const infoBase = "./assets/infographics/";

const focusData = [
  {
    label: "重點 1",
    title: "健康習慣六片語",
    subtitle: "用完整動詞片語回答 How do you stay healthy?",
    slides: ["slide-01.png", "slide-02.png", "slide-03.png"],
    infographic: "infographic_01_healthy_habits.png",
    task: {
      type: "select",
      prompt: "點選可以回答健康生活問題的片語。",
      chips: ["drink enough water", "ate yesterday", "exercise regularly", "has gone to", "wash hands often"],
      answers: ["drink enough water", "exercise regularly", "wash hands often"],
    },
    question: "哪一句最適合回答 What do you do to stay healthy?",
    choices: [
      "I exercise regularly and have a balanced diet.",
      "I have gone to a summer school.",
      "I have just started a band.",
    ],
    answer: 0,
    tip: "教師提示：先讓學生用片語回答，再要求補成完整句。",
  },
  {
    label: "重點 2",
    title: "現在完成式公式",
    subtitle: "主詞 + have / has + 過去分詞",
    slides: ["slide-04.png", "slide-08.png", "slide-12.png"],
    infographic: "infographic_02_present_perfect_formula.png",
    task: {
      type: "slots",
      prompt: "把公式排成正確順序。",
      chips: ["主詞", "have / has", "過去分詞", "時間副詞"],
      answers: ["主詞", "have / has", "過去分詞"],
    },
    question: "He ____ been to Taipei many times.",
    choices: ["have", "has", "having"],
    answer: 1,
    tip: "教師提示：先看主詞，第三人稱單數用 has。",
  },
  {
    label: "重點 3",
    title: "Have you ever 問經驗",
    subtitle: "用 ever 問到目前為止有沒有做過",
    slides: ["slide-05.png", "slide-12.png"],
    infographic: "infographic_03_ever_experience.png",
    task: {
      type: "build",
      prompt: "點選字卡組成問句。",
      chips: ["Have", "you", "ever", "climbed", "a mountain?"],
      answers: ["Have", "you", "ever", "climbed", "a mountain?"],
    },
    question: "Have you ever tried frog meat? 否定簡答是：",
    choices: ["No, I don't.", "No, I haven't.", "No, I wasn't."],
    answer: 1,
    tip: "教師提示：經驗問句可搭配活動表，讓學生做 pair work。",
  },
  {
    label: "重點 4",
    title: "already / yet / just",
    subtitle: "辨認已經、還沒、剛剛",
    slides: ["slide-06.png", "slide-11.png"],
    infographic: "infographic_04_already_yet_just.png",
    task: {
      type: "match",
      prompt: "點選最適合放進句子的副詞。",
      chips: ["already", "yet", "just"],
      sentence: "Have you finished your work ____?",
      answers: ["yet"],
    },
    question: "哪一個常用在現在完成式否定句或疑問句？",
    choices: ["yet", "before", "many times"],
    answer: 0,
    tip: "教師提示：用肯定句、否定句、疑問句三欄對比位置。",
  },
  {
    label: "重點 5",
    title: "How long、for、since",
    subtitle: "for 接一段時間，since 接開始時間",
    slides: ["slide-07.png", "slide-12.png"],
    infographic: "infographic_05_for_since.png",
    task: {
      type: "sort",
      prompt: "把時間語分類。",
      chips: ["ten years", "last summer", "then", "a long time"],
      answers: ["for: ten years / a long time", "since: last summer / then"],
    },
    question: "I have lived here ____ ten years.",
    choices: ["since", "for", "already"],
    answer: 1,
    tip: "教師提示：畫時間線，讓學生用 for 標長度、since 標起點。",
  },
  {
    label: "重點 6",
    title: "have been to / have gone to",
    subtitle: "判斷人現在是否已經回來",
    slides: ["slide-09.png", "slide-12.png"],
    infographic: "infographic_06_been_to_gone_to.png",
    task: {
      type: "select",
      prompt: "點選表示「去過，已經回來」的句型。",
      chips: ["has been to", "has gone to", "went to", "is going to"],
      answers: ["has been to"],
    },
    question: "Casey has gone to the UK. 這句表示：",
    choices: ["Casey 去過英國，現在回來了。", "Casey 已經去了英國，現在不在這裡。", "Casey 明天要去英國。"],
    answer: 1,
    tip: "教師提示：用來回箭頭和單向箭頭，比文字解釋更快。",
  },
  {
    label: "重點 7",
    title: "Reading 三步驟",
    subtitle: "先找 problem、reason、request",
    slides: ["slide-10.png", "slide-11.png", "slide-12.png"],
    infographic: "infographic_07_reading_strategy.png",
    task: {
      type: "slots",
      prompt: "把求助信三步驟排好。",
      chips: ["Problem", "Reason", "Request"],
      answers: ["Problem", "Reason", "Request"],
    },
    question: "Ted 寫信給 Debbie 的主要目的為何？",
    choices: ["要分享健康飲食。", "要請 Debbie 幫忙處理和父母的衝突。", "要介紹他去過的地方。"],
    answer: 1,
    tip: "教師提示：先用 skimming 找目的，再要求學生回文中找證據。",
  },
];

let currentFocus = 0;
let currentSlide = 0;
let score = 0;
let answered = new Set();
let selectedChips = [];
let timerSeconds = 180;
let timerInitial = 180;
let timerId = null;
let penActive = false;
let penColor = "#f7f2df";
let drawing = false;

const els = {
  focusList: document.querySelector("#focusList"),
  focusCount: document.querySelector("#focusCount"),
  focusLabel: document.querySelector("#focusLabel"),
  focusTitle: document.querySelector("#focusTitle"),
  scoreText: document.querySelector("#scoreText"),
  slideImage: document.querySelector("#slideImage"),
  slideIndicator: document.querySelector("#slideIndicator"),
  infographicImage: document.querySelector("#infographicImage"),
  openInfographic: document.querySelector("#openInfographic"),
  visualTask: document.querySelector("#visualTask"),
  teacherTip: document.querySelector("#teacherTip"),
  questionText: document.querySelector("#questionText"),
  choiceList: document.querySelector("#choiceList"),
  feedbackText: document.querySelector("#feedbackText"),
  drawLayer: document.querySelector("#drawLayer"),
};

function init() {
  renderFocusList();
  bindEvents();
  resizeCanvas();
  renderFocus(0);
  updateTimer();
}

function renderFocusList() {
  els.focusList.innerHTML = "";
  focusData.forEach((item, index) => {
    const btn = document.createElement("button");
    btn.className = "focus-btn";
    btn.type = "button";
    btn.dataset.index = index;
    btn.innerHTML = `<strong>${item.label}</strong><span>${item.title}</span>`;
    els.focusList.appendChild(btn);
  });
}

function renderFocus(index) {
  currentFocus = index;
  currentSlide = 0;
  selectedChips = [];
  const item = focusData[index];
  document.querySelectorAll(".focus-btn").forEach((btn, idx) => {
    btn.classList.toggle("active", idx === index);
  });
  els.focusCount.textContent = `${index + 1} / ${focusData.length}`;
  els.focusLabel.textContent = item.subtitle;
  els.focusTitle.textContent = item.title;
  els.teacherTip.textContent = item.tip;
  els.questionText.textContent = item.question;
  els.feedbackText.textContent = "";
  renderSlide();
  renderActivity();
  renderChoices();
  updateScore();
  const infoSrc = infoBase + item.infographic;
  els.infographicImage.src = infoSrc;
  els.openInfographic.href = infoSrc;
}

function renderSlide() {
  const item = focusData[currentFocus];
  const file = item.slides[currentSlide];
  els.slideImage.src = slideBase + file;
  els.slideIndicator.textContent = `${currentSlide + 1} / ${item.slides.length}`;
}

function renderActivity() {
  const task = focusData[currentFocus].task;
  const board = document.createElement("div");
  board.className = "chalk-board-mini";
  const prompt = document.createElement("p");
  prompt.className = "question";
  prompt.textContent = task.prompt;
  board.appendChild(prompt);

  if (task.sentence) {
    const sentence = document.createElement("p");
    sentence.style.margin = "12px 0";
    sentence.style.color = "var(--yellow)";
    sentence.style.fontWeight = "900";
    sentence.textContent = task.sentence;
    board.appendChild(sentence);
  }

  if (task.type === "slots" || task.type === "build") {
    const dropRow = document.createElement("div");
    dropRow.className = "drop-row";
    task.answers.forEach((_, idx) => {
      const slot = document.createElement("button");
      slot.className = "slot";
      slot.type = "button";
      slot.textContent = idx + 1;
      slot.dataset.slot = idx;
      dropRow.appendChild(slot);
    });
    board.appendChild(dropRow);
  }

  if (task.type === "sort") {
    const answerBox = document.createElement("div");
    answerBox.className = "drop-row";
    task.answers.forEach((answer) => {
      const slot = document.createElement("div");
      slot.className = "slot";
      slot.textContent = answer;
      answerBox.appendChild(slot);
    });
    board.appendChild(answerBox);
  }

  const row = document.createElement("div");
  row.className = "task-row";
  task.chips.forEach((chip) => {
    const btn = document.createElement("button");
    btn.className = "chip";
    btn.type = "button";
    btn.textContent = chip;
    btn.dataset.value = chip;
    row.appendChild(btn);
  });
  board.appendChild(row);

  const status = document.createElement("p");
  status.className = "feedback";
  status.dataset.activityFeedback = "true";
  board.appendChild(status);

  els.visualTask.replaceChildren(board);
}

function renderChoices() {
  const item = focusData[currentFocus];
  els.choiceList.innerHTML = "";
  item.choices.forEach((choice, idx) => {
    const btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.type = "button";
    btn.textContent = choice;
    btn.dataset.choice = idx;
    els.choiceList.appendChild(btn);
  });
}

function updateScore() {
  els.scoreText.textContent = `${score} / ${focusData.length}`;
}

function checkActivity() {
  const task = focusData[currentFocus].task;
  const feedback = document.querySelector("[data-activity-feedback]");
  if (!feedback) return;
  const selected = [...document.querySelectorAll(".chip.selected")].map((el) => el.dataset.value);
  if (task.type === "select" || task.type === "match") {
    const correct = sameSet(selected, task.answers);
    feedback.textContent = correct ? "互動任務完成。" : "再檢查一次：只選本重點需要的答案。";
  }
}

function sameSet(a, b) {
  return a.length === b.length && a.every((item) => b.includes(item));
}

function bindEvents() {
  els.focusList.addEventListener("click", (event) => {
    const btn = event.target.closest(".focus-btn");
    if (!btn) return;
    renderFocus(Number(btn.dataset.index));
  });

  document.querySelector("#prevSlide").addEventListener("click", () => {
    const count = focusData[currentFocus].slides.length;
    currentSlide = (currentSlide - 1 + count) % count;
    renderSlide();
  });

  document.querySelector("#nextSlide").addEventListener("click", () => {
    const count = focusData[currentFocus].slides.length;
    currentSlide = (currentSlide + 1) % count;
    renderSlide();
  });

  document.querySelector("#resetActivity").addEventListener("click", renderActivity);

  els.visualTask.addEventListener("click", (event) => {
    const chip = event.target.closest(".chip");
    const slot = event.target.closest(".slot");
    if (chip) {
      const task = focusData[currentFocus].task;
      if (task.type === "slots" || task.type === "build") {
        selectedChips.push(chip.dataset.value);
        chip.classList.add("selected");
        fillNextSlot();
      } else {
        chip.classList.toggle("selected");
        checkActivity();
      }
    }
    if (slot && slot.tagName === "BUTTON") {
      slot.textContent = Number(slot.dataset.slot) + 1;
      slot.className = "slot";
      selectedChips = selectedChips.slice(0, Number(slot.dataset.slot));
    }
  });

  els.choiceList.addEventListener("click", (event) => {
    const btn = event.target.closest(".choice-btn");
    if (!btn) return;
    checkChoice(Number(btn.dataset.choice));
  });

  document.querySelector("#showAnswer").addEventListener("click", () => {
    checkChoice(focusData[currentFocus].answer, true);
  });

  document.querySelectorAll(".mode-btn").forEach((btn) => {
    btn.addEventListener("click", () => setMode(btn.dataset.mode));
  });

  bindTools();
  bindDrawing();
}

function fillNextSlot() {
  const task = focusData[currentFocus].task;
  const slots = [...document.querySelectorAll(".slot")].filter((slot) => slot.tagName === "BUTTON");
  const index = selectedChips.length - 1;
  const slot = slots[index];
  if (!slot) return;
  slot.textContent = selectedChips[index];
  slot.classList.add("filled");
  if (selectedChips.length === task.answers.length) {
    slots.forEach((s, idx) => {
      s.classList.add(selectedChips[idx] === task.answers[idx] ? "correct" : "wrong");
    });
    const feedback = document.querySelector("[data-activity-feedback]");
    feedback.textContent = selectedChips.every((v, idx) => v === task.answers[idx])
      ? "順序正確。"
      : "順序還需要調整。";
  }
}

function checkChoice(choiceIndex, revealOnly = false) {
  const item = focusData[currentFocus];
  document.querySelectorAll(".choice-btn").forEach((btn) => {
    const idx = Number(btn.dataset.choice);
    btn.classList.toggle("correct", idx === item.answer);
    btn.classList.toggle("wrong", idx === choiceIndex && idx !== item.answer);
  });
  if (choiceIndex === item.answer) {
    els.feedbackText.textContent = revealOnly ? "答案已標示。" : "答對了。";
    if (!revealOnly && !answered.has(currentFocus)) {
      answered.add(currentFocus);
      score += 1;
      updateScore();
    }
  } else {
    els.feedbackText.textContent = "還不對，請回到簡報或資訊圖找線索。";
  }
}

function setMode(mode) {
  document.body.classList.toggle("student-mode", mode === "student");
  document.querySelectorAll(".mode-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.mode === mode);
  });
}

function bindTools() {
  document.querySelector("#pickName").addEventListener("click", () => {
    const names = document.querySelector("#rosterInput").value
      .split(/\r?\n/)
      .map((name) => name.trim())
      .filter(Boolean);
    const picked = names[Math.floor(Math.random() * names.length)] || "名單空白";
    document.querySelector("#pickedName").textContent = picked;
  });

  document.querySelectorAll(".time-preset").forEach((btn) => {
    btn.addEventListener("click", () => {
      timerInitial = Number(btn.dataset.seconds);
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

  document.querySelector("#collapseTools").addEventListener("click", () => {
    document.querySelector(".tool-panel").classList.add("hidden");
    document.querySelector("#showTools").classList.remove("hidden");
  });
  document.querySelector("#showTools").addEventListener("click", () => {
    document.querySelector(".tool-panel").classList.remove("hidden");
    document.querySelector("#showTools").classList.add("hidden");
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
  const min = String(Math.floor(timerSeconds / 60)).padStart(2, "0");
  const sec = String(timerSeconds % 60).padStart(2, "0");
  document.querySelector("#timerDisplay").textContent = `${min}:${sec}`;
}

function bindDrawing() {
  const ctx = els.drawLayer.getContext("2d");
  document.querySelector("#togglePen").addEventListener("click", (event) => {
    penActive = !penActive;
    els.drawLayer.classList.toggle("active", penActive);
    event.currentTarget.textContent = penActive ? "關閉畫筆" : "啟用畫筆";
  });
  document.querySelector("#clearPen").addEventListener("click", () => {
    ctx.clearRect(0, 0, els.drawLayer.width, els.drawLayer.height);
  });
  document.querySelectorAll(".swatch").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".swatch").forEach((swatch) => swatch.classList.remove("active"));
      btn.classList.add("active");
      penColor = btn.dataset.color;
    });
  });
  window.addEventListener("resize", resizeCanvas);
  els.drawLayer.addEventListener("pointerdown", (event) => {
    if (!penActive) return;
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(event.clientX, event.clientY);
  });
  els.drawLayer.addEventListener("pointermove", (event) => {
    if (!drawing || !penActive) return;
    ctx.lineWidth = Number(document.querySelector("#penSize").value);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = penColor;
    ctx.lineTo(event.clientX, event.clientY);
    ctx.stroke();
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
