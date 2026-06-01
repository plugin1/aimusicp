const MUUSIC_DEFAULT = {
  humming: "旋律：尚未填寫\n節奏/字數：尚未填寫",
  inspiration: "靈感：尚未填寫\n情緒：尚未選擇",
  lyrics: "主題：尚未填寫\n歌詞方向：尚未填寫",
  arrangement: "和弦：尚未選擇\n鼓點：尚未選擇",
  prompt: "提示詞：尚未生成"
};

const MUUSIC_WEB_URL = "https://plugin1.github.io/aimusicp/?v=20260601-muusic1";
const MUUSIC_EMPTY_META = {
  saveName: "尚未讀取存檔",
  exportedAt: ""
};

const MUUSIC_TABS = [
  ["humming", "哼唱", "聲音線", "#e7a7bd"],
  ["arrangement", "編曲", "聲音線", "#c8a074"],
  ["inspiration", "靈感", "文字線", "#f1c84f"],
  ["lyrics", "歌詞", "文字線", "#8fb7dc"],
  ["prompt", "提示詞", "整理出口", "#918ee8"]
];

let muusicState = { ...MUUSIC_DEFAULT };
let muusicMeta = { ...MUUSIC_EMPTY_META };
let muusicActive = "humming";

if (!window.__muusicSunoLoaded) {
  window.__muusicSunoLoaded = true;
  initMuUsic();
}

async function initMuUsic() {
  const saved = await chrome.storage.local.get(["muusicConclusions", "muusicMeta", "motiflabConclusions", "motiflabMeta"]);
  muusicState = { ...MUUSIC_DEFAULT, ...(saved.muusicConclusions || saved.motiflabConclusions || {}) };
  muusicMeta = { ...MUUSIC_EMPTY_META, ...(saved.muusicMeta || saved.motiflabMeta || {}) };
  renderMuUsic();
}

function renderMuUsic() {
  if (document.querySelector(".muusic-root")) return;
  const root = document.createElement("div");
  root.className = "muusic-root";
  root.innerHTML = `
    <button class="muusic-launch" type="button" title="打開 MuUsic">M</button>
    <section class="muusic-panel" aria-label="MuUsic Suno 輔助面板">
      <header class="muusic-head">
        <div>
          <strong>MuUsic</strong>
          <small data-save-source>尚未讀取存檔</small>
        </div>
        <button class="muusic-icon" type="button" data-close>×</button>
      </header>
      <nav class="muusic-tabs">
        ${MUUSIC_TABS.map(([id, label, group, color]) => `<button class="muusic-tab" style="--muusic-color:${color}" data-tab="${id}" type="button"><small>${group}</small><span>${label}</span></button>`).join("")}
      </nav>
      <div class="muusic-body">
        <div class="muusic-field">
          <label data-current-label></label>
          <textarea data-current-text></textarea>
        </div>
        <div class="muusic-actions">
          <button class="muusic-primary" type="button" data-copy-current>複製本段</button>
          <button class="muusic-secondary" type="button" data-copy-all>複製全部</button>
          <button class="muusic-secondary" type="button" data-fill-focused>填入當前輸入框</button>
          <button class="muusic-secondary" type="button" data-open-web>打開網頁版</button>
        </div>
        <hr />
        <div class="muusic-field">
          <label>從 MuUsic 網頁匯入 JSON</label>
          <textarea class="muusic-import" data-import-box placeholder="在網頁版提示詞系統點「複製插件資料」，再貼到這裡。"></textarea>
        </div>
        <div class="muusic-actions">
          <button class="muusic-secondary" type="button" data-import>匯入</button>
          <button class="muusic-secondary" type="button" data-reset>重置</button>
        </div>
        <p class="muusic-note" data-empty-note>如果不是從 MuUsic 的 ✓ 跳轉過來，請先回網頁版選擇「自動存檔」或某個手動存檔，再到提示詞系統複製插件資料貼回這裡。插件不會自動讀取另一個網站的本機存檔。</p>
        <div class="muusic-toast" data-toast></div>
      </div>
    </section>
  `;
  document.documentElement.appendChild(root);
  bindMuUsic(root);
  updateMuUsicUI(root);
}

