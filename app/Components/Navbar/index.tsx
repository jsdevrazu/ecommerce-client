import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Badge,
  Button,
  Dropdown,
  Indicator,
  Menu,
  Navbar,
} from "react-daisyui";
import toast from "react-hot-toast";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../../Slice/authSlice";
import { selectTotalCartItems } from "../../Slice/basketSlice";
import { RootState } from "../../store";
import { logout } from "../../Utils/api";

const Navigation = () => {
  const { token, user } = useSelector((state: RootState) => state.auth);
  const totalCartItems = useSelector(selectTotalCartItems);
  const router = useRouter();
  const dispatch = useDispatch();

  const menuData = [
    {
      name: "Login",
      url: "/login",
      className: router.asPath == "/login" ? "active" : null,
    },
    {
      name: "Shop",
      url: "/shop",
      className: router.asPath == "/shop" ? "active" : null,
    },
  ];
  const afterLogin = [
    {
      name: "Shop",
      url: "/shop",
      className: router.asPath == "/shop" ? "active" : null,
    },
  ];

  const handleLogOut = async () => {
    const res = await logout(token);
    if (res.message) {
      toast.success(res.message);
      dispatch(setAuth(res));
      localStorage.removeItem("user");
      Cookies.remove("token", {expires: Date.now()});
      router.push("/login");
    } else toast.error(res.response.data.message);
  } 

  return (
    <header className="shadow-md sticky top-0 z-20 bg-white">
      <div className="container">
        <div className="flex w-full items-center justify-center gap-2">
          <Navbar>
            <div className="flex-1">
              <Link href="/">
                <a className="text-red-400 text-[20px] font-semibold">
                  E-commerce
                </a>
              </Link>
            </div>
            <div className="flex-none">
              <Button
                tabIndex={0}
                onClick={() => router.push("/cart")}
                color="ghost"
                shape="circle"
              >
                <Indicator item={<Badge size="sm">{totalCartItems}</Badge>}>
                  <AiOutlineShoppingCart size={30} />
                </Indicator>
              </Button>
              <Menu className="!flex-row md:gap-6 md:ml-4">
                {token
                  ? afterLogin.map((item, index) => (
                      <Menu.Item key={index}>
                        <Link href={item.url}>
                          <a className={`${item.className}`}>{item.name}</a>
                        </Link>
                      </Menu.Item>
                    ))
                  : menuData.map((item, index) => (
                      <Menu.Item key={index}>
                        <Link href={item.url}>
                          <a className={`${item.className}`}>{item.name}</a>
                        </Link>
                      </Menu.Item>
                    ))}
              </Menu>
              {token && (
                <>
                  <Dropdown hover={true} vertical="end">
                    <Button color="ghost" className="avatar" shape="circle">
                      <div className="w-10 rounded-full">
                        <img src={user && user.avatar} />
                      </div>
                    </Button>
                    <Dropdown.Menu className="w-52 menu-compact">
                      <li>
                        <a className="justify-between" onClick={() => router.push("/profile")}>
                          Profile
                          <span className="badge">New</span>
                        </a>
                      </li>
                      <Dropdown.Item onClick={handleLogOut}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              )}
            </div>
          </Navbar>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
