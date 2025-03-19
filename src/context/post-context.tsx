import {
  createContext,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Article } from "../types";
import Cookies from "js-cookie";
import { useGetPost } from "../hooks/query/article/usePosts";
import { login, register } from "../apis/auth";
import { usePersonalPosts } from "../hooks/query/article/usePersonalPost";
import { useCreatePost } from "../hooks/mutation/useCreatePost";
import { useGetMe } from "../hooks/query/user/useGetMe";
import { User } from "../types/user";
import { useGetTag } from "../hooks/query/tag/useGetTags";
import { Tag } from "../types/tags";
import { useFavoritePosts } from "../hooks/query/article/useGetFavorite";
import useGetByTags from "../hooks/query/article/useGetByTag";
import { useAddFavorite } from "../hooks/mutation/useAddFavorite";

type PostContextType = {
  posts: Article[] | undefined;
  favoritePost: Article[] | undefined;
  login: boolean;
  tags: Tag[];
  isLogin: (login: boolean) => void;
  toggle: string;
  handleToggle: (toggle: string) => void;
  data?: Article[] | undefined;
  isLoading: boolean | undefined;
  handleLogin: (email: string, password: string) => void;
  handleRegister: (username: string, email: string, password: string) => void;
  error: string;
  personalPostsLoading: boolean | undefined;
  page: number;
  handleSetPage: (page: number) => void;
  totalPage: number;
  createArticle: (data: Article) => boolean;
  me: User | null;
  handleLogout: () => void;
  currentTag: Tag[];
  handleAddTags: (tag: Tag) => void;
  handleDeleteTags: (tag: Tag) => void;
  handleAddFavorite: (articleId: string) => void;
  currentFavorite: string[];
};

const PostContext = createContext<PostContextType | null>(null);

export default PostContext;

export const PostProvider = ({ children }: PropsWithChildren) => {
  const [dataPost, setDataPost] = useState<Article[]>([]);
  const [currentTag, setCurrentTag] = useState<Tag[]>([]);
  const [currentFavorite, setCurrentFavorite] = useState<string[]>([]);
  const [userLogin, setUserLogin] = useState(false);
  const [toggle, setToggle] = useState("personal");
  const { data, isLoading } = useGetPost();
  const { data: favoritePost } = useFavoritePosts();
  const { data: tagsPost } = useGetByTags(currentTag);
  const { data: me } = useGetMe();
  const { data: tags } = useGetTag();
  const { data: personalPosts, isLoading: personalPostsLoading } =
    usePersonalPosts(me?.name || "");
  const { mutate: mutateFavorite } = useAddFavorite();
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  const { mutate: mutatePost } = useCreatePost();
  const limit = 10;

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      setUserLogin(true);
    }
  }, []);

  useEffect(() => {
    if (favoritePost && favoritePost.length > 0) {
      const favoriteId = favoritePost.map((item: Article) => item.id);
      setCurrentFavorite(favoriteId);
    }
  }, [favoritePost]);

  useEffect(() => {
    if (currentTag && currentTag.length > 0) {
      console.log(tagsPost);

      setDataPost(() => tagsPost.articles);
    } else {
      if (toggle === "personal") {
        setDataPost(personalPosts.articles);
      } else {
        setDataPost(data.articles);
      }
    }
  }, [data.articles, personalPosts.articles, toggle, currentTag]);

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

  //login
  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await login(email, password);
      if (response.accessToken) {
        setUserLogin(true);
        Cookies.set("accessToken", response.accessToken, {
          expires: 1,
        });
      }
    } catch (error: any) {
      if (error.response?.data.statusCode === 404) {
        setError("Invalid email or password");
      }
    }
  };
  //register
  const handleRegister = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      const response = await register(username, email, password);
      setUserLogin(true);
      Cookies.set("accessToken", response.data.accessToken, {
        expires: 1,
      });
    } catch (error: any) {
      if (error.response?.status === 400) {
        setError("Email already exists");
      }
    }
  };
  //logout
  const handleLogout = () => {
    Cookies.remove("accessToken");
    setUserLogin(false);
  };
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

  const memoizedValue = useMemo(() => {
    return {
      me,
      favoritePost,
      tags,
      posts: dataPost ? dataInPage : [],
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
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    currentFavorite,
    me,
    favoritePost,
    dataPost,
    dataInPage,
    isLoading,
    userLogin,
    favoritePost,
    toggle,
    page,
    totalPage,
    error,
    personalPostsLoading,
    handleLogout,
    currentTag,
  ]);

  return (
    <PostContext.Provider value={memoizedValue}>
      {children}
    </PostContext.Provider>
  );
};
