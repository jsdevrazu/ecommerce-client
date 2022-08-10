import { useSelector } from "react-redux";
import CartDrawer from "../Components/CartDrawer";
import Footer from "../Components/Footer";
import Navigation from "../Components/Navbar";
import { RootState } from "../store";
import { IPropsChildren } from "../Types";

const Layout: React.FC<IPropsChildren> = ({ children }) => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <>
      <Navigation />
      {user && !user.isActive && (
        <div className="text-center mt-5 flex justify-center items-center">
          <h1 className="md:max-w-[450px] bg-red-500 p-4 text-white rounded-lg">
            Your are not verify user!. Please check your email and verify email
          </h1>
        </div>
      )}
      {children}
      <Footer />
      <CartDrawer />
    </>
  );
};

export default Layout;
