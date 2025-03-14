import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from 'ffmpeg-static';
import path from 'path';

// 确保 ffmpegPath 是字符串，并处理可能的 null 值
const ffmpegExecutablePath = (ffmpegPath as unknown) as string; // 先转换为 unknown 再转换为 string

if (!ffmpegExecutablePath) {
  throw new Error('FFmpeg path is not defined. Please check your installation.');
}

export function generateThumbnail(videoPath: string, thumbnailPath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    ffmpeg(videoPath)
      .setFfmpegPath(ffmpegExecutablePath) // 使用字符串路径设置 FFmpeg 路径
      .on('end', () => {
        console.log('Thumbnail generated:', thumbnailPath);
        resolve(thumbnailPath);
      })
      .on('error', (err: Error) => {
        console.error('Error generating thumbnail:', err);
        reject(err);
      })
      .screenshots({
        count: 1,
        folder: path.dirname(thumbnailPath),
        filename: path.basename(thumbnailPath),
        size: '320x240', // 缩略图尺寸
      });
  });
}
