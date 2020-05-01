import React, { useState, useEffect } from "react";

export const CartContext = React.createContext();

const CartProvider = (props) => {
  const [cartTotal, setCartTotal] = useState(0);
  const [cart, setCart] = useState([]);
  const [newItem, setNewItem] = useState([]);
  const [itemNumberTotal, setItemNumberTotal] = useState(0);

  const getItemIndex = (id) => {
    const index = cart.findIndex((item) => id === item.id);
    console.log(index);
    return index;
  };

  const setItemAmount = (item) => {
    cart[getItemIndex(item.id)] = item;
  };

  const addItem = (item) => {
    if (item != null) {
      const index = getItemIndex(item.id);
      if (index !== -1) {
        if (item.amount === 0) {
          setCart(cart.filter((cartItem) => item.id !== cartItem.id));
        }
        setCartTotal(
          cartTotal + (item.amount - cart[index].amount) * item.price
        );
        setItemNumberTotal(
          itemNumberTotal + (item.amount - cart[index].amount)
        );
        setItemAmount(item);

        console.log("a");
      } else {
        setCart((current) => [...current, item]);
        setItemNumberTotal(itemNumberTotal + item.amount);
        setCartTotal(cartTotal + item.price * item.amount);
      }
    }
  };

  useEffect(() => {
    addItem(newItem[newItem.length - 1]);
  }, [newItem]);

  return (
    <CartContext.Provider
      value={[
        cart,
        setCart,
        cartTotal,
        setCartTotal,
        newItem,
        setNewItem,
        itemNumberTotal,
        setItemNumberTotal,
      ]}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
