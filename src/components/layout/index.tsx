import { Outlet } from "react-router";
import Header from "./header";
import Footer from "./footer";
import UserHeader from "./user-header";
import { useAuthContext } from "../../hooks/useAuthContext";
function Layout() {
  const { userLogin } = useAuthContext();
  return (
    <>
      {userLogin == false ? <Header /> : <UserHeader />}
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
