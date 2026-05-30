const statusEl = document.getElementById("status");
const button = document.getElementById("openPanel");

button.addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id || !isSunoUrl(tab.url || "")) {
    statusEl.textContent = "請先打開 suno.com 或 app.suno.ai。";
    return;
  }
  try {
    await chrome.scripting.insertCSS({
      target: { tabId: tab.id },
      files: ["content.css"]
    });
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["content.js"]
    });
    statusEl.textContent = "已開啟。請看頁面右下角。";
  } catch (error) {
    statusEl.textContent = "注入失敗，請刷新 Suno 頁面後再試。";
  }
});

function isSunoUrl(url) {
  return /^https:\/\/([^/]+\.)?suno\.(com|ai)\//.test(url);
}
