import { PropsWithChildren, useEffect, useMemo } from "react";
import { Article } from "../types";
import Cookies from "js-cookie";
import PostContext from "./post-context";
import { useAuthContext } from "./auth-context";
import { createContext } from "react";
import { User } from "../types/user";
import { Tag } from "../types/tags";

type ContextType = {
  me: User | null;
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
  totalPage: number;
  currentTag: Tag[];
  currentFavorite: string[];
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
  handleLogout: () => void;
  handleLogin: (email: string, password: string) => void;
  handleRegister: (username: string, email: string, password: string) => void;
  updateArticle: (data: Article) => Article | null;
  deleteArticle: (id: string) => boolean;
};

export const Context = createContext<ContextType | undefined>(undefined);

export const ContextProvider = ({ children }: PropsWithChildren) => {
  const {
    favoritePost,
    currentTag,
    tagsPost,
    tags,
    personalPosts,
    page,
    isLoading,
    totalPage,
    currentFavorite,
    toggle,
    posts,
    sortedPosts,
    personalPostsLoading,
    setDataPost,
    setCurrentFavorite,
    handleSetPage,
    createArticle,
    handleAddTags,
    handleDeleteTags,
    handleAddFavorite,
    setCurrentTag,
    handleToggle,
    updateArticle,
    deleteArticle,
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
      toggle,
      isLoading,
      page,
      totalPage,
      error,
      personalPostsLoading,
      currentTag,
      currentFavorite,
      isLogin: setUserLogin,
      handleToggle,
      handleSetPage,
      handleLogin,
      handleRegister,
      createArticle,
      handleLogout,
      handleAddTags,
      handleDeleteTags,
      handleAddFavorite,
      setCurrentFavorite,
      setCurrentTag,
      setDataPost,
      setToggle: handleToggle,
      setPage: handleSetPage,
      updateArticle,
      deleteArticle,
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
