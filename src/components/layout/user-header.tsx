import { NavLink } from "react-router";

function UserHeader() {
  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <a className="navbar-brand" href="/">
          conduit
        </a>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            {/* Add "active" class when you're on that page" */}
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/post/create">
              {" "}
              <i className="ion-compose" />
              &nbsp;New Article{" "}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/settings">
              {" "}
              <i className="ion-gear-a" />
              &nbsp;Settings{" "}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/profile/eric-simons">
              <img src="" className="user-pic" />
              Eric Simons
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default UserHeader;
