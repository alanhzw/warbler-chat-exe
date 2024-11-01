import { BrowserWindow } from 'electron';
import crack from '../utils/crack';
import StatusCodes from '../config/statusCode';

/**
 * @description: 初始化程序
 * @param {BrowserWindow} mainWindow 浏览器主窗口
 * @return {*}
 */
export default async function init(mainWindow: BrowserWindow) {
  try {
    // 破解微信本地数据库
    const status = await crack();
    // 通知渲染进程破解状态
    mainWindow.webContents.send('crack:status', { status });
    // 如果破解不成功, 直接返回, 由渲染进程处理
    if (status !== StatusCodes.SUCCESS_CRACK) return;
    // 连接数据库
  } catch (error) {
    // todo 在软件根目录下生成错误日志
    console.error(error);
  }
}
