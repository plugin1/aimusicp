const MOTIFLAB_DEFAULT = {
  humming: "旋律：尚未填寫\n節奏/字數：尚未填寫",
  inspiration: "靈感：尚未填寫\n情緒：尚未選擇",
  lyrics: "主題：尚未填寫\n歌詞方向：尚未填寫",
  arrangement: "和弦：尚未選擇\n鼓點：尚未選擇",
  prompt: "提示詞：尚未生成"
};

const MOTIFLAB_TABS = [
  ["humming", "哼唱", "聲音線", "#e7a7bd"],
  ["arrangement", "編曲", "聲音線", "#c8a074"],
  ["inspiration", "靈感", "文字線", "#f1c84f"],
  ["lyrics", "歌詞", "文字線", "#8fb7dc"],
  ["prompt", "提示詞", "整理出口", "#918ee8"]
];

let motiflabState = { ...MOTIFLAB_DEFAULT };
let motiflabActive = "humming";

if (!window.__motiflabSunoLoaded) {
  window.__motiflabSunoLoaded = true;
  initMotifLab();
}

async function initMotifLab() {
  const saved = await chrome.storage.local.get(["motiflabConclusions"]);
  motiflabState = { ...MOTIFLAB_DEFAULT, ...(saved.motiflabConclusions || {}) };
  renderMotifLab();
}

function renderMotifLab() {
  if (document.querySelector(".motiflab-root")) return;
  const root = document.createElement("div");
  root.className = "motiflab-root";
  root.innerHTML = `
    <button class="motiflab-launch" type="button" title="打開 MotifLab">M</button>
    <section class="motiflab-panel" aria-label="MotifLab Suno 輔助面板">
      <header class="motiflab-head">
        <div>
          <strong>MotifLab</strong>
          <small>在 Suno 裡查看與修改創作結論</small>
        </div>
        <button class="motiflab-icon" type="button" data-close>×</button>
      </header>
      <nav class="motiflab-tabs">
        ${MOTIFLAB_TABS.map(([id, label, group, color]) => `<button class="motiflab-tab" style="--motif-color:${color}" data-tab="${id}" type="button"><small>${group}</small><span>${label}</span></button>`).join("")}
      </nav>
      <div class="motiflab-body">
        <div class="motiflab-field">
          <label data-current-label></label>
          <textarea data-current-text></textarea>
        </div>
        <div class="motiflab-actions">
          <button class="motiflab-primary" type="button" data-copy-current>複製本段</button>
          <button class="motiflab-secondary" type="button" data-copy-all>複製全部</button>
          <button class="motiflab-secondary" type="button" data-fill-focused>填入當前輸入框</button>
        </div>
        <hr />
        <div class="motiflab-field">
          <label>從 MotifLab 網頁匯入 JSON</label>
          <textarea class="motiflab-import" data-import-box placeholder="在網頁版提示詞系統點「複製插件資料」，再貼到這裡。"></textarea>
        </div>
        <div class="motiflab-actions">
          <button class="motiflab-secondary" type="button" data-import>匯入</button>
          <button class="motiflab-secondary" type="button" data-reset>重置</button>
        </div>
        <p class="motiflab-note">資料只存在本機瀏覽器，不會自動讀取 Suno 帳號內容。正式生成前，可以把各系統結論合併後填入 Suno 輸入框。</p>
        <div class="motiflab-toast" data-toast></div>
      </div>
    </section>
  `;
  document.documentElement.appendChild(root);
  bindMotifLab(root);
  updateMotifLabUI(root);
}

function bindMotifLab(root) {
  root.querySelector(".motiflab-launch").addEventListener("click", () => root.classList.add("open"));
  root.querySelector("[data-close]").addEventListener("click", () => root.classList.remove("open"));
  root.querySelectorAll("[data-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      saveCurrentText(root);
      motiflabActive = button.dataset.tab;
      updateMotifLabUI(root);
    });
  });
  root.querySelector("[data-current-text]").addEventListener("input", () => saveCurrentText(root));
  root.querySelector("[data-copy-current]").addEventListener("click", () => copyText(motiflabState[motiflabActive], root, "已複製本段"));
  root.querySelector("[data-copy-all]").addEventListener("click", () => copyText(buildAllText(), root, "已複製全部"));
  root.querySelector("[data-fill-focused]").addEventListener("click", () => fillFocused(root));
  root.querySelector("[data-import]").addEventListener("click", () => importData(root));
  root.querySelector("[data-reset]").addEventListener("click", async () => {
    motiflabState = { ...MOTIFLAB_DEFAULT };
    await persistMotifLab();
    updateMotifLabUI(root);
    showToast(root, "已重置");
  });
}

function updateMotifLabUI(root) {
  root.querySelectorAll("[data-tab]").forEach((button) => button.classList.toggle("active", button.dataset.tab === motiflabActive));
  const label = MOTIFLAB_TABS.find(([id]) => id === motiflabActive)?.[1] || "段落";
  root.querySelector("[data-current-label]").textContent = `${label}系統結論詞`;
  root.querySelector("[data-current-text]").value = motiflabState[motiflabActive] || "";
}

function saveCurrentText(root) {
  motiflabState[motiflabActive] = root.querySelector("[data-current-text]").value;
  persistMotifLab();
}

async function persistMotifLab() {
  await chrome.storage.local.set({ motiflabConclusions: motiflabState });
}

function buildAllText() {
  return MOTIFLAB_TABS.map(([id, label, group]) => `【${group} / ${label}】\n${motiflabState[id] || ""}`).join("\n\n");
}

async function copyText(text, root, message) {
  await navigator.clipboard.writeText(text || "");
  showToast(root, message);
}

function fillFocused(root) {
  const active = document.activeElement;
  const text = motiflabState[motiflabActive] || "";
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
    motiflabState = { ...MOTIFLAB_DEFAULT, ...parsed };
    await persistMotifLab();
    updateMotifLabUI(root);
    showToast(root, "已匯入");
  } catch (error) {
    showToast(root, "JSON 格式不對");
  }
}

function showToast(root, message) {
  const toast = root.querySelector("[data-toast]");
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(toast.dataset.timer);
  toast.dataset.timer = window.setTimeout(() => toast.classList.remove("show"), 1800);
}
