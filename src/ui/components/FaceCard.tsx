import { FaceCard } from "../types";

interface Props {
  card: FaceCard;
  onClick: (id: string) => void;
}

export const FaceCardComponent = ({ card, onClick }: Props) => (
  <article
    onClick={() => onClick(card.id)}
    className="group cursor-pointer rounded-xl border border-gray-200 
      hover:border-blue-200 transition-all shadow-sm hover:shadow-md"
  >
    <div className="relative aspect-square overflow-hidden rounded-t-xl">
      <img
        src={card.thumbnail}
        alt={card.name}
        className="w-full h-full object-cover transition-transform 
          group-hover:scale-105"
      />
    </div>
    <div className="p-4">
      <h3 className="font-medium text-gray-900 truncate">{card.name}</h3>
      <div className="mt-2 flex justify-between text-sm text-gray-500">
        <span>{card.videosCount} videos</span>
        <time>{card.lastUpdated}</time>
      </div>
    </div>
  </article>
);
