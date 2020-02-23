import React from "react";

const Redirect = props => {
  setTimeout(() => {
    props.history.push("/");
  }, 4000);

  return (
    <div className="container">
      <h3 className="center">Loading...</h3>
    </div>
  );
};
export default Redirect;
