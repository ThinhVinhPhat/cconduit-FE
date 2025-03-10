import {
  createContext,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Article } from "../types";
import Cookies from "js-cookie";
import { useGetPost } from "../hooks/query/usePost";
import { login, register } from "../apis/auth/login";
import { usePersonalPosts } from "../hooks/query/usePersonalPost";

type PostContextType = {
  posts: Article[] | undefined;
  login: boolean;
  isLogin: (login: boolean) => void;
  favoriteArticles: Article[];
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
};

const sampleArticles: Article[] = [
  {
    id: "cm7o836e20000trv0i6y4m77e",
    userId: "cm7niwxnb0000tr0cqt87md4p",
    title: "Article title",
    shortDescription: "Article shortDescription",
    description: "Article description",
    slug: "article-title",
    author: "Article author",
    createdAt: "2025-01-20",
    totalLike: 29,
    tagList: ["realworld", "implementations"],
    user: {
      id: "cm7niwxnb0000tr0cqt87md4p",
      username: "Article author",
      email: "article@author.com",
      image: "https://i.imgur.com/Qr71crq.jpg",
    },
  },
];

const PostContext = createContext<PostContextType | null>(null);

export default PostContext;

export const PostProvider = ({ children }: PropsWithChildren) => {
  const [dataPost, setDataPost] = useState<Article[]>([]);
  const [favoriteArticles, setFavoriteArticles] = useState<Article[]>([]);
  const [userLogin, setUserLogin] = useState(false);
  const [toggle, setToggle] = useState("personal");
  const { data, isLoading } = useGetPost();
  const { data: personalPosts, isLoading: personalPostsLoading } =
    usePersonalPosts();
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  const limit = 10;

  useEffect(() => {
    setFavoriteArticles(sampleArticles);
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      setUserLogin(true);
    }
  }, []);

  useEffect(() => {
    if (toggle === "personal") {
      setDataPost(personalPosts);
    } else {
      setDataPost(data.articles);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggle]);

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
    } catch (error) {
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
    } catch (error) {
      if (error.response?.status === 400) {
        setError("Email already exists");
      }
    }
  };

  const memoizedValue = useMemo(() => {
    return {
      posts: dataInPage,
      login: userLogin,
      isLogin: setUserLogin,
      favoriteArticles,
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
    };
  }, [
    dataInPage,
    isLoading,
    userLogin,
    favoriteArticles,
    toggle,
    page,
    totalPage,
    error,
    personalPostsLoading,
  ]);

  return (
    <PostContext.Provider value={memoizedValue}>
      {children}
    </PostContext.Provider>
  );
};
