import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Token from "./Tokens/Token";
import Products from "./Products";
import Orders from "./Orders";
import CustomerToken from "./Tokens/CustomerToken";
import CustomerOrderToken from "./Tokens/CustomerOrderToken";
import CartProvider from "./CartSource/CartContext";
import CartDetails from "./CartSource/CartDetails";
import ProductList from "./ProductSource/ProductList";
import { ProductProvider } from "./ProductSource/ProductContext";
import Navbar from "./Navbar";
import { ServerProvider } from "./ServerContext";
import CustomerInfo from "./CustomerInfo";

function App() {
  return (
    <BrowserRouter>
      <ServerProvider>
        <ProductProvider>
          <CartProvider>
            <React.Fragment>
              <Navbar />
              <Switch>
                <Route exact path="/" component={Products} />
                <Route path="/products" component={ProductList} />
                <Route path="/cart" component={CartDetails} />
                <Route path="/customerinfo" component={CustomerInfo} />
                <Route path="/orders/:id" component={Orders} />
                <Route path="/getcustomertoken/:id" component={CustomerToken} />
                <Route
                  path="/getcustomerordertoken/:id"
                  component={CustomerOrderToken}
                />
                <Route path="/gettoken/:id" component={Token} />
              </Switch>
            </React.Fragment>
          </CartProvider>
        </ProductProvider>
      </ServerProvider>
    </BrowserRouter>
  );
}

export default App;
