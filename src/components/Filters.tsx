import { useCallback, useContext, useRef, useState } from "react";
import { ProductContextTypes, ProductCartContext } from "../context/ProductCartContext";
import Category from "./Category";

const Filters = () => {
  const { productContext } = useContext<ProductContextTypes>(ProductCartContext);
  const categoryRef = useRef<HTMLDivElement | null>(null);
  const [dropDownIcon, setDropDownIcon] = useState(false);

  const distinctBrands = useCallback((): string[] => {
    let brandNames: string[] = [];
    productContext.forEach((shoes) => brandNames.push(shoes.brandName));
    return [...new Set(brandNames)];
  }, [productContext]);

  const dropdownAnimation = () => {
    setDropDownIcon(!dropDownIcon);
    if (categoryRef.current?.classList.contains("hide-dropdown")) {
      categoryRef.current.classList.remove("hide-dropdown");
      categoryRef.current.classList.add("show-dropdown");
    } else if (categoryRef.current?.classList.contains("show-dropdown")) {
      categoryRef.current.classList.remove("show-dropdown");
      categoryRef.current.classList.add("hide-dropdown");
    }
  };

  return (
    <div className="filters-container">
      <div className="filter-title">
        <a href="/#" onClick={dropdownAnimation}>
          Category &nbsp;
          {dropDownIcon ? (
            <i className="fa fa-chevron-up"></i>
          ) : (
            <i className="fa fa-chevron-down"></i>
          )}
        </a>
      </div>
      <hr />
      <div ref={categoryRef} className="hide-dropdown">
        {distinctBrands().length &&
          distinctBrands().map((brandName: string, index: number) => (
            <Category key={index} brandName={brandName} />
          ))}
        <br />
      </div>
    </div>
  );
};

export default Filters;
