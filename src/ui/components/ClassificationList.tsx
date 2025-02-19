import { Classification } from "../types";
import { FolderOpenOutlined } from "@ant-design/icons";
import { Tag } from "antd";

interface Props {
  classifications: Classification[];
  selectedId?: string;
  onSelect: (id: string) => void;
}

export const ClassificationList = ({
  classifications,
  selectedId,
  onSelect,
}: Props) => (
  <div className="w-64 px-4 pt-4 border-r border-gray-200">
    {/* <h2 className="my-1 text-sm font-medium text-gray-700">视频分类</h2> */}
    <nav className="space-y-1">
      {classifications.map(({ id, name, count }) => (
        <Tag
          icon={<FolderOpenOutlined />}
          key={id}
          onClick={() => onSelect(id)}
          color={selectedId === id ? "success" : "processing"}
          className={`w-full text-left mb-1 px-4 py-2 rounded-lg transition-colors`}
        >
          {name + count}
        </Tag>
      ))}
    </nav>
  </div>
);
