import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { ProductContextDefault, ProductContextTypes } from "../context/ProductContext";
import Category from "./Category";

const Filters = () => {
  const { productContext } = useContext<ProductContextTypes>(ProductContextDefault);
  const categoryRef = useRef<HTMLDivElement | null>(null);
  const [dropDownIcon, setDropDownIcon] = useState(true);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 1200);

  useEffect(() => {
    window.addEventListener("resize", () => {
        let isMobileOnResize = window.innerWidth < 1200;
        if (isMobile !== isMobileOnResize)
          setIsMobile(isMobileOnResize);
    }, false);
  }, [isMobile]);

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
    <section className="filters-container">
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
      <div ref={categoryRef} className={isMobile ? "hide-dropdown" : "show-dropdown"}>
        {!!distinctBrands().length &&
          distinctBrands().map((brandName: string, index: number) => (
            <Category key={index} brandName={brandName} />
          ))}
        <br />
      </div>
    </section>
  );
};

export default Filters;
