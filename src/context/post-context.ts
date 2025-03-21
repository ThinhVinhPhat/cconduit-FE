import { useState } from "react";
import { Article } from "../types";
import { Tag } from "../types/tags";
import { useCreatePost } from "../hooks/mutation/useCreatePost";
import { usePersonalPosts } from "../hooks/query/article/usePersonalPost";
import { useGetPost } from "../hooks/query/article/usePosts";
import { useGetTag } from "../hooks/query/tag/useGetTags";
import { useAddFavorite } from "../hooks/mutation/useAddFavorite";
import useGetByTags from "../hooks/query/article/useGetByTag";
import { useFavoritePosts } from "../hooks/query/article/useGetFavorite";
import { useAuthContext } from "./auth-context";

export type PostContextType = {
  posts: Article[] | undefined;
  favoritePost: Article[] | undefined;
  login: boolean;
  tags: Tag[];
  isLogin: (login: boolean) => void;
  toggle: string;
  handleToggle: (toggle: string) => void;
  data?: Article[] | undefined;
  isLoading: boolean | undefined;
  error: string;
  personalPostsLoading: boolean | undefined;
  page: number;
  handleSetPage: (page: number) => void;
  totalPage: number;
  createArticle: (data: Article) => boolean;
  currentTag: Tag[];
  handleAddTags: (tag: Tag) => void;
  handleDeleteTags: (tag: Tag) => void;
  handleAddFavorite: (articleId: string) => void;
  currentFavorite: string[];
  setCurrentFavorite: (favorite: string[]) => void;
  setCurrentTag: (tag: Tag[]) => void;
  setDataPost: (data: Article[]) => void;
  setToggle: (toggle: string) => void;
  setPage: (page: number) => void;
};

export const PostContext = () => {
  const [dataPost, setDataPost] = useState<Article[]>([]);
  const [currentTag, setCurrentTag] = useState<Tag[]>([]);
  const [currentFavorite, setCurrentFavorite] = useState<string[]>([]);
  const [toggle, setToggle] = useState("personal");
  const { me } = useAuthContext();
  const { data, isLoading } = useGetPost();
  const { data: favoritePost } = useFavoritePosts();
  const { data: tagsPost } = useGetByTags(currentTag);
  const { data: tags } = useGetTag();
  const { data: personalPosts, isLoading: personalPostsLoading } =
    usePersonalPosts(me?.name || "");
  const { mutate: mutateFavorite } = useAddFavorite();
  const [page, setPage] = useState(1);
  const { mutate: mutatePost } = useCreatePost();
  const limit = 10;

  //toggle post type
  const handleToggle = (toggle: string) => {
    setToggle(toggle);
  };

  //pagination
  const handleSetPage = (page: number) => {
    setPage(page);
  };

  const dataInPage = dataPost?.slice((page - 1) * limit, page * limit);
  const totalPage = Math.ceil(dataPost?.length / limit);

  //create Article
  const createArticle = (data: Article) => {
    try {
      mutatePost(data);
      return true;
    } catch (error) {
      console.log("Failed creating article", error);

      return false;
    }
  };

  //handle add tags
  const handleAddTags = (tag: Tag) => {
    const existTag = currentTag.find((item) => tag.title == item.title);
    if (existTag) {
      return;
    }
    if (tag) {
      setCurrentTag((prev: Tag[]) => [...prev, tag]);
    }
  };
  //handle delete tags
  const handleDeleteTags = (tag: Tag) => {
    setCurrentTag(currentTag.filter((item) => item.title != tag.title));
  };

  //handle add favorite
  const handleAddFavorite = (articleId: string) => {
    try {
      mutateFavorite(articleId);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return {
    toggle,
    posts: data,
    sortedPosts: dataInPage,
    favoritePost: favoritePost,
    tags: tags,
    personalPosts,
    totalPage,
    page,
    currentFavorite,
    currentTag,
    tagsPost,
    personalPostsLoading,
    isLoading,
    handleAddFavorite,
    handleDeleteTags,
    handleAddTags,
    handleToggle,
    handleSetPage,
    createArticle,
    setCurrentFavorite,
    setCurrentTag,
    setDataPost,
    setToggle,
    setPage,
  };
};

export default PostContext;
