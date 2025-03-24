import { Tag } from "./tags";

export interface Article {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  slug: string;
  favorited: boolean;
  author: {
    id: string;
    username: string;
    bio: string;
    image: string;
    following: boolean;
  };
  createdAt: string;
  favoritesCount: number;
  tagList: Tag[];
}
