import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">
        <div className="bookss bouncer">
        <i class="far fa-comment-alt "></i> Personal Library
        </div>
      </Link>
    </nav>
  );
};

export default NavBar;
