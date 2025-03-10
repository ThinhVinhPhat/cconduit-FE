import { usePost } from "../hooks/usePost";

function Pagination() {
  const { page, totalPage, handleSetPage } = usePost();
  return (
    <ul className="pagination">
      {Array.from({ length: totalPage }, (_, index) => (
        <li className="page-item" key={index}>
          <button
            className="page-link"
            onClick={() => handleSetPage(index + 1)}
          >
            {page + 1}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Pagination;
