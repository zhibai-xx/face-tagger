import path from 'path';
import { app } from 'electron';
import { isDev } from './util.js';

// 返回拼接后的完整路径，指向预加载脚本
export function getPreloadPath() {
  return path.join(
    app.getAppPath(),
    isDev() ? '.' : '..',
    '/dist-electron/preload.cjs'
  );
}

// 返回拼接后的完整路径，指向 React 的入口 HTML 文件
export function getUIPath() {
  return path.join(app.getAppPath(), '/dist-react/index.html');
}
// 返回拼接后的完整路径，指向资源文件的目录
export function getAssetPath() {
  return path.join(app.getAppPath(), isDev() ? '.' : '..', '/src/assets');
}