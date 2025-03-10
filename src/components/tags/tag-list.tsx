import { NavLink } from "react-router-dom";
import { Tag } from "../../types/tags";

type TagListProps = {
  tags: Tag[];
};

function TagList({ tags }: TagListProps) {
  return (
    <div className="tag-list">
      {tags.map((tag) => {
        return (
          <NavLink
            to={`/tags/${tag.slug}`}
            key={tag.slug}
            className="tag-pill tag-default"
          >
            {tag.name}
          </NavLink>
        );
      })}
    </div>
  );
}

export default TagList;
