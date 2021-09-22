import React, { useState } from "react";
import Clothing from "../components/Clothing";
import Filters from "../components/Filters";
import Pagination from "../components/Pagination";
import Shoes from "../components/Shoes";

const Home: React.FC = () => {

  const [search, setSearch] = useState('');
  

  return (
    <div className='isus'>
      <label><i className='fa fa-search'></i> &nbsp; </label>
      <input type="text" placeholder='Search' onChange={(e) => setSearch(e.target.value.toLowerCase())} style={{marginBottom: '45px'}} />
      <Pagination/>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "20% 80%",
          paddingRight: "20px",
        }}
        >
        <div className="filters">
          <Filters />
        </div>
        <div className="shopping">
          <section className="cards">
            <Clothing search={search}/>
            <Shoes search={search}/>
          </section>
        </div>
      </div>
      {/* <Cart cart={clothing, shoes}/> */}
    </div>
  );
};

export default Home;
