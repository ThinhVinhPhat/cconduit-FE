import { NavLink } from "react-router";
import { usePost } from "../../hooks/usePost";

function UserHeader() {
  const { me } = usePost();

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <a className="navbar-brand" href="/">
          conduit
        </a>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <NavLink className="nav-link" to="/">
              <i className="ion-home" style={{ marginRight: "5px" }} />
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
            <NavLink className="nav-link" to={`/profile/${me?.name}`}>
              <img src={me?.avatar} className="user-pic" />
              {me?.name}
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default UserHeader;
