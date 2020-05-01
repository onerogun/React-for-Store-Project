import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ServerContext } from "../ServerContext";

export const ProductContext = React.createContext();

export const ProductProvider = (props) => {
    
  const [server, setServer] = useContext(ServerContext);
 

  const [products, setProducts] = useState([]);
  const [tokenFetched, setTokenFetched] = useState("");
  const url = `${server}/getjson`;

  const fetchProducts = () => {
    axios({
      method: "get",
      url: url,
    }).then((response) => {
      console.log(response);
      setProducts(response.data);
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const [customer, setCustomer] = useState([]);

  const urlInfo = `${server}/getcustomerinfo/${localStorage.getItem(
    "CUSTID"
  )}`;
  // "http://admin.2qn4ziu8xq.us-east-1.elasticbeanstalk.com/getcustomerinfo";

  const fetchCustomerInfo = () => {
    axios({
      method: "get",
      url: urlInfo,
      headers: { Authorization: "Bearer " + tokenFetched },
    }).then((response) => {
      console.log("Customer Info: " + JSON.stringify(response.data));
      setCustomer(response.data);
    });
  };

  useEffect(() => {
    fetchCustomerInfo();
  }, [tokenFetched]);

  return (
    <ProductContext.Provider
      value={[
        products,
        setProducts,
        tokenFetched,
        setTokenFetched,
        customer,
        setCustomer,
      ]}
    >
      {props.children}
    </ProductContext.Provider>
  );
};
