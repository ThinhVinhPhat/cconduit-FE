import { PropsWithChildren, useEffect, useMemo } from "react";
import { Article } from "../types";
import Cookies from "js-cookie";
import PostContext from "./post-context";
import { useAuthContext } from "./auth-context";
import { createContext } from "react";
import { User } from "../types/user";
import { Tag } from "../types/tags";

type ContextType = {
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
  handleLogout: () => void;
  me: User;
};

export const Context = createContext<ContextType | undefined>(undefined);

export const ContextProvider = ({ children }: PropsWithChildren) => {
  const {
    favoritePost,
    currentTag,
    tagsPost,
    setDataPost,
    setCurrentFavorite,
    tags,
    personalPosts,
    isLoading,
    page,
    handleSetPage,
    totalPage,
    createArticle,
    handleAddTags,
    handleDeleteTags,
    handleAddFavorite,
    currentFavorite,
    toggle,
    posts,
    sortedPosts,
    personalPostsLoading,
    setCurrentTag,
    handleToggle,
  } = PostContext();
  const {
    me,
    setUserLogin,
    handleLogin,
    handleRegister,
    handleLogout,
    userLogin,
    error,
  } = useAuthContext();

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      setUserLogin(true);
    }
  }, [setUserLogin]);

  useEffect(() => {
    console.log(favoritePost);
    if (favoritePost && favoritePost.length > 0) {
      const favoriteId = favoritePost.map((item: Article) => item.id);
      setCurrentFavorite(() => favoriteId);
    }
  }, [favoritePost, setCurrentFavorite]);

  useEffect(() => {
    if (currentTag && currentTag.length > 0) {
      setDataPost(() => tagsPost.articles);
    } else {
      if (toggle === "personal" && me) {
        setDataPost(personalPosts.articles);
      } else {
        setDataPost(posts.articles);
      }
    }
  }, [
    posts.articles,
    personalPosts.articles,
    toggle,
    currentTag,
    tagsPost,
    setDataPost,
    me,
  ]);

  const memoizedValue = useMemo(() => {
    return {
      me,
      favoritePost,
      tags,
      posts: posts ? sortedPosts : [],
      login: userLogin,
      isLogin: setUserLogin,
      toggle,
      handleToggle,
      isLoading,
      page,
      handleSetPage,
      totalPage,
      handleLogin,
      handleRegister,
      error,
      personalPostsLoading,
      createArticle,
      handleLogout,
      handleAddTags,
      currentTag,
      handleDeleteTags,
      handleAddFavorite,
      currentFavorite,
      setCurrentFavorite,
      setCurrentTag,
      setDataPost,
      setToggle: handleToggle,
      setPage: handleSetPage,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    currentFavorite,
    me,
    favoritePost,
    posts,
    sortedPosts,
    isLoading,
    userLogin,
    toggle,
    page,
    totalPage,
    error,
    personalPostsLoading,
    currentTag,
  ]);

  return <Context.Provider value={memoizedValue}>{children}</Context.Provider>;
};
