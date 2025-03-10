export interface Article {
  id: string;
  userId: string;
  title: string;
  shortDescription: string;
  description: string;
  slug: string;
  author: string;
  createdAt: string;
  totalLike: number;
  tagList: string[];
}

