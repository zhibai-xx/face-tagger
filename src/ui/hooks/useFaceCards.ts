import { useEffect, useState } from "react";
import { FaceCard } from "../types";

export const useFaceCards = (categoryId?: string) => {
  const [cards, setCards] = useState<FaceCard[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      // 模拟 API 调用
      setTimeout(() => {
        setCards(MOCK_CARDS);
        setIsLoading(false);
        console.log(categoryId);
      }, 500);
    };

    fetchData();
  }, [categoryId]);  // categoryId 变化时触发 useEffect

  return { cards, isLoading };
};

const MOCK_CARDS: FaceCard[] = [
  // 示例数据...
  {
    id: "1",
    name: "张国荣",
    thumbnail: "/src/ui/assets/zgr.jpg",
    videosCount: 1,
    lastUpdated: "2020-01-02",
  },
];
