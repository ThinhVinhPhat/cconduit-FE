import { useArticleContext } from "./useArticleContext";

import { Tag } from "../types/tags";

export const useTagAction = () => {
  const { currentTag, setCurrentTag, setToggle } = useArticleContext();

  //handle add tags
  const addTags = (tag: Tag) => {
    const existTag = currentTag.find((item) => tag.title == item.title);
    if (existTag) {
      return;
    }
    if (tag) {
      setCurrentTag((prev: Tag[]) => [...prev, tag]);
    }
  };
  //handle delete tags
  const deleteTags = (tag: Tag) => {
    if (currentTag.length == 1) {
      setToggle(() => "personal");
    }
    setCurrentTag(currentTag.filter((item) => item.title != tag.title));
  };

  return {
    addTags,
    deleteTags,
  };
};
