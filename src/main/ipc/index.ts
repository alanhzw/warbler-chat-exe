import { ipcMain } from 'electron';

export default function renderToMain() {
  ipcMain.on('ping', () => console.log('pong'));
}
