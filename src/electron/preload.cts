const electron = require("electron");

electron.contextBridge.exposeInMainWorld("electron", {
  // 订阅来自主进程的统计数据更新
  subscribeStatistics: (callback) =>
    // 使用 ipcOn 注册监听器，接收事件 statistics，并在接收到数据时调用回调函数
    ipcOn("statistics", (stats) => {
      callback(stats);
    }),
  // 订阅视图变更事件
  subscribeChangeView: (callback) =>
    ipcOn("changeView", (view) => {
      callback(view);
    }),
  // 使用 ipcInvoke 向主进程请求数据，并返回一个 Promise
  getStaticData: () => ipcInvoke("getStaticData"),
  // 使用 ipcSend 发送 sendFrameAction 事件和相关的有效载荷（payload）
  sendFrameAction: (payload) => ipcSend("sendFrameAction", payload),
  // ✅ 获取本地视频列表
  getVideoList: (folderPath: string) => ipcInvoke("getVideoList", folderPath),
  openVideo: (filePath: string) => ipcSend("openVideo", filePath),
} satisfies Window["electron"]);

// 向主进程发送请求并等待响应
function ipcInvoke<Key extends keyof EventPayloadMapping>(
  key: Key,
  ...args: any[]
): Promise<EventPayloadMapping[Key]> {
  console.log(...args, '----->ipcInvoke');
  return electron.ipcRenderer.invoke(key, ...args);
}

// 注册一个事件监听器以接收来自主进程的消息
function ipcOn<Key extends keyof EventPayloadMapping>(
  key: Key,
  callback: (payload: EventPayloadMapping[Key]) => void
) {
  const cb = (_: Electron.IpcRendererEvent, payload: any) => callback(payload);
  // 使用 electron.ipcRenderer.on 注册事件监听器
  electron.ipcRenderer.on(key, cb);
  return () => electron.ipcRenderer.off(key, cb);
}

// 向主进程发送一条 IPC 消息
function ipcSend<Key extends keyof EventPayloadMapping>(
  key: Key,
  payload: EventPayloadMapping[Key]
) {
  electron.ipcRenderer.send(key, payload);
}
