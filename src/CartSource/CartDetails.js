import React, { useContext, useEffect } from "react";
import { CartContext } from "./CartContext";
import { Link } from "react-router-dom";
import CartColumns from "./CartColumns";
import CartDetailsList from "./CartDetailsList";
import CartTotal from "./CartTotal";

const CartDetails = () => {
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

  return (
    console.log(cart),
    (
      <React.Fragment>
        <div className="mt-2 col-20 ml-1 mb-5 col-lg-2">
          <Link to="/products" className="ml-auto">
            <button>Products</button>
          </Link>
        </div>
        <section>
          {itemNumberTotal > 0 ? <CartColumns /> : <EmptyCart />}
          <CartDetailsList />
        </section>
        <CartTotal />
      </React.Fragment>
    )
  );
};

function EmptyCart() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-10 mx-auto text-center text-title">
          <h2>Your cart is empty</h2>
        </div>
      </div>
    </div>
  );
}

export default CartDetails;
