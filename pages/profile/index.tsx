import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import { Avatar, Button, Input, Table } from "react-daisyui";
import Drawer from "react-modern-drawer";
import { useDispatch, useSelector } from "react-redux";
import AppForm from "../../app/Components/AppForm";
import FormInput from "../../app/Components/FormInput";
import ImageLoader from "../../app/Components/ImageLoader";
import ImageUploader from "../../app/Components/ImageUploader";
import { RootState } from "../../app/store";
import { IOrderItem, IValue } from "../../app/Types";
import { deleteImageObject } from "../../app/Utils";
import {
  getAllOrder,
  getSingleUser,
  updateUser,
  upPassword,
} from "../../app/Utils/api";
import { updatePassword, updateSchema } from "../../app/Validation";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import { setAuth } from "../../app/Slice/authSlice";
import TimeAgo from "timeago-react";
import * as timeago from "timeago.js";
import Loader from "../../app/Components/Loader";
import Meta from "../../app/Components/Meta";

const initialState = {
  name: "",
  email: "",
  avatar: "",
  formGoogle: false,
};

const Profile = () => {
  const [userInfo, setUserInfo] = useState(initialState);
  const [product, setProduct] = useState<IOrderItem[]>();
  const [drawer, setDrawer] = useState(false);
  const [drawerPassword, setDrawerPassword] = useState(false);
  const router = useRouter();
  const { token, user } = useSelector((state: RootState) => state.auth);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (value: IValue) => {
    if (user) {
      const formData = { email: value.email, name: value.name, avatar };
      setLoading(true);
      const res = await updateUser(user?._id, token, formData);
      setLoading(false);
      if (res.message) toast.success(res.message);
      else toast.error(res.response.data.message);
      setDrawer(!drawer);
      router.push("/");
    }
  };

  const handlePassword = async (value: any) => {
    if (user) {
      const formData = {
        oldPassword: value.oldPassword,
        newPassword: value.newPassword,
      };

      const res = await upPassword(token, formData);
      if (res.response.data) return toast.error(res.response.data.message);
      toast.success("Password updated successfully");
      setDrawer(!drawer);
      router.push("/login");
      localStorage.removeItem("user");
      const resetAuth = { token: "", user: null } as any;
      dispatch(setAuth(resetAuth));
    }
  };

  useEffect(() => {
    if (token) {
      (async () => {
        // get single user
        setLoading(true);
        const res = await getSingleUser(token);
        const orderData = await getAllOrder(token);
        setLoading(false);
        setProduct(orderData?.orders);
        const userNew = { user: res.user, token };
        localStorage.setItem("user", JSON.stringify(userNew));
        dispatch(setAuth(userNew));
        setUserInfo(res?.user);
      })();
    }
  }, [token]);

  return (
    <>
      <Meta title={`E-commerce ${userInfo.name} Profile`} />
      {loading ? (
        <Loader />
      ) : (
        <section className="sec">
          <div className="container">
            <div className="flex mt-[0.3em] flex-wrap items-center gap-6">
              {/* Profile Info */}
              <div className="md:w-[25%] w-full">
                <h1 className="text-2xl font-bold text-gray-500 mb-4 text-center">
                  Profile Details
                </h1>
                <Avatar
                  shape="circle"
                  src={userInfo?.avatar}
                  border={true}
                  className="flex justify-center items-center"
                />
                <div className="mt-4 flex flex-col w-full">
                  <Input
                    placeholder="Username"
                    className="w-full mb-4"
                    disabled={true}
                    onChange={handleChange}
                    value={userInfo?.name}
                  />
                  <Input
                    placeholder="email"
                    className="w-full"
                    disabled={true}
                    onChange={handleChange}
                    value={userInfo?.email}
                  />
                  <Button
                    onClick={() => setDrawer(!drawer)}
                    type="submit"
                    color="success"
                    className="mt-4 text-white"
                  >
                    Edit Profile
                  </Button>
                  {userInfo && !userInfo.formGoogle && (
                    <Button
                      onClick={() => setDrawerPassword(!drawerPassword)}
                      type="submit"
                      color="success"
                      className="mt-4 text-white"
                    >
                      Edit Password
                    </Button>
                  )}
                </div>
              </div>
              <div className="md:w-[50%] w-full mt-10 md:mt-0">
                {/* Order Details */}
                <Table zebra={true}>
                  <Table.Head>
                    <span />
                    <span>ID</span>
                    <span>DATE</span>
                    <span>TOTAL</span>
                    <span>STATUS</span>
                    <span>ACTION</span>
                  </Table.Head>
                  {product &&
                    product.length > 0 &&
                    product.map((item) => (
                      <Table.Body key={item._id}>
                        <Table.Row>
                          <span>1</span>
                          <span>{item._id}</span>
                          <span>
                            <TimeAgo datetime={item.createdAt} locale="vi" />
                          </span>
                          <span>{item.cart?.length}</span>
                          <span
                            className={
                              item.delivered
                                ? "bg-green-500 text-white p-2"
                                : "bg-red-400 text-white p-2"
                            }
                          >
                            {item.delivered ? "Delivered" : "Process"}
                          </span>
                          <span
                            className="hover:underline cursor-pointer text-blue-600"
                            onClick={() => router.push(`/order/${item._id}`)}
                          >
                            Details
                          </span>
                        </Table.Row>
                      </Table.Body>
                    ))}
                </Table>
                {product && product.length === 0 && (
                  <p className="font-semibold text-2xl mt-4">
                    You don't oder yet
                  </p>
                )}
              </div>
            </div>
            {/* Model Popup Update UserInfo */}
            <Drawer
              open={drawer}
              onClose={() => setDrawer(!drawer)}
              direction="right"
              size={350}
              style={{ padding: 20 }}
            >
              <AppForm
                initialValues={{
                  email: "",
                  name: "",
                }}
                onSubmit={handleUpdate}
                validationSchema={updateSchema}
              >
                <FormInput
                  name="email"
                  type="email"
                  placeholder="example@example.com"
                  className="border-[1px] py-2 px-4 rounded w-full"
                />
                <FormInput
                  name="name"
                  type="text"
                  placeholder="example@fullname"
                  className="border-[1px] py-2 px-4 rounded w-full"
                />
                <div className="backdrop-blur-md w-full lg:w-300 h-300 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
                  {isImageLoading && <ImageLoader progress={uploadProgress} />}
                  {!isImageLoading && (
                    <>
                      {!avatar ? (
                        <ImageUploader
                          setImageURL={setAvatar}
                          isLoading={setIsImageLoading}
                          setProgress={setUploadProgress}
                          isImage={true}
                        />
                      ) : (
                        <div className="relative w-full h-full overflow-hidden rounded-md">
                          <img
                            src={avatar}
                            alt="uploaded image"
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md  duration-500 transition-all ease-in-out"
                            onClick={() => {
                              deleteImageObject(avatar, setAvatar);
                            }}
                          >
                            <MdDelete className="text-white" />
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
                <div className="flex justify-center">
                  <Button
                    type="submit"
                    className="w-full mt-2 text-white"
                    color="success"
                  >
                    Update Profile Info
                  </Button>
                </div>
              </AppForm>
            </Drawer>
            {/* Model Popup Update password */}
            <Drawer
              open={drawerPassword}
              onClose={() => setDrawerPassword(!drawerPassword)}
              direction="right"
              size={350}
              style={{ padding: 20 }}
            >
              <AppForm
                initialValues={{
                  oldPassword: "",
                  newPassword: "",
                }}
                onSubmit={handlePassword}
                validationSchema={updatePassword}
              >
                <FormInput
                  name="oldPassword"
                  type="password"
                  placeholder="example@example.com"
                  className="border-[1px] py-2 px-4 rounded w-full"
                />
                <FormInput
                  name="newPassword"
                  type="password"
                  placeholder="example@fullname"
                  className="border-[1px] py-2 px-4 rounded w-full"
                />
                <div className="flex justify-center">
                  <Button
                    type="submit"
                    className="w-full mt-2 text-white"
                    color="success"
                  >
                    Update Profile Info
                  </Button>
                </div>
              </AppForm>
            </Drawer>
          </div>
        </section>
      )}
    </>
  );
};

export default Profile;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  if (!req.headers.cookie) {
    return {
      redirect: {
        destination: "/login",
      },
      props: { isLogin: false },
    };
  }
  return {
    props: { isLogin: true },
  };
};
