import React from "react";
import "./App.css";
import { CookiesProvider } from "react-cookie";
import { BrowserRouter, Route } from "react-router-dom";
import Token from "./Token";
import Products from "./Products";
import Orders from "./Orders";
import CustomerToken from "./CustomerToken";

function App() {
  return (
    <BrowserRouter>
      <CookiesProvider>
        <div className="App">
          <Route exact path="/" component={Products} />
          <Route path="/orders/:id" component={Orders} />
          <Route path="/getcustomertoken/:id" component={CustomerToken} />
          <Route path="/gettoken/:id" component={Token} />
          <code className="hide">src/App.js</code>
        </div>
      </CookiesProvider>
    </BrowserRouter>
  );
}

export default App;
