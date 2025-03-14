import osUtils from "os-utils";
import os from "os";
import fs from "fs";
import { BrowserWindow, shell } from "electron";
import { ipcWebContentsSend } from "./util.js";
import path from "path";
// import { generateThumbnail } from "./ffmpeg.js";

const POLLING_INTERVAL = 500;

export function pollResources(mainWindow: BrowserWindow) {
  setInterval(async () => {
    const cpuUsage = await getCpuUsage();
    const ramUsage = getRamUsage();
    const storageData = getStorageData();
    ipcWebContentsSend("statistics", mainWindow.webContents, {
      cpuUsage,
      ramUsage,
      storageUsage: storageData.usage,
    });
  }, POLLING_INTERVAL);
}
// 获取本地视频列表
export function getVideoList(folderPath: string) {
  try {
    console.log(folderPath, "获取本地视频列表");
    const files = fs.readdirSync(folderPath);
    const videoFiles = files.filter((file) =>
      /\.(mp4|mkv|avi|mov|wmv)$/i.test(file)
    );
    
    return videoFiles.map((file) => ({
      name: file,
      path: path.join(folderPath, file),
      thumbnail: path.join(folderPath, "thumbnails", file + ".jpg"), // 生成缩略图
    }));
  } catch (error) {
    console.error("Error reading video folder:", error);
    return [];
  }
}
// 打开视频
export function openVideo(videoPath: string) {
  console.log(videoPath, "打开视频");
  shell.openPath(videoPath);
}
// 获取静态硬件信息
export function getStaticData() {
  const totalStorage = getStorageData().total;
  const cpuModel = os.cpus()[0].model;
  const totalMemoryGB = Math.floor(osUtils.totalmem() / 1024);

  return {
    totalStorage,
    cpuModel,
    totalMemoryGB,
  };
}
// 获取 CPU 使用率
function getCpuUsage(): Promise<number> {
  return new Promise((resolve) => {
    osUtils.cpuUsage(resolve);
  });
}
// 获取内存使用率
function getRamUsage() {
  return 1 - osUtils.freememPercentage();
}
// 获取存储使用情况
function getStorageData() {
  // requires node 18
  const stats = fs.statfsSync(process.platform === "win32" ? "C://" : "/");
  const total = stats.bsize * stats.blocks;
  const free = stats.bsize * stats.bfree;

  return {
    total: Math.floor(total / 1_000_000_000),
    usage: 1 - free / total,
  };
}
