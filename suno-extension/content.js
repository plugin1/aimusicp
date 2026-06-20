const MUUSIC_DEFAULT = {
  humming: "旋律：尚未填寫\n節奏/字數：尚未填寫",
  inspiration: "靈感：尚未填寫\n情緒：尚未選擇",
  lyrics: "主題：尚未填寫\n歌詞方向：尚未填寫",
  arrangement: "和弦：尚未選擇\n鼓點：尚未選擇",
  prompt: "提示詞：尚未生成"
};

const MUUSIC_WEB_URL = "https://plugin1.github.io/aimusicp/?v=20260621-tooltip1";
const MUUSIC_EMPTY_META = {
  saveName: "尚未讀取存檔",
  exportedAt: "",
  source: ""
};

const MUUSIC_TABS = [
  ["humming", "哼唱", "聲音線", "#e7a7bd"],
  ["arrangement", "編曲", "聲音線", "#c8a074"],
  ["inspiration", "靈感", "文字線", "#f1c84f"],
  ["lyrics", "歌詞", "文字線", "#8fb7dc"],
  ["prompt", "提示詞", "整理出口", "#918ee8"]
];

const MUUSIC_SOURCE_LABELS = {
  handoff: "網頁跳轉",
  current: "當前",
  auto: "自動存檔",
  manual: "手動存檔",
  archive: "收藏",
  import: "匯入"
};

let muusicState = { ...MUUSIC_DEFAULT };
let muusicMeta = { ...MUUSIC_EMPTY_META };
let muusicRecords = [];
let muusicCurrentRecordId = "";
let muusicActive = "humming";
let muusicOpenOnRender = false;
let muusicLastEditable = null;

if (!window.__muusicSunoLoaded) {
  window.__muusicSunoLoaded = true;
  initMuUsic();
}

