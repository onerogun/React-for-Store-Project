import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { withRouter } from "react-router-dom";

function CustomerToken(props) {
  setTimeout(() => {
    props.history.push(orderUrl);
  }, 3000);

  const orderUrl = `/orders/${props.match.params.id}`;

  console.log("id: " + props.match.params.id);
  const [myCustToken, setMyCustToken] = useState("");
  const [custCookies, setCustCookie] = useCookies([""]);

  useEffect(() => {
    fetchToken();
  }, []);

  const fetchToken = () => {
    axios
      .get(`http://admin.2qn4ziu8xq.us-east-1.elasticbeanstalk.com/gettoken/${props.match.params.id}`)
      .then(response => {
        setMyCustToken(response.data);
        console.log(response.data);
      });
  };

  setCustCookie("CUSTJWT", myCustToken, { maxAge: 60 * 60 * 24 * 7 });
  localStorage.setItem("CUSTJWT", myCustToken);

  return (
    <div className="container">
      <h3 className="center">Loading...</h3>
      <div class="spinner-border text-secondary"></div>
    </div>
  );
}

export default withRouter(CustomerToken);
