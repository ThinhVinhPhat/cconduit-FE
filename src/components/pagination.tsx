import { usePost } from "../hooks/usePost";

function Pagination() {
  const { totalPage, handleSetPage } = usePost();
  return (
    <div>
      <ul className="pagination">
        <li className="page-item">
          <button className="page-link" onClick={() => handleSetPage(1)}>
            First
          </button>
        </li>
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
        <li className="page-item">
          <button className="page-link" onClick={() => handleSetPage(totalPage)}>
            Last
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Pagination;
