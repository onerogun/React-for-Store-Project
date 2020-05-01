import React, { useContext } from "react";
import CartDetailsItem from "./CartDetailsItem";
import { CartContext } from "./CartContext";

const CartDetailsList = () => {
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
    <div className="container-fluid">
      {cart.map((item) => {
        return (
          <CartDetailsItem
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            amount={item.amount}
          />
        );
      })}
    </div>
  );
};

export default CartDetailsList;
