/* 状态码 */
enum StatusCodes {
  /* 未知错误 */
  ERROR_UNKNOWN = '10000',
  /* 没有找到微信进程 */
  ERROR_NO_WECHAT_PROCESS = '10001',
  /* 存在多个微信进程 需要关闭微信多开 */
  ERROR_MULTI_WECHAT_PROCESS = '10002',
  /* 未获取到微信原始ID */
  ERROR_NO_WXID = '10003',
  /* 未获取到微信可执行程序 */
  ERROR_NO_EXE_PATH = '10004',
  /* 未获取到微信数据库密钥 */
  ERROR_NO_KEY = '10005',
  /* 未获取到微信数据库文件 */
  ERROR_NO_DB_FILE = '10006',
  /* 破解脚本不存在 */
  ERROR_NO_CRACK_SCRIPT = '10007',
  /* 破解数据库成功 */
  SUCCESS_CRACK = '10008',
}

export default StatusCodes;
