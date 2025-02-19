import { Input } from "antd";

interface Props {
  onSearch: (query: string) => void;
  // onUpload: () => void;
}
const { Search } = Input;

export const Header = ({ onSearch }: Props) => (
  <div className="flex justify-between items-center mb-6 bg-white">
    <div className="flex-1 max-w-xl">
      <Search
        placeholder="搜索人脸分类..."
        onSearch={onSearch}
        className="w-full"
        allowClear
      />
    </div>
    {/* <div className="flex gap-3 ml-4">
      <Button type="primary" className="w-24" onClick={onUpload}>
        上传新分类
      </Button>
    </div> */}
  </div>
);
