import { useState } from "react";
import { Header } from "../components/Header";
import { FaceCardComponent } from "../components/FaceCard";
import { ClassificationList } from "../components/ClassificationList";
import { useFaceCards } from "../hooks/useFaceCards"; // 确保该 Hook 存在
import { Classification } from "@/ui/types";

export const FaceRecognitionUI = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>();
  // searchQuery
  // const [searchQuery, setSearchQuery] = useState("");
  const { cards, isLoading } = useFaceCards(selectedCategory); // useFaceCards自定义hook

  const classifications: Classification[] = [
    {
      id: "id1",
      name: "韩国",
      count: 1,
    },
    {
      id: "id2",
      name: "动漫",
      count: 2,
    },
  ];

  const handleCardClick = (cardId: string) => {
    console.log(cardId);
    // 处理卡片点击逻辑
  };

  return (
    <div className="flex bg-gray-50 h-full">
      <ClassificationList
        classifications={classifications}
        selectedId={selectedCategory}
        onSelect={setSelectedCategory} // 下面的onSelect就等于setSelectedCategory，子组件onSelect(id)=setSelectedCategory(id)
      />
      <main className="flex-1 p-6 overflow-auto">
        <Header onSearch={(e) => console.log(e)} />

        {isLoading ? (
          <div className="text-center py-12 text-gray-500">加载中...</div>
        ) : (
          <div
            className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 
              xl:grid-cols-4 gap-6"
          >
            {cards.map((card) => (
              <FaceCardComponent
                key={card.id}
                card={card}
                onClick={handleCardClick}
              />
            ))}
            {cards.map((card) => (
              <FaceCardComponent
                key={card.id}
                card={card}
                onClick={handleCardClick}
              />
            ))}
            {cards.map((card) => (
              <FaceCardComponent
                key={card.id}
                card={card}
                onClick={handleCardClick}
              />
            ))}
            {cards.map((card) => (
              <FaceCardComponent
                key={card.id}
                card={card}
                onClick={handleCardClick}
              />
            ))}
            {cards.map((card) => (
              <FaceCardComponent
                key={card.id}
                card={card}
                onClick={handleCardClick}
              />
            ))}
            {cards.map((card) => (
              <FaceCardComponent
                key={card.id}
                card={card}
                onClick={handleCardClick}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
