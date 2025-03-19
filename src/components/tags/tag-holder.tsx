type TagProps = {
  name: string;
};
function TagHolder({ name }: TagProps) {
  return (
    <div className="ml-3">
      <span>#{name}</span>
    </div>
  );
}

export default TagHolder;
