import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { PRODUCT_TYPE, Sex } from "../helpers/Enums";
import Models from "../helpers/Models";
import { ProductContextTypes, ProductContextDefault } from "../context/ProductContext";
import { PROXY } from "../App";

type Clothing = Models["Clothing"];
type Shoes = Models["Shoes"];

const AddProduct = () => {
  const history = useHistory();

  type ProductToAdd = {
    name: string;
    details: string;
    price: number;
    img: string;
    brandName: string;
    sex: Sex;
    clothingTypeId: number;
    shoesTypeId: number;
  };

  const [productToAdd, setProductToAdd] = useState<Partial<ProductToAdd>>({});
  const [productType, setProductType] = useState<PRODUCT_TYPE>(PRODUCT_TYPE.CLOTHING);
  const { productContext, setProductContext } = useContext<ProductContextTypes>(ProductContextDefault);

  function isClothing(product: Clothing | Shoes): product is Clothing {
    return PRODUCT_TYPE.CLOTHING in product;
  }

  const addProduct = async (product: Clothing | Shoes) => {
    try {
      var res;

      if (isClothing(product) && productType === PRODUCT_TYPE.CLOTHING) {
        res = await fetch(PROXY + "/clothing/save", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(product),
        });
      } else {
        res = await fetch(PROXY + "/shoes/save", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(product),
        });
      }

      if (res && res.ok) {
        const data = await res.json();
        setProductContext([...productContext, data]);
        return data;
      }
    } catch (e) {
      console.log(e);
    }
    window.location.reload();
  };

  const onSubmit = (e: any) => {
    e.preventDefault();

    if (
      !productToAdd.name ||
      !productToAdd.details ||
      !productToAdd.price ||
      !productToAdd.img ||
      !productToAdd.brandName ||
      (!productToAdd.clothingTypeId && !productToAdd.shoesTypeId)
    ) {
      alert("Please add all info");
      return;
    }

    if (productType === PRODUCT_TYPE.CLOTHING)
      addProduct({
        id: 0,
        name: productToAdd.name ?? "",
        details: productToAdd.details ?? "",
        price: productToAdd.price ?? 0,
        brandName: productToAdd.brandName ?? "",
        img: productToAdd.img ?? "",
        sex: productToAdd.sex ?? Sex.MALE,
        clothingType: { id: productToAdd.clothingTypeId!, type: "" },
      });
    else if (productType === PRODUCT_TYPE.SHOES)
      addProduct({
        id: 0,
        name: productToAdd.name ?? "",
        details: productToAdd.details ?? "",
        price: productToAdd.price ?? 0,
        brandName: productToAdd.brandName ?? "",
        img: productToAdd.img ?? "",
        sex: productToAdd.sex ?? Sex.MALE,
        shoesType: { id: productToAdd.shoesTypeId!, type: "" },
      });

    history.push("/");
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.preventDefault();
    let value: string | number = e.target.value;

    //* HTMLInputElement
    if ("checked" in e.target) {
      if (e.target.type === "number") value = parseInt(e.target.value);
      else if (e.target.type === "checkbox") {
        if (e.target.checked) value = Sex.FEMALE;
        else value = Sex.MALE;
      }
    }
    //* HTMLSelectElement
    else {
      if (e.target.name === "productType") {
        value === PRODUCT_TYPE.CLOTHING
          ? setProductType(PRODUCT_TYPE.CLOTHING)
          : setProductType(PRODUCT_TYPE.SHOES);
      }

      value = parseInt(e.target.value);
    }

    productToAdd !== undefined
      ? setProductToAdd({ ...productToAdd, [e.target.name]: value })
      : setProductToAdd({ [e.target.name]: value });
  };

  return (
    <div>
      <form className="add-product-container" onSubmit={onSubmit}>
        <div className="type-to-add">
          <label>Type to add</label>
          <br />
          <select value={productType} onChange={(e) => handleOnChange(e)} name="productType">
            <option value={PRODUCT_TYPE.CLOTHING}>Clothing</option>
            <option value={PRODUCT_TYPE.SHOES}>Shoes</option>
          </select>
        </div>
        <div>
          <label>Name</label>
          <br />
          <input
            type="text"
            placeholder="Name"
            value={productToAdd.name || ""}
            onChange={(e) => handleOnChange(e)}
            name="name"
          />
        </div>
        <br />
        <div>
          <label>Details</label>
          <br />
          <input
            type="text"
            placeholder="Details"
            value={productToAdd.details || ""}
            onChange={(e) => handleOnChange(e)}
            name="details"
          />
        </div>
        <br />
        <div>
          <label>Price</label>
          <br />
          <input
            type="number"
            placeholder="Price"
            value={productToAdd.price || ""}
            onChange={(e) => handleOnChange(e)}
            name="price"
          />
        </div>
        <br />
        <div>
          <label>Image url</label>
          <br />
          <input
            type="text"
            placeholder="Image url"
            value={productToAdd.img || ""}
            onChange={(e) => handleOnChange(e)}
            name="img"
          />
        </div>
        <br />
        <div>
          <label>Brand name</label>
          <br />
          <input
            type="text"
            placeholder="Brand name"
            value={productToAdd.brandName || ""}
            onChange={(e) => handleOnChange(e)}
            name="brandName"
          />
        </div>
        <br />
        {productType && (
          <>
            {productType === PRODUCT_TYPE.CLOTHING ? (
              <div>
                <label>Clothing type</label>
                <br />
                <select
                  value={productToAdd.clothingTypeId}
                  onChange={(e) => handleOnChange(e)}
                  name="clothingTypeId"
                >
                  <option value="0"></option>
                  <option value="1">Hoodie</option>
                  <option value="2">Shirt</option>
                  <option value="3">Jeans</option>
                </select>
              </div>
            ) : (
              <div>
                <label>Shoes type</label>
                <br />
                <select
                  value={productToAdd.shoesTypeId}
                  onChange={(e) => handleOnChange(e)}
                  name="shoesTypeId"
                >
                  <option value="0"></option>
                  <option value="1">Sneakers</option>
                  <option value="2">Flip-Flops</option>
                  <option value="3">Sport</option>
                </select>
              </div>
            )}
          </>
        )}
        <br />
        <div>
          <label> Sex &nbsp;</label>
          <input
            className="sex"
            type="checkbox"
            value={productToAdd.sex}
            onChange={(e) => handleOnChange(e)}
            name="sex"
          />
          <br />
          <span>(Checked - 'FEMALE', Unchecked - 'MALE')</span>
        </div>
        <br />
        <br />
        <input type="submit" value="Save Product" className="save-product-button" />
      </form>
    </div>
  );
};

export default AddProduct;
