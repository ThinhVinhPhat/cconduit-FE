import { useEffect, useState } from "react";
import { Article } from "../types";
import { Tag } from "../types/tags";
import { useCreatePost } from "../hooks/mutation/post/useCreatePost";
import { usePersonalPosts } from "../hooks/query/article/usePersonalPost";
import { useGetPost } from "../hooks/query/article/usePosts";
import { useGetTag } from "../hooks/query/tag/useGetTags";
import { useAddFavorite } from "../hooks/mutation/favorite/useAddFavorite";
import useGetByTags from "../hooks/query/article/useGetByTag";
import { useFavoritePosts } from "../hooks/query/article/useGetFavorite";
import { useAuthContext } from "./auth-context";
import { useUpdatePost } from "../hooks/mutation/post/useUpdatePost";
import { useDeletePost } from "../hooks/mutation/post/useDeletePost";
import { AxiosError } from "axios";

export type PostContextType = {
  posts: Article[] | undefined;
  favoritePost: Article[] | undefined;
  login: boolean;
  tags: Tag[];
  toggle: string;
  data?: Article[] | undefined;
  isLoading: boolean | undefined;
  error: string;
  personalPostsLoading: boolean | undefined;
  page: number;
  currentFavorite: string[];
  totalPage: number;
  currentTag: Tag[];
  isLogin: (login: boolean) => void;
  handleToggle: (toggle: string) => void;
  handleSetPage: (page: number) => void;
  createArticle: (data: Article) => boolean;
  handleAddTags: (tag: Tag) => void;
  handleDeleteTags: (tag: Tag) => void;
  handleAddFavorite: (articleId: string) => void;
  setCurrentFavorite: (favorite: string[]) => void;
  setCurrentTag: (tag: Tag[]) => void;
  setDataPost: (data: Article[]) => void;
  setToggle: (toggle: string) => void;
  setPage: (page: number) => void;
  updateArticle: (data: Article) => Article | null;
  deleteArticle: (id: string) => boolean;
};

export const PostContext = () => {
  const [dataPost, setDataPost] = useState<Article[]>([]);
  const [currentTag, setCurrentTag] = useState<Tag[]>([]);
  const [currentFavorite, setCurrentFavorite] = useState<string[]>([]);
  const [toggle, setToggle] = useState("global");
  const { me } = useAuthContext();

  const { data, isLoading } = useGetPost(me?.id ?? "0");
  const { data: favoritePost } = useFavoritePosts();
  const { data: tagsPost } = useGetByTags(currentTag);
  const { data: tags } = useGetTag();
  const { data: personalPosts, isLoading: personalPostsLoading } =
    usePersonalPosts(me?.name || "");
  const { mutate: mutateFavorite } = useAddFavorite();
  const [page, setPage] = useState(1);
  const { mutate: mutatePost } = useCreatePost();
  const limit = 10;
  const { data: updatePost, mutate: mutateUpdatePost } = useUpdatePost();
  const { mutate: mutateDeletePost } = useDeletePost();

  useEffect(() => {
    if (favoritePost) {
      const favoriteId = favoritePost?.articles?.map(
        (item: Article) => item.id
      );
      setCurrentFavorite(favoriteId);
    }
  }, [favoritePost?.articles, favoritePost]);

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
      if (error instanceof AxiosError && error.response?.status === 400) {
        console.log(error.response?.data);
        return false;
      }
    }
  };

  //update Article
  const updateArticle = (data: Article) => {
    try {
      mutateUpdatePost(data);
      return updatePost;
    } catch (error) {
      console.log("Failed updating article", error);
      return null;
    }
  };
  //delete Article
  const deleteArticle = (id: string) => {
    try {
      mutateDeletePost(id);
      if (toggle === "personal" && personalPosts) {
        setDataPost(
          personalPosts.articles.filter((item: Article) => item.id != id)
        );
      } else if (toggle === "global") {
        setDataPost(dataPost.filter((item: Article) => item.id != id));
      }
      return true;
    } catch (error) {
      console.log("Failed deleting article", error);
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
    favoritePost: favoritePost?.articles,
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
    updateArticle,
    setCurrentFavorite,
    setCurrentTag,
    setDataPost,
    setToggle,
    setPage,
    deleteArticle,
  };
};

export default PostContext;
