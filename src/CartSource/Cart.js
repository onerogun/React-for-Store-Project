import React, { useContext, useEffect } from "react";
import { CartContext } from "./CartContext";
import { Link } from "react-router-dom";
import { ProductContext } from "../ProductSource/ProductContext";

const Cart = () => {
  const [
    cart,
    setCart,
    cartTotal,
    setCartTotal,
    newItem,
    setNewItem,
    itemNumberTotal,
    setItemNumberTotal,
  ] = useContext(CartContext);

  const [
    products,
    setProducts,
    tokenFetched,
    setTokenFetched,
    customer,
    setCustomer,
  ] = useContext(ProductContext);
  return (
    <React.Fragment>
      <div className="d-flex justify-content-end mt-2">
        <div className="mr-auto ml-5">
          <span>Logged in user: {customer.userName}</span>
        </div>
        <div>
          <span>Number of Items in cart : {itemNumberTotal}</span>
        </div>
        <div className="mr-5 ml-5">
          <Link to="/cart">
            <button>
              Cart
              <i className="fas fa-cart-plus" />
            </button>
          </Link>
        </div>
      </div>
      <hr />
      <div className="float-right">
        <span className="mr-5">Total : {cartTotal.toFixed(2)}</span>
      </div>
    </React.Fragment>
  );
};

export default Cart;
