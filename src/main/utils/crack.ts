import { spawn } from 'child_process';
import fs from 'fs';
import StatusCodes from '../config/statusCode';
import exe from '../../../resources/index.exe?asset';

// 破解数据库
const crack = async () => {
  return new Promise<string>((resolve) => {
    // 判断可执行文件是否存在
    if (!fs.existsSync(exe)) {
      resolve(StatusCodes.ERROR_NO_CRACK_SCRIPT);
    }
    // todo 获取用户主目录, 判断主目录下是否存在数据库文件, 已经存在则删除
    // 创建子进程
    const child = spawn(exe);
    // 监听子进程的错误输出
    child.stderr.on('data', (data) => {
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
    // 监听子进程退出
    child.on('close', () => {
      resolve(StatusCodes.SUCCESS_CRACK);
    });
    // 监听子进程结束
    child.on('exit', () => {});
  });
};

export default crack;
