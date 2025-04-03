import { Link, NavLink } from "react-router";
import { useGetMe } from "../../hooks/query/user/useGetMe";
function UserHeader() {
  const { data: me } = useGetMe();

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
