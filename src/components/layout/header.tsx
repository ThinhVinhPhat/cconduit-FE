import { Link, NavLink, useLocation } from "react-router";

function Header() {
  const location = useLocation();
  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          conduit
        </Link>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <NavLink className="nav-link" to="/">
              <i className="ion-home" style={{ marginRight: "5px" }} />
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${
                location.pathname == "/login" ? "active" : ""
              }`}
              href="/login"
            >
              Sign in
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${
                location.pathname == "/register" ? "active" : ""
              }`}
              href="/register"
            >
              Sign up
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
