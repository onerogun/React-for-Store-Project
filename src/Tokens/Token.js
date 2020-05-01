import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
//import { useCookies } from "react-cookie";
import { withRouter } from "react-router-dom";
import { ServerContext } from "../ServerContext";

function Token(props) {
  const [server, setServer] = useContext(ServerContext);


  setTimeout(() => {
    props.history.push("/");
  }, 3000);

  console.log("id: " + props.match.params.id);
  const [myToken, setMyToken] = useState("");
  //const [cookies, setCookie] = useCookies([""]);

  useEffect(() => {
    fetchToken();
  }, []);

  const fetchToken = () => {
    axios
      .get(`${server}/gettoken/${props.match.params.id}`)
      .then((response) => {
        setMyToken(response.data);
      });
  };

  //setCookie("MYJWT", myToken, { maxAge: 60 * 60 * 24 * 7 });
  localStorage.setItem("MYJWT", myToken);

  return (
    <div className="container">
      <h3 className="center">Loading...</h3>
      <div className="spinner-border text-secondary"></div>
    </div>
  );
}

export default withRouter(Token);
