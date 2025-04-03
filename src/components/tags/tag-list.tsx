import { Tag } from "../../types/tags";

type TagListProps = {
  tags: Tag[];
  onaddTags: (tag: Tag) => void;
  onHandleToggle: (toggle: string) => void;
};

function TagList({ tags, onaddTags, onHandleToggle }: TagListProps) {
  const handleClickTags = (tag: Tag) => {
    onaddTags(tag);
    onHandleToggle("tags");
  };

  return (
    <div className="tag-list">
      {tags.map((tag) => {
        return (
          <button
            onClick={() => handleClickTags(tag)}
            key={tag.id}
            className="tag-pill tag-default"
          >
            {tag.title}
          </button>
        );
      })}
    </div>
  );
}

export default TagList;
