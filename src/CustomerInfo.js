import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "./ProductSource/ProductContext";
import axios from "axios";
import { ServerContext } from "./ServerContext";

const CustomerInfo = () => {
  const [
    products,
    setProducts,
    tokenFetched,
    setTokenFetched,
    customer,
    setCustomer,
  ] = useContext(ProductContext);

  const [server, setServer] = useContext(ServerContext);

  const token = localStorage.getItem("CUSTJWT");

  useEffect(() => {
    setTokenFetched(token);
  }, []);

  const [updatedInfo, setUpdatedInfo] = useState([]);
  useEffect(() => {
    setUpdatedInfo(customer);
  }, [customer]);

  console.log(updatedInfo);

  const submitCustomerInfo = () => {
    axios
      .post(`${server}/getcustomerinfo/${customer.id}`, updatedInfo, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + tokenFetched,
        },
      })
      .then(() => {
        console.log("customer info sent to server");
        {
          window.alert("Info succesfully updated!");
        }
      })
      .catch((err) => {
        console.log("can't sent to server");
        console.log(err);
        {
          window.alert("An error occured!");
        }
      });

    console.log("Info sent!");
    console.log(updatedInfo);
  };

  const handleChange = (event) => {
    setUpdatedInfo({
      ...updatedInfo,
      [event.target.name]: event.target.value,
    });
  };

  console.log(updatedInfo);

  const handleSubmit = (event) => {
    event.preventDefault();
    submitCustomerInfo();
    setCustomer(updatedInfo);
  };

  return (
    <React.Fragment>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              onChange={handleChange}
              defaultValue={customer.email}
            />
          </div>

          <div className="form-group">
            <label for="address">Address</label>
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              onChange={handleChange}
              defaultValue={customer.address}
            />
          </div>

          <div className="form-group">
            <label for="phoneNumber">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              defaultValue={customer.phoneNumber}
              className="form-control"
              title="Enter 111-111-1111 format"
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>

        <div className="row my-1 text-center">
          <div className="col-10 mx-auto ">
            <span>Phone Number: {customer.phoneNumber}</span>
          </div>
          <div className="col-10 mx-auto ">
            <span>Address: {customer.address}</span>
          </div>
          <div className="col-10 mx-auto ">
            <span>Email: {customer.email}</span>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CustomerInfo;
