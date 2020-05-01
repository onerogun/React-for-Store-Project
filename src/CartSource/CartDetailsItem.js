import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import { ServerContext } from "../ServerContext";

const CartDetailsItem = (props) => {

  const [server, setServer] = useContext(ServerContext);
  

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

  const removeFromCart = () => {
    const productToRemove = {
      name: props.name,
      price: props.price,
      id: props.id,
      amount: 0,
    };

    setNewItem((current) => [...current, productToRemove]);
  };

  return (
    <div className="row my-1 text-capitalize text-center">
      <div className="col-10 mx-auto col-lg-2">
        <img
          src={`${server}/getimageforjson/${props.id}`}
          style={{ width: "5rem", height: "5rem" }}
          alt="product"
          className="img-fluid"
        />
      </div>
      <div className="col-10 mx-auto col-lg-2">
        <span className="d-lg-none">product: </span>
        {props.name}
      </div>
      <div className="col-10 mx-auto col-lg-2">
        <span className="d-lg-none">price: </span>
        {props.price.toFixed(2)}
      </div>
      <div className="col-10 mx-auto col-lg-2">
        <span className="d-lg-none">amount: </span>
        {props.amount}
      </div>
      <div className="col-10 mx-auto col-lg-2">
        <span className="d-lg-none">Total:$ </span>
        {(props.price * props.amount).toFixed(2)}
      </div>
      <div className="col-10 mx-auto col-lg-2">
        <button
          className="btn btn-dark"
          onClick={() => {
            removeFromCart();
          }}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartDetailsItem;
