import React from "react";
import { VideoList } from "../types"; // 确保你有合适的 VideoList 类型
import { Card } from "antd"; // 你可以使用 Ant Design 的 Card 组件

interface VideoGalleryProps {
  videos: VideoList[]; // 接收视频列表作为 props
  onOpenVideo: (filePath: string) => void; // 接收打开视频的函数
}

export const VideoGallery: React.FC<VideoGalleryProps> = ({ videos, onOpenVideo }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
      {videos.map((video) => (
        <Card
          key={video.path}
          hoverable
          cover={<img alt={video.name} src={video.thumbnail} />}
          onClick={() => onOpenVideo(video.path)}
        >
          <Card.Meta title={video.name} />
        </Card>
      ))}
    </div>
  );
};
