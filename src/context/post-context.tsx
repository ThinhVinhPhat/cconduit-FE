import { createContext, PropsWithChildren, useMemo, useState } from "react";
import { Article } from "../types";
import { Tag } from "../types/tags";

export type ArticleContextType = {
  currentTag: Tag[];
  currentFavorite: string[];
  toggle: string;
  page: number;
  dataPost: Article[];
  totalPage: number;
  setTotalPage: (totalPage: number) => void;
  setDataPost: (data: Article[]) => void;
  setCurrentTag: (tag: Tag[]) => void;
  setCurrentFavorite: (favorite: string[]) => void;
  setToggle: (toggle: string) => void;
  setPage: (page: number) => void;
};

export const ArticleContext = createContext<ArticleContextType | undefined>(
  undefined
);

export const ArticleContextProvider = ({ children }: PropsWithChildren) => {
  const [totalPage, setTotalPage] = useState(0);
  const [dataPost, setDataPost] = useState<Article[]>([]);
  const [currentTag, setCurrentTag] = useState<Tag[]>([]);
  const [currentFavorite, setCurrentFavorite] = useState<string[]>([]);
  const [toggle, setToggle] = useState("global");
  const [page, setPage] = useState(1);
  const [tagPost, setTagPost] = useState<Tag[]>([]);

  const memorizedValue = useMemo(
    () => ({
      tagPost,
      toggle,
      totalPage,
      dataPost,
      page,
      currentFavorite,
      currentTag,
      setCurrentFavorite,
      setCurrentTag,
      setDataPost,
      setToggle,
      setPage,
      setTagPost,
      setTotalPage,
    }),
    [
      tagPost,
      toggle,
      dataPost,
      page,
      totalPage,
      currentFavorite,
      currentTag,
      setTagPost,
      setCurrentFavorite,
      setCurrentTag,
      setDataPost,
      setToggle,
      setPage,
      setTotalPage,
    ]
  );
  return (
    <ArticleContext.Provider value={memorizedValue}>
      {children}
    </ArticleContext.Provider>
  );
};
