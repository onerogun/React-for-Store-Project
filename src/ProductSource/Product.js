import React, { useContext, useState } from "react";
import { CartContext } from "../CartSource/CartContext";
import styled from "styled-components";
import { ServerContext } from "../ServerContext";

const Product = (props) => {
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
  const [amount, setAmount] = useState(props.amount);

  const addToCart = () => {
    const productToAddCart = {
      name: props.productName,
      price: props.price,
      id: props.productId,
      amount: amount,
    };

    setNewItem((current) => [...current, productToAddCart]);
  };

  return (
    <ProductWrapper className="col-9 mx-auto col-md-6 col-lg-3 my-3">
      <div className="card">
        <div className="img-container">
          <div className="card-header">
            <h2>{props.productName}</h2>
          </div>
          <img
            src={`${server}/getimageforjson/${props.productId}`}
            alt="product"
            className="card-img-top"
          />
        </div>
        <div className="card-footer d-flex justify-content-between">
          <h2>Price: ${props.price}</h2>
          <h2>
            Amount:{amount}
            <button onClick={() => setAmount(amount + 1)}>+</button>
            <button
              disabled={amount === 0 ? true : false}
              onClick={() => setAmount(amount - 1)}
            >
              -
            </button>
          </h2>
          <button
            className="btn btn-dark"
            disabled={amount === 0 ? true : false}
            onClick={() => {
              addToCart();
            }}
          >
            <span> Add to cart</span>
          </button>
        </div>
      </div>
    </ProductWrapper>
  );
};

const ProductWrapper = styled.div`
  * {
    font-size: 14px;
  }
`;

export default Product;
