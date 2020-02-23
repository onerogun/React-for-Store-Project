import React from "react";
import "./App.css";
import { CookiesProvider } from "react-cookie";
import { BrowserRouter, Route } from "react-router-dom";
import Token from "./Token";
import Products from "./Products";

function App() {
  return (
    <BrowserRouter>
      <CookiesProvider>
        <div className="App">
          <Route exact path="/" component={Products} />
          <Route path="/gettoken/:id" component={Token} />
          <code className="hide">src/App.js</code>
        </div>
      </CookiesProvider>
    </BrowserRouter>
  );
}

export default App;
