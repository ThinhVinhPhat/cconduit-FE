export interface Comment {
  id: string;
  body: string;
  createdAt: string;
  author: {
    username: string;
    bio: string;
    image: string;
  };
}
