import { Link } from "react-router-dom";

const Category = ({ brandName }: { brandName: string }) => {
  return (
    <h4 className="category-links">
      <Link to={`/category/${brandName}`}>{brandName}</Link>
    </h4>
  );
};

export default Category;
