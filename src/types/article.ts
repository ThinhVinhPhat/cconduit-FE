export interface Article {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  slug: string;
  author: {
    username: string;
    bio: string;
    image: string;
  };
  createdAt: string;
  totalLike: number;
  tagList: string[];
}

