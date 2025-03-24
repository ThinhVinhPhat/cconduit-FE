import { Outlet } from "react-router";
import Header from "./header";
import Footer from "./footer";
import UserHeader from "./user-header";
import { usePost } from "../../hooks/usePost";
function Layout() {
  const { me } = usePost();

  return (
    <>
      {!me ? <Header /> : <UserHeader />}
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