function bindMuUsic(root) {
  root.querySelector(".muusic-launch").addEventListener("click", () => root.classList.add("open"));
  root.querySelector("[data-close]").addEventListener("click", () => root.classList.remove("open"));
  root.querySelectorAll("[data-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      saveCurrentText(root);
      muusicActive = button.dataset.tab;
      updateMuUsicUI(root);
    });
  });
  root.querySelector("[data-current-text]").addEventListener("input", () => saveCurrentText(root));
  root.querySelector("[data-copy-current]").addEventListener("click", () => copyText(muusicState[muusicActive], root, "已複製本段"));
  root.querySelector("[data-copy-all]").addEventListener("click", () => copyText(buildAllText(), root, "已複製全部"));
  root.querySelector("[data-fill-focused]").addEventListener("click", () => fillFocused(root));
  root.querySelector("[data-open-web]").addEventListener("click", () => window.open(MUUSIC_WEB_URL, "_blank", "noopener"));
  root.querySelector("[data-import]").addEventListener("click", () => importData(root));
  root.querySelector("[data-reset]").addEventListener("click", async () => {
    muusicState = { ...MUUSIC_DEFAULT };
    muusicMeta = { ...MUUSIC_EMPTY_META };
    await persistMuUsic();
    updateMuUsicUI(root);
    showToast(root, "已重置");
  });
}

function updateMuUsicUI(root) {
  root.querySelectorAll("[data-tab]").forEach((button) => button.classList.toggle("active", button.dataset.tab === muusicActive));
  const label = MUUSIC_TABS.find(([id]) => id === muusicActive)?.[1] || "段落";
  const imported = muusicMeta.exportedAt || Object.values(muusicState).some((text) => !/^.+尚未/.test(text));
  root.classList.toggle("has-import", Boolean(imported));
  root.querySelector("[data-save-source]").textContent = imported
    ? `讀取：${muusicMeta.saveName || "未命名存檔"}${muusicMeta.exportedAt ? " · " + formatTime(muusicMeta.exportedAt) : ""}`
    : "請先讀取 MuUsic 存檔";
  root.querySelector("[data-current-label]").textContent = `${label}系統結論詞`;
  root.querySelector("[data-current-text]").value = muusicState[muusicActive] || "";
}

function saveCurrentText(root) {
  muusicState[muusicActive] = root.querySelector("[data-current-text]").value;
  persistMuUsic();
}

async function persistMuUsic() {
  await chrome.storage.local.set({ muusicConclusions: muusicState, muusicMeta });
}

function buildAllText() {
  return MUUSIC_TABS.map(([id, label, group]) => `【${group} / ${label}】\n${muusicState[id] || ""}`).join("\n\n");
}

async function copyText(text, root, message) {
  await navigator.clipboard.writeText(text || "");
  showToast(root, message);
}

function fillFocused(root) {
  const active = document.activeElement;
  const text = muusicState[muusicActive] || "";
  if (!active || !("value" in active)) {
    copyText(text, root, "未找到輸入框，已改為複製");
    return;
  }
  active.value = `${active.value || ""}${active.value ? "\n" : ""}${text}`;
  active.dispatchEvent(new Event("input", { bubbles: true }));
  showToast(root, "已填入目前輸入框");
}

async function importData(root) {
  const raw = root.querySelector("[data-import-box]").value.trim();
  if (!raw) return showToast(root, "先貼上 JSON");
  try {
    const parsed = JSON.parse(raw);
    const systems = parsed.systems || parsed;
    muusicState = { ...MUUSIC_DEFAULT, ...systems };
    muusicMeta = { ...MUUSIC_EMPTY_META, ...(parsed.meta || {}) };
    await persistMuUsic();
    updateMuUsicUI(root);
    showToast(root, `已讀取：${muusicMeta.saveName || "存檔"}`);
  } catch (error) {
    showToast(root, "JSON 格式不對");
  }
}

function formatTime(value) {
  try {
    return new Intl.DateTimeFormat("zh-Hant", {
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    }).format(new Date(value));
  } catch (error) {
    return "";
  }
}

function showToast(root, message) {
  const toast = root.querySelector("[data-toast]");
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(toast.dataset.timer);
  toast.dataset.timer = window.setTimeout(() => toast.classList.remove("show"), 1800);
}
