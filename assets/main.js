/* 百九小說網站 共用腳本：深色模式、閱讀字級、giscus 主題同步 */
(function () {
  // ---- 浮動工具列 ----
  var tools = document.createElement("div");
  tools.className = "reader-tools";

  var isReading = !!document.querySelector(".novel-main");

  if (isReading) {
    var smaller = document.createElement("button");
    smaller.textContent = "A−";
    smaller.title = "縮小字體";
    var bigger = document.createElement("button");
    bigger.textContent = "A＋";
    bigger.title = "放大字體";
    tools.appendChild(smaller);
    tools.appendChild(bigger);

    var SIZE_KEY = "reading-size";
    function applySize(v) {
      document.documentElement.style.setProperty("--reading-size", v + "em");
      localStorage.setItem(SIZE_KEY, v);
    }
    var size = parseFloat(localStorage.getItem(SIZE_KEY)) || 1.06;
    applySize(size);
    smaller.onclick = function () { size = Math.max(0.9, +(size - 0.06).toFixed(2)); applySize(size); };
    bigger.onclick = function () { size = Math.min(1.5, +(size + 0.06).toFixed(2)); applySize(size); };
  }

  var toggle = document.createElement("button");
  toggle.textContent = "🌗 切換模式";
  toggle.onclick = function () {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("dark-mode", document.body.classList.contains("dark-mode"));
    syncGiscus();
  };
  tools.appendChild(toggle);
  document.body.appendChild(tools);

  if (localStorage.getItem("dark-mode") === "true") {
    document.body.classList.add("dark-mode");
  }

  // ---- giscus 留言區跟著深淺色切換 ----
  function syncGiscus() {
    var frame = document.querySelector("iframe.giscus-frame");
    if (!frame) return;
    var theme = document.body.classList.contains("dark-mode") ? "dark" : "light";
    frame.contentWindow.postMessage(
      { giscus: { setConfig: { theme: theme } } },
      "https://giscus.app"
    );
  }
  window.addEventListener("load", function () { setTimeout(syncGiscus, 1500); });
})();