async function initMuUsic() {
  const saved = await chrome.storage.local.get([
    "muusicConclusions",
    "muusicMeta",
    "muusicRecords",
    "muusicCurrentRecordId",
    "motiflabConclusions",
    "motiflabMeta"
  ]);
  muusicRecords = normalizeStoredRecords(saved.muusicRecords || []);

  const handoff = readHandoffFromUrl();
  if (handoff) {
    const record = upsertMuUsicRecord(handoff, "handoff");
    applyRecord(record);
    muusicOpenOnRender = true;
    clearHandoffFromUrl();
    await persistMuUsic();
  } else if (muusicRecords.length) {
    const record = muusicRecords.find((item) => item.id === saved.muusicCurrentRecordId) || muusicRecords[0];
    applyRecord(record);
  } else {
    const legacySystems = saved.muusicConclusions || saved.motiflabConclusions;
    if (legacySystems) {
      const record = upsertMuUsicRecord({
        meta: saved.muusicMeta || saved.motiflabMeta || { saveName: "舊版插件暫存", source: "import" },
        systems: legacySystems
      }, "import");
      applyRecord(record);
      await persistMuUsic();
    }
  }

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
        <button class="muusic-icon" type="button" data-close aria-label="關閉">×</button>
      </header>
      <div class="muusic-picker">
        <div class="muusic-picker-head">
          <label>選擇存檔</label>
          <button class="muusic-link" type="button" data-open-web>回網頁版</button>
        </div>
        <div class="muusic-record-list" data-record-list></div>
      </div>
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
          <button class="muusic-secondary" type="button" data-fill-focused>填入 Suno 輸入框</button>
        </div>
        <hr />
        <div class="muusic-field">
          <label>匯入 MuUsic 存檔 JSON</label>
          <textarea class="muusic-import" data-import-box placeholder="在網頁版提示詞系統點「複製插件資料」，再貼到這裡。可以一次匯入多個存檔。"></textarea>
        </div>
        <div class="muusic-actions">
          <button class="muusic-secondary" type="button" data-import>匯入</button>
          <button class="muusic-secondary" type="button" data-reset>重置插件暫存</button>
        </div>
        <p class="muusic-note" data-empty-note>一般打開插件時，先在上方選擇要讀取的存檔；如果是從 MuUsic 網頁版提示詞系統的 ✓ 跳到 Suno，會自動接續剛剛那個檔。</p>
        <div class="muusic-toast" data-toast></div>
      </div>
    </section>
  `;
  document.documentElement.appendChild(root);
  rememberEditableTargets(root);
  bindMuUsic(root);
  updateMuUsicUI(root);
  if (muusicOpenOnRender) root.classList.add("open");
}

function bindMuUsic(root) {
  root.querySelector(".muusic-launch").addEventListener("click", () => root.classList.add("open"));
  root.querySelector("[data-close]").addEventListener("click", () => root.classList.remove("open"));
  root.querySelector("[data-open-web]").addEventListener("click", () => window.open(MUUSIC_WEB_URL, "_blank", "noopener"));
  root.querySelector("[data-record-list]").addEventListener("click", (event) => {
    const button = event.target.closest("[data-load-record]");
    if (!button) return;
    const record = muusicRecords.find((item) => item.id === button.dataset.loadRecord);
    if (!record) return;
    applyRecord(record);
    updateMuUsicUI(root);
    persistMuUsic();
    showToast(root, `已讀取：${record.name}`);
  });
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
  root.querySelector("[data-import]").addEventListener("click", () => importData(root));
  root.querySelector("[data-reset]").addEventListener("click", async () => {
    muusicState = { ...MUUSIC_DEFAULT };
    muusicMeta = { ...MUUSIC_EMPTY_META };
    muusicRecords = [];
    muusicCurrentRecordId = "";
    await persistMuUsic();
    updateMuUsicUI(root);
    showToast(root, "已清空插件暫存");
  });
}

function updateMuUsicUI(root) {
  root.querySelectorAll("[data-tab]").forEach((button) => button.classList.toggle("active", button.dataset.tab === muusicActive));
  const label = MUUSIC_TABS.find(([id]) => id === muusicActive)?.[1] || "段落";
  const imported = muusicMeta.exportedAt || Object.values(muusicState).some((text) => !/^.+尚未/.test(text));
  root.classList.toggle("has-import", Boolean(imported));
  root.querySelector("[data-save-source]").textContent = imported
    ? `讀取：${muusicMeta.saveName || "未命名存檔"}${muusicMeta.exportedAt ? " · " + formatTime(muusicMeta.exportedAt) : ""}`
    : "請先選擇或匯入 MuUsic 存檔";
  root.querySelector("[data-current-label]").textContent = `${label}系統結論詞`;
  root.querySelector("[data-current-text]").value = muusicState[muusicActive] || "";
  renderRecordList(root);
}

function renderRecordList(root) {
  const list = root.querySelector("[data-record-list]");
  if (!muusicRecords.length) {
    list.innerHTML = `<p>尚未有插件存檔。從網頁版 ✓ 跳轉，或貼上「複製插件資料」。</p>`;
    return;
  }
  list.innerHTML = muusicRecords.map((record) => {
    const active = record.id === muusicCurrentRecordId ? " active" : "";
    const source = MUUSIC_SOURCE_LABELS[record.source] || "存檔";
    return `<button class="muusic-record${active}" type="button" data-load-record="${escapeAttr(record.id)}">
      <strong>${escapeHtml(record.name)}</strong>
      <small>${source} · ${formatTime(record.updatedAt)}</small>
    </button>`;
  }).join("");
}

function saveCurrentText(root) {
  muusicState[muusicActive] = root.querySelector("[data-current-text]").value;
  updateCurrentRecordFromState();
  persistMuUsic();
}

function updateCurrentRecordFromState() {
  if (!muusicCurrentRecordId) return;
  const record = muusicRecords.find((item) => item.id === muusicCurrentRecordId);
  if (!record) return;
  const updatedAt = new Date().toISOString();
  record.systems = { ...muusicState };
  record.meta = { ...record.meta, ...muusicMeta, exportedAt: updatedAt, editedInPlugin: true };
  record.updatedAt = updatedAt;
}

async function persistMuUsic() {
  await chrome.storage.local.set({
    muusicConclusions: muusicState,
    muusicMeta,
    muusicRecords,
    muusicCurrentRecordId
  });
}

function buildAllText() {
  return MUUSIC_TABS.map(([id, label, group]) => `【${group} / ${label}】\n${muusicState[id] || ""}`).join("\n\n");
}

async function copyText(text, root, message) {
  await navigator.clipboard.writeText(text || "");
  showToast(root, message);
}

function fillFocused(root) {
  const active = getEditableTarget(document.activeElement, root) || getEditableTarget(muusicLastEditable, root);
  const text = muusicState[muusicActive] || "";
  if (!active) {
    copyText(text, root, "未找到輸入框，已改為複製");
    return;
  }
  if ("value" in active) {
    active.focus();
    const prefix = active.value ? "\n" : "";
    const start = typeof active.selectionStart === "number" ? active.selectionStart : active.value.length;
    const end = typeof active.selectionEnd === "number" ? active.selectionEnd : active.value.length;
    if (typeof active.setRangeText === "function") {
      active.setRangeText(`${prefix}${text}`, start, end, "end");
    } else {
      active.value = `${active.value || ""}${prefix}${text}`;
    }
    active.dispatchEvent(new Event("input", { bubbles: true }));
  } else {
    active.focus();
    const inserted = document.execCommand?.("insertText", false, `${active.textContent ? "\n" : ""}${text}`);
    if (!inserted) active.textContent = `${active.textContent || ""}${active.textContent ? "\n" : ""}${text}`;
    active.dispatchEvent(new InputEvent("input", { bubbles: true, inputType: "insertText", data: text }));
  }
  showToast(root, "已填入目前輸入框");
}

function rememberEditableTargets(root) {
  document.addEventListener("focusin", (event) => {
    const target = getEditableTarget(event.target, root);
    if (target) muusicLastEditable = target;
  }, true);
}

function getEditableTarget(target, root) {
  if (!target || root?.contains(target)) return null;
  if (target instanceof HTMLTextAreaElement) return target;
  if (target instanceof HTMLInputElement && /^(text|search|url|email|tel|password)?$/i.test(target.type || "text")) return target;
  if (target.isContentEditable) return target;
  return null;
}

async function importData(root) {
  const raw = root.querySelector("[data-import-box]").value.trim();
  if (!raw) return showToast(root, "先貼上 JSON");
  try {
    const parsed = JSON.parse(raw);
    const imported = getRecordsFromPayload(parsed);
    if (!imported.length) return showToast(root, "沒有讀到可用存檔");
    imported.forEach((item) => upsertMuUsicRecord(item, item.meta?.source || "import"));
    const activeId = parsed.activeRecordId || imported[0].meta?.recordId || imported[0].meta?.id;
    const record = muusicRecords.find((item) => item.id === activeId) || muusicRecords[0];
    applyRecord(record);
    await persistMuUsic();
    root.querySelector("[data-import-box]").value = "";
    updateMuUsicUI(root);
    showToast(root, `已匯入 ${imported.length} 個存檔`);
  } catch (error) {
    showToast(root, "JSON 格式不對");
  }
}

function getRecordsFromPayload(payload) {
  if (Array.isArray(payload?.records)) return payload.records;
  if (payload?.active && typeof payload.active === "object") return [payload.active];
  if (payload?.systems || payload?.humming || payload?.prompt) return [payload];
  return [];
}

function upsertMuUsicRecord(data, fallbackSource) {
  const record = normalizeRecord(data, fallbackSource);
  const existing = muusicRecords.findIndex((item) => item.id === record.id);
  if (existing >= 0) muusicRecords[existing] = record;
  else muusicRecords.unshift(record);
  muusicRecords.sort((a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0));
  return record;
}

function applyRecord(record) {
  if (!record) return;
  muusicCurrentRecordId = record.id;
  muusicState = { ...MUUSIC_DEFAULT, ...record.systems };
  muusicMeta = { ...MUUSIC_EMPTY_META, ...record.meta, saveName: record.name, exportedAt: record.updatedAt, source: record.source };
}

function normalizeStoredRecords(records) {
  return records.map((record) => normalizeRecord(record, record.source || "import"));
}

function normalizeRecord(data, fallbackSource = "import") {
  const rawSystems = data.systems || data.data?.systems || pickSystems(data);
  const systems = Object.fromEntries(Object.entries(rawSystems).filter(([, value]) => value !== undefined && value !== null));
  const meta = data.meta || data.data?.meta || {};
  const source = meta.source || data.source || fallbackSource;
  const updatedAt = meta.exportedAt || data.updatedAt || new Date().toISOString();
  const name = meta.saveName || data.name || "未命名存檔";
  const id = String(meta.recordId || meta.id || data.id || `${source}-${name}-${updatedAt}`);
  return {
    id,
    name,
    source,
    updatedAt,
    systems: { ...MUUSIC_DEFAULT, ...systems },
    meta: { ...meta, recordId: id, saveName: name, exportedAt: updatedAt, source }
  };
}

function pickSystems(data) {
  return {
    humming: data.humming,
    inspiration: data.inspiration,
    lyrics: data.lyrics,
    arrangement: data.arrangement,
    prompt: data.prompt
  };
}

function readHandoffFromUrl() {
  const match = window.location.hash.match(/(?:^#|&)muusic=([^&]+)/);
  if (!match) return null;
  try {
    return JSON.parse(decodeBase64Url(match[1]));
  } catch (error) {
    return null;
  }
}

function clearHandoffFromUrl() {
  if (!window.history?.replaceState) return;
  window.history.replaceState(null, document.title, window.location.pathname + window.location.search);
}

function decodeBase64Url(value) {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
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

function escapeHtml(value) {
  return String(value || "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/`/g, "&#096;");
}

function showToast(root, message) {
  const toast = root.querySelector("[data-toast]");
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(toast.dataset.timer);
  toast.dataset.timer = window.setTimeout(() => toast.classList.remove("show"), 1800);
}
