import { usePost } from "../hooks/usePost";

function Pagination() {
  const { totalPage, handleSetPage } = usePost();
  return (
    <ul className="pagination">
      {Array.from({ length: totalPage }, (_, index) => (
        <li className="page-item" key={index}>
          <button
            className="page-link"
            onClick={() => handleSetPage(index + 1)}
          >
            {index + 1}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Pagination;
