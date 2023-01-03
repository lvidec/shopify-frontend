import { useContext } from "react";
import { Link } from "react-router-dom";
import { POSTS_PER_PAGE } from "../App";
import { ProductContextTypes, ProductContextDefault } from "../context/ProductContext";

const Pagination = () => {
  const { productContext } = useContext<ProductContextTypes>(ProductContextDefault);

  const pageNumbers = [];
  const totalPosts = productContext.length;

  for (let i = 1; i <= Math.ceil(totalPosts / POSTS_PER_PAGE); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="pagination">
      {pageNumbers.map((number, index) => (
        <li key={index}>
          <Link to={`/page-${number}`}>
            {number}
          </Link>
        </li>
      ))}
    </nav>
  );
};

export default Pagination;
