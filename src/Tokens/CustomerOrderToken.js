import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { withRouter } from "react-router-dom";
import { ServerContext } from "../ServerContext";

function CustomerOrderToken(props) {
  
  const [server, setServer] = useContext(ServerContext);
  

  setTimeout(() => {
    props.history.push("/products");
  }, 3000);

  localStorage.setItem("CUSTID", props.match.params.id);

  console.log("id: " + props.match.params.id);
  const [myCustToken, setMyCustToken] = useState("");
  // const [custCookies, setCustCookie] = useCookies([""]);

  useEffect(() => {
    fetchToken();
  }, []);

  const fetchToken = () => {
    axios
      .get(`${server}/gettoken/${props.match.params.id}`)
      .then((response) => {
        setMyCustToken(response.data);
        console.log(response.data);
      });
  };

  // setCustCookie("CUSTJWT", myCustToken, { maxAge: 60 * 60 * 24 * 7 });
  localStorage.setItem("CUSTJWT", myCustToken);

  return (
    <div className="container">
      <h3 className="center">Loading...</h3>
      <div className="spinner-border text-secondary"></div>
    </div>
  );
}

export default withRouter(CustomerOrderToken);
