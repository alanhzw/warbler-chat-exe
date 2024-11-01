import fs from 'fs';
import { homedir } from 'os';

// 连接微信数据库
export default async function connectWXDB() {
  // 获取用户主目录
  const userHome = homedir();
  console.log('🚀🚀 ~ connectWXDB ~ userHome:', userHome);
  if (userHome) await fs.promises.access(userHome);
  // 检查微信数据库文件是否存在
  // await fs.promises.access();
}
