import { Article } from "../types";
import { useEffect } from "react";
import { useGetPost } from "./query/article/usePosts";
import { useGetMe } from "./query/user/useGetMe";
import { useArticleContext } from "./useArticleContext";
import { useFavoritePosts } from "./query/article/useGetFavorite";
import { usePersonalPosts } from "./query/article/usePersonalPost";
import { useCreatePost } from "./mutation/post/useCreatePost";
import { useUpdatePost } from "./mutation/post/useUpdatePost";
import { useDeletePost } from "./mutation/post/useDeletePost";
import { AxiosError } from "axios";
import { useAddFavorite } from "./mutation/favorite/useAddFavorite";
import useGetByTags from "./query/article/useGetByTag";
import { useGetFollower } from "./query/following/use-get-follower";

export const useArticleAction = () => {
  const {
    page,
    toggle,
    currentTag,
    dataPost,
    setDataPost,
    setTotalPage,
    setCurrentFavorite,
  } = useArticleContext();
  const { data: me } = useGetMe();
  const offset = (page - 1) * 10;
  const { data: followers } = useGetFollower();
  const { mutate: mutatePost } = useCreatePost();
  const { data: updatePost, mutate: mutateUpdatePost } = useUpdatePost();
  const { mutate: mutateDeletePost } = useDeletePost();
  const { mutate: mutateFavorite } = useAddFavorite();
  const { data: tagsPost } = useGetByTags(currentTag);

  const { data: favoritePost } = useFavoritePosts(offset, 10000);

  const { data: posts, isLoading: isLoadingPosts } = useGetPost(
    me?.id || "0",
    offset,
    10000
  );

  const { data: personalPosts } = usePersonalPosts(
    me?.name || "0",
    followers,
    offset,
    10000
  );
  useEffect(() => {
    if (!posts && !personalPosts && !favoritePost) return;

    if (currentTag && currentTag.length > 0) {
      setDataPost((prev: Article[]) => (prev !== tagsPost ? tagsPost : prev));
    } else {
      if (toggle === "global") {
        const newPosts = posts?.articles?.slice(0, 10);
        if (JSON.stringify(dataPost) !== JSON.stringify(newPosts)) {
          setDataPost(newPosts);
          setTotalPage(Math.ceil(posts?.articleCount / 10));
        }
      } else if (toggle === "personal" && me) {
        const newPosts = personalPosts?.articles?.slice(0, 10);
        if (JSON.stringify(dataPost) !== JSON.stringify(newPosts)) {
          setDataPost(newPosts);
          setTotalPage(Math.ceil(personalPosts?.articleCount / 10));
        }
      } else if (toggle === "favorite") {
        const newPosts = favoritePost?.articles?.slice(0, 10);
        if (JSON.stringify(dataPost) !== JSON.stringify(newPosts)) {
          setDataPost(newPosts);
          setTotalPage(Math.ceil(favoritePost?.articleCount / 10));
        }
      }
    }
  }, [
    toggle,
    currentTag,
    me,
    personalPosts,
    posts,
    tagsPost,
    favoritePost,
    dataPost,
    setDataPost,
    setTotalPage,
  ]);

  useEffect(() => {
    if (favoritePost) {
      const favoriteId = favoritePost?.articles?.map(
        (item: Article) => item.id
      );
      setCurrentFavorite(favoriteId);
    }
  }, [favoritePost?.articles, favoritePost, setCurrentFavorite]);
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
        setDataPost(personalPosts.filter((item: Article) => item.id != id));
      } else if (toggle === "global") {
        setDataPost(dataPost?.filter((item: Article) => item.id != id));
      }
      return true;
    } catch (error) {
      console.log("Failed deleting article", error);
      return false;
    }
  };

  //handle add favorite
  const addFavorite = (articleId: string) => {
    try {
      mutateFavorite(articleId);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const handleFavorite = async (
    id: string,
    currentFavorite: string[],
    currentFavoriteRef: React.MutableRefObject<number>
  ) => {
    addFavorite(id);
    if (currentFavorite?.find((item) => item === id)) {
      setCurrentFavorite(currentFavorite.filter((item) => item !== id));
      currentFavoriteRef.current = currentFavoriteRef.current - 1;
    } else {
      setCurrentFavorite([...currentFavorite, id]);
      currentFavoriteRef.current = currentFavoriteRef.current + 1;
    }
  };

  return {
    posts,
    isLoadingPosts,
    favoritePost,
    createArticle,
    updateArticle,
    deleteArticle,
    addFavorite,
    handleFavorite,
  };
};
