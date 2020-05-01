import React, { useContext, useEffect } from "react";
import Product from "./Product";
import { ProductContext } from "./ProductContext";
import Cart from "../CartSource/Cart";


const ProductList = () => {
 

  const [
    products,
    setProducts,
    tokenFetched,
    setTokenFetched,
    customer,
    setCustomer,
  ] = useContext(ProductContext);
  const token = localStorage.getItem("CUSTJWT");
  //const [tokenFetched, setTokenFetched] = useContext(CustomerContext);

  useEffect(() => {
    setTokenFetched(token);
  }, []);

  return (
    <React.Fragment>
      <Cart />

      <div className="py-5">
        <div className="container">
          <div className="row">
            {products.map((item) => (
              <Product
                productName={item.productName}
                price={item.price}
                productId={item.productId}
                amount={item.amount}
                key={item.productId}
              />
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductList;
