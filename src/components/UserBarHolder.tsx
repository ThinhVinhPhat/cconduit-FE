import { Link } from "react-router-dom";
import { Article, User } from "../types";
import Button from "./Button";

type UserBarHolderProps = {
  post: Article;
  me: User | null;
};

export const UserBarHolder = ({ post, me }: UserBarHolderProps) => {
  return (
    <div className="article-meta">
      <Link to={`/profile/${post?.author?.username}`}>
        <img src={post?.author?.image} />
      </Link>
      <div className="info">
        <Link to={`/profile/${post?.author?.username}`} className="author">
          {post?.author?.username}
        </Link>
        <span className="date">
          {new Date(post?.createdAt).toLocaleDateString()}
        </span>
      </div>
      <Button post={post} me={me} />
    </div>
  );
};
