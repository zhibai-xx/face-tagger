import { ipcMain, WebContents, WebFrameMain } from "electron";
import { getUIPath } from "./pathResolver.js";
import { pathToFileURL } from "url";

export function isDev(): boolean {
  return process.env.NODE_ENV === "development";
}
// 监听 ipcMain.handle() 事件，用于处理渲染进程的异步请求，并返回一个 Promise，它通常用于请求数据的场景。
export function ipcMainHandle<Key extends keyof EventPayloadMapping>(
  key: Key,
  handler: (args: string) => EventPayloadMapping[Key]
) {
  ipcMain.handle(key, async (event, args) => {
    // validateEventFrame(event.senderFrame);
    // return handler();
    try {
      validateEventFrame(event.senderFrame);
      return await handler(args);
    } catch (error) {
      const errorMessage = (error as Error).message || "Unknown error occurred";
      console.error("IPC Handle Error:", error);
      return { error: errorMessage };
    }
  });
}
// 监听 ipcMain.on() 事件，用于处理渲染进程的同步消息，不返回 Promise。通常用于不需要返回结果的事件，例如点击事件。
export function ipcMainOn<Key extends keyof EventPayloadMapping>(
  key: Key,
  handler: (payload: EventPayloadMapping[Key]) => void
) {
  ipcMain.on(key, (event, payload) => {
    validateEventFrame(event.senderFrame);
    return handler(payload);
  });
}
// 在主进程中，使用 webContents.send() 向 指定的渲染进程 发送事件
export function ipcWebContentsSend<Key extends keyof EventPayloadMapping>(
  key: Key,
  webContents: WebContents,
  payload: EventPayloadMapping[Key]
) {
  webContents.send(key, payload);
}
// 检查 IPC 事件的 来源是否可信
export function validateEventFrame(frame: WebFrameMain | null) {
  if (!frame) {
    throw new Error("senderFrame is null");
  }
  if (isDev() && new URL(frame.url).host === "localhost:5123") {
    return;
  }
  if (frame.url !== pathToFileURL(getUIPath()).toString()) {
    throw new Error("Malicious event");
  }
}