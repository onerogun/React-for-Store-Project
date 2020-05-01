import React, { useContext, useEffect } from "react";
import { CartContext } from "./CartContext";
import axios from "axios";
import { ProductContext } from "../ProductSource/ProductContext";
import { withRouter } from "react-router-dom";
import { ServerContext } from "../ServerContext";

function CartTotal(props) {
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

  const [
    products,
    setProducts,
    tokenFetched,
    setTokenFetched,
    customer,
    setCustomer,
  ] = useContext(ProductContext);

  const placeOrder = () => {
    axios
      .post(`${server}/placeorderreact/${customer.id}`, cart, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + tokenFetched,
        },
      })
      .then(() => {
        console.log("order sent to server");
        {
          window.alert("Order succesfully placed!");
        }
        setTimeout(() => {
          props.history.push(`/orders/${customer.id}`);
        }, 3000);
      })
      .catch((err) => {
        console.log("can't sent to server");
        console.log(err);
        {
          window.alert("An error occured!");
        }
      });

    console.log("Order Placed!");
    console.log(cart);
  };

  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">
            <h5>
              <span className="text-title">subtotal :</span>
              <strong>$ {cartTotal.toFixed(2)}</strong>
            </h5>
            <h5>
              <span className="text-title">tax :</span>
              <strong>$ {(cartTotal / 10).toFixed(2)}</strong>
            </h5>
            <h5>
              <span className="text-title">total :</span>
              <strong>$ {(cartTotal * 1.1).toFixed(2)}</strong>
            </h5>
            <button
              type="button"
              className="btn btn-primary text-uppercase"
              disabled={itemNumberTotal === 0 ? true : false}
              onClick={() => placeOrder()}
            >
              place order
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default withRouter(CartTotal);
