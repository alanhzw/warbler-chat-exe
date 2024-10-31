import { shell, BrowserWindow } from 'electron';
import { join } from 'path';
import { is } from '@electron-toolkit/utils';
import icon from '../../../resources/icon.png?asset';

/**
 * @description: 创建浏览器窗口
 * @return {BrowserWindow}
 */
export default function createWindow(): BrowserWindow {
  // 调用 BrowserWindow 构造函数来创建浏览器窗口
  const mainWindow = new BrowserWindow({
    // 设置窗口的宽度
    width: 1280,
    // 设置窗口的高度
    height: 832,
    // 设置窗口是否可见 如果使用 show: false 创建 BrowserWindow，则尽管窗口实际上处于隐藏状态，但初始可见性状态将为 visible。
    show: false,
    // 窗口菜单栏是否应自动隐藏。设置后，只有当用户按单个 Alt 键时才会显示菜单栏。
    autoHideMenuBar: true,
    // 窗口图标
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      // 指定将在页面中运行其他脚本之前加载的脚本
      preload: join(__dirname, '../preload/index.js'),
      // 如果设置，这会将与窗口关联的渲染器沙箱化，使其与 Chromium 操作系统级沙箱兼容并禁用 Node.js 引擎
      sandbox: false,
    },
  });
  // 当网页已渲染（但未显示）并且窗口可以在没有视觉闪烁的情况下显示时发出。
  mainWindow.on('ready-to-show', () => {
    // 显示窗口并给予窗口焦点。
    mainWindow.show();
  });
  // 定义 window.open 或类似方法尝试打开新窗口方式
  mainWindow.webContents.setWindowOpenHandler((details) => {
    // 使用 shell.openExternal 方法在外部浏览器中打开 URL，而不是在 Electron 应用程序内部创建新的窗口
    shell.openExternal(details.url);
    // 返回 WindowOpenHandlerResponse - 设置为 { action: 'deny' } 时，将取消新窗口的创建
    return { action: 'deny' };
  });
  // 开发模式使用 loadURL
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
  }
  // 生产模式使用 loadFile
  else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }
  // 打开开发者工具
  mainWindow.webContents.openDevTools();
  return mainWindow;
}
