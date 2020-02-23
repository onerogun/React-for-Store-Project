import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { withRouter } from "react-router-dom";

function Token(props) {
  setTimeout(() => {
    props.history.push("/");
  }, 3000);

  console.log("id: " + props.match.params.id);
  const [myToken, setMyToken] = useState("");
  const [cookies, setCookie] = useCookies(["myjwt"]);

  useEffect(() => {
    fetchToken();
  }, []);

  const fetchToken = () => {
    axios
      .get(`http://admin.2qn4ziu8xq.us-east-1.elasticbeanstalk.com/gettoken/${props.match.params.id}`)
      .then(response => {
        setMyToken(response.data);
      });
  };

  setCookie("MYJWT", myToken, { maxAge: 60 * 60 * 24 * 7 });

  return (
    <div className="container">
      <h3 className="center">Loading...</h3>
    </div>
  );
}

export default withRouter(Token);
