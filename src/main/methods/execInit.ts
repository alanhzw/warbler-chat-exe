import { BrowserWindow } from 'electron';
import crack from '../utils/crack';

/**
 * @description: 初始化程序
 * @param {BrowserWindow} mainWindow 浏览器主窗口
 * @return {*}
 */
export default async function init(mainWindow: BrowserWindow) {
  const res = await crack();
  console.log('🚀🚀 ~ init ~ res:', res);
  // 监听主进程向渲染进程的通信
  setTimeout(() => {
    mainWindow.webContents.send('test:test1', { data: res });
  }, 5000);
}
