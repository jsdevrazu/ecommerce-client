import React, { useEffect, useState } from "react";
import "./profile.module.min.css";
import { Button, Input, Loader } from "../../components";
import Avatar from "react-avatar";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/userSlice";
import Modal from "react-modal";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { storage } from "../../../firebase";
import { BsTrash } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";

const initialState = {
  email: "",
  username: "",
};

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const Profile = () => {
  const [formData, setFormData] = useState(initialState);
  const [avatar, setAvatar] = useState(null);
  const [progress, setProgress] = useState(null);
  const { email, username } = formData;
  const [loading, setLoading] = useState(false);
  const { token, user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleChange = (e) => {
    setFormData({ ...FormData, [e.target.name]: e.target.value });
  };

  //When User Upload Any File
  const uploadFile = (e) => {
    const storageRef = ref(storage, `img/${e.target.files[0].name}`);
    const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        return toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setAvatar(downloadUrl);
        });
      }
    );
  };

  // Delete Images
  const deleteImage = () => {
    if (window.confirm("Are you sure to delete this image?")) {
      const deleteRef = ref(storage, avatar);
      deleteObject(deleteRef).then(() => {
        setAvatar(null);
      });
    } else return toast.warning(`You can't able to do that`);
  };

  const getUserInfo = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_PROXY_URI}/profile/me`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: true,
        }
      );
      setLoading(false);
      setFormData({ ...data?.userInfo });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    token && getUserInfo();
  }, [token]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_PROXY_URI}/update/me`,
        {
          email,
          username,
          avatar,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: true,
        }
      );
      dispatch(login(data));
      localStorage.setItem("user", JSON.stringify(data));
      setLoading(false);
      toast.success("Profile Update Successfully");
      navigate("/");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_PROXY_URI}/password`,
        {
          oldPassword,
          newPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: true,
        }
      );
      toast.success(data?.message);
      setLoading(false);
      dispatch(login({ user: null, token: "" }));
      localStorage.clear();
      navigate("/login");
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  if (loading && !token) return <Loader />;

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <section className="profile sec_p">
          <div className="container">
            <div className="profile_main">
              <h1>Personal Information</h1>
              <form className="profile_form" onSubmit={handleUpdate}>
                <div className="form_control">
                  <label htmlFor="username">Name</label>
                  <Input
                    type="text"
                    placeholder="Your Name"
                    onChange={handleChange}
                    value={username}
                    name="username"
                    id="username"
                  />
                </div>
                <div className="form_control">
                  <label htmlFor="email">Email</label>
                  <Input
                    type="email"
                    placeholder="Your Email"
                    onChange={handleChange}
                    value={email}
                    name="email"
                    id="email"
                  />
                </div>
                <div className="form_control">
                  {!avatar ? (
                    <>
                      <label htmlFor="username">Upload Profile Image</label>
                      <Input
                        type="file"
                        placeholder="Your Name"
                        onChange={uploadFile}
                        accept="image/*"
                      />
                    </>
                  ) : (
                    <>
                      <div className="img_form">
                        <img src={avatar} alt="Razu Islam" />
                        <BsTrash
                          size={40}
                          style={{
                            position: "absolute",
                            top: "30px",
                            left: "50px",
                            color: "red",
                            cursor: "pointer",
                          }}
                          onClick={deleteImage}
                        />
                      </div>
                    </>
                  )}
                </div>
                <div className="img">
                  <h3
                    style={{
                      marginBottom: "10px",
                      marginTop: "20px",
                      textAlign: "center",
                    }}
                  >
                    Your Profile Image
                  </h3>
                  <div className="avatar">
                    <Avatar
                      src={user?.avatar || avatar}
                      size="100"
                      round={true}
                      name={username}
                    />
                  </div>
                </div>
                <Button
                  disabled={progress !== null && progress < 100}
                  text={"Update Profile"}
                  className="app_btn"
                />
              </form>
              <p
                style={{
                  marginTop: "1em",
                  fontStyle: "italic",
                  opacity: "0.7",
                }}
              >
                If you need to change password
                <span
                  style={{
                    display: "inline-block",
                    marginLeft: "5px",
                    color: "skyblue",
                    cursor: "pointer",
                  }}
                  onClick={() => setIsOpen(true)}
                >
                  Click Here
                </span>
              </p>
            </div>
          </div>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setIsOpen(false)}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <Button
              className="app_btn close_btn"
              text={<AiOutlineClose size={30} />}
              onClick={() => setIsOpen(false)}
            />
            <div className="model_main">
              <h3>Change Your Password</h3>
              <form className="model_form" onSubmit={handleChangePassword}>
                <div className="form_control">
                  <label htmlFor="oldPassword" className="label_text">
                    Old Password
                  </label>
                  <Input
                    type="password"
                    id="oldPassword"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder="Old Password"
                  />
                </div>
                <div className="form_control">
                  <label htmlFor="password" className="label_text">
                    New Password
                  </label>
                  <Input
                    type="password"
                    id="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="New Password"
                  />
                </div>
                <Button
                  type="submit"
                  text={"Change Password"}
                  className="app_btn"
                />
              </form>
            </div>
          </Modal>
        </section>
      )}
    </>
  );
};

export default Profile;
