"use strict";
const electron = require("electron");
const utils = require("@electron-toolkit/utils");
const path = require("path");
const child_process = require("child_process");
const fs = require("fs");
function renderToMain() {
  electron.ipcMain.on("ping", () => console.log("pong"));
}
const icon = path.join(__dirname, "../../resources/icon.png");
function createWindow() {
  const mainWindow = new electron.BrowserWindow({
    // 设置窗口的宽度
    width: 1280,
    // 设置窗口的高度
    height: 832,
    // 设置窗口是否可见 如果使用 show: false 创建 BrowserWindow，则尽管窗口实际上处于隐藏状态，但初始可见性状态将为 visible。
    show: false,
    // 窗口菜单栏是否应自动隐藏。设置后，只有当用户按单个 Alt 键时才会显示菜单栏。
    autoHideMenuBar: true,
    // 窗口图标
    ...process.platform === "linux" ? { icon } : {},
    webPreferences: {
      // 指定将在页面中运行其他脚本之前加载的脚本
      preload: path.join(__dirname, "../preload/index.js"),
      // 如果设置，这会将与窗口关联的渲染器沙箱化，使其与 Chromium 操作系统级沙箱兼容并禁用 Node.js 引擎
      sandbox: false
    }
  });
  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });
  mainWindow.webContents.setWindowOpenHandler((details) => {
    electron.shell.openExternal(details.url);
    return { action: "deny" };
  });
  if (utils.is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    mainWindow.loadFile(path.join(__dirname, "../renderer/index.html"));
  }
  mainWindow.webContents.openDevTools();
  return mainWindow;
}
var StatusCodes = /* @__PURE__ */ ((StatusCodes2) => {
  StatusCodes2["ERROR_UNKNOWN"] = "10000";
  StatusCodes2["ERROR_NO_WECHAT_PROCESS"] = "10001";
  StatusCodes2["ERROR_MULTI_WECHAT_PROCESS"] = "10002";
  StatusCodes2["ERROR_NO_WXID"] = "10003";
  StatusCodes2["ERROR_NO_EXE_PATH"] = "10004";
  StatusCodes2["ERROR_NO_KEY"] = "10005";
  StatusCodes2["ERROR_NO_DB_FILE"] = "10006";
  StatusCodes2["ERROR_NO_CRACK_SCRIPT"] = "10007";
  StatusCodes2["SUCCESS_CRACK"] = "10008";
  return StatusCodes2;
})(StatusCodes || {});
const exe = path.join(__dirname, "../../resources/index.exe");
const crack = async () => {
  return new Promise((resolve) => {
    if (!fs.existsSync(exe)) {
      resolve(StatusCodes.ERROR_NO_CRACK_SCRIPT);
    }
    const child = child_process.spawn(exe);
    child.stderr.on("data", (data) => {
      const errCode = data.toString().trim();
      switch (errCode) {
        case StatusCodes.ERROR_NO_WECHAT_PROCESS:
          resolve(StatusCodes.ERROR_NO_WECHAT_PROCESS);
          break;
        case StatusCodes.ERROR_MULTI_WECHAT_PROCESS:
          resolve(StatusCodes.ERROR_MULTI_WECHAT_PROCESS);
          break;
        case StatusCodes.ERROR_NO_WXID:
          resolve(StatusCodes.ERROR_NO_WXID);
          break;
        case StatusCodes.ERROR_NO_EXE_PATH:
          resolve(StatusCodes.ERROR_NO_EXE_PATH);
          break;
        case StatusCodes.ERROR_NO_KEY:
          resolve(StatusCodes.ERROR_NO_KEY);
          break;
        case StatusCodes.ERROR_NO_DB_FILE:
          resolve(StatusCodes.ERROR_NO_DB_FILE);
          break;
        default:
          resolve(StatusCodes.ERROR_UNKNOWN);
          break;
      }
    });
    child.on("close", () => {
      resolve(StatusCodes.SUCCESS_CRACK);
    });
    child.on("exit", () => {
    });
  });
};
async function init(mainWindow) {
  const res = await crack();
  console.log("🚀🚀 ~ init ~ res:", res);
  setTimeout(() => {
    mainWindow.webContents.send("test:test1", { data: res });
  }, 5e3);
}
electron.app.whenReady().then(() => {
  utils.electronApp.setAppUserModelId("com.top.warbler");
  electron.app.on("browser-window-created", (_, window) => {
    utils.optimizer.watchWindowShortcuts(window);
  });
  electron.app.on("window-all-closed", () => {
    electron.app.quit();
  });
  renderToMain();
  const mainWindow = createWindow();
  init(mainWindow);
});
