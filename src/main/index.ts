import { app } from 'electron';
import { electronApp, optimizer } from '@electron-toolkit/utils';
import ipc from './ipc';
import createWindow from './methods/createWindow';
import execInit from './methods/execInit';

// 当 electron 准备完成的时候, 就会触发这个事件
app.whenReady().then(() => {
  // 用于设置应用程序的用户模型 ID（App User Model ID）。
  // 这个 ID 主要用于 Windows 操作系统，特别是在任务栏、开始菜单和跳转列表中识别和管理应用程序
  electronApp.setAppUserModelId('com.top.warbler');
  // 创建新的 browserWindow 时触发此事件
  app.on('browser-window-created', (_, window) => {
    // 用于确保在特定窗口中注册的快捷键能够正常工作
    optimizer.watchWindowShortcuts(window);
  });
  // 所有窗口都关闭时, 会触发这个事件
  app.on('window-all-closed', () => {
    // 退出应用程序
    app.quit();
  });
  // 进程间通信
  ipc();
  // 创建浏览器窗口
  const mainWindow = createWindow();
  // 执行初始化操作
  execInit(mainWindow);
});
