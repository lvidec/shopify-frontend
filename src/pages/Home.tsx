import { useState } from "react";
import Filters from "../components/Filters";
import Pagination from "../components/Pagination";
import Products from "../components/Products";

export default function Home() {
  const [search, setSearch] = useState("");

  return (
    <div className="home-container">
      <label>
        <i className="fa fa-search"></i> &nbsp;
      </label>
      <input
        type="text"
        placeholder="Search"
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
        className="search-bar"
      />
      <Pagination />
      <div className="products-container">
        <Filters />
        <Products search={search} />
      </div>
    </div>
  );
}
