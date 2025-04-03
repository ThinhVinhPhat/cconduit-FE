import { useArticleContext } from "../hooks/useArticleContext";

function Pagination() {
  const { setPage, totalPage } = useArticleContext();
  return (
    <div>
      <ul className="pagination">
        <li className="page-item">
          <button className="page-link" onClick={() => setPage(1)}>
            First
          </button>
        </li>
        {Array.from({ length: totalPage }, (_, index) => (
          <li className="page-item" key={index}>
            <button className="page-link" onClick={() => setPage(index + 1)}>
              {index + 1}
            </button>
          </li>
        ))}
        <li className="page-item">
          <button className="page-link" onClick={() => setPage(totalPage)}>
            Last
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Pagination;
