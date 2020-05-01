import React, { useContext } from "react";
import { ServerContext } from "./ServerContext";

function Navbar() {
  const [server, setServer] = useContext(ServerContext);
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand" href="/products">
        Products
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <a className="nav-link" href={`${server}`}>
              Home <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href={`${server}/admin`}>
              Admin
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href={`${server}/manager`}>
              Store Manager
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href={`${server}/products`}>
              Products
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href={`${server}/orders`}>
              Customer
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href={`${server}/logout`}>
              Logout
            </a>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdownMenuLink"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              More Options
            </a>
            <div
              className="dropdown-menu"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <a className="dropdown-item" href={`${server}/orderlist`}>
                Your Orders at Thymeleaf Rendered Page
              </a>
              <a className="dropdown-item" href={`${server}/order`}>
                Place New Order at Thymeleaf Rendered Page
              </a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
