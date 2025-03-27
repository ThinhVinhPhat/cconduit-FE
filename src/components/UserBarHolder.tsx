import { Article, User } from "../types";
import Button from "./Button";

type UserBarHolderProps = {
  post: Article;
  me: User | null;
};

export const UserBarHolder = ({ post, me }: UserBarHolderProps) => {
  return (
    <div className="article-meta">
      <a href="profile.html">
        <img src={post?.author?.image} />
      </a>
      <div className="info">
        <a href="" className="author">
          {post?.author?.username}
        </a>
        <span className="date">
          {new Date(post?.createdAt).toLocaleDateString()}
        </span>
      </div>
      <Button post={post} me={me} />
    </div>
  );
};
