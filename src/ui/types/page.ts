export type Classification = {
  id: string;
  name: string;
  count: number;
};

export type FaceCard = {
  id: string;
  name: string;
  thumbnail: string;
  videosCount: number;
  lastUpdated: string;
};

export type VideoList = {
  name: string;
  thumbnail: string;
  path: string;
};
