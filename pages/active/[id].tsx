import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button } from "react-daisyui";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setAuth } from "../../app/Slice/authSlice";
import { IPrams } from "../../app/Types";
import { apiEndPoint } from "../../app/Utils";
import styles from './style.module.css';

const ActiveAccount = () => {
  const { query }: any = useRouter();
  const router = useRouter();
  const dispatch = useDispatch();
  const { id }: IPrams = query;
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      axios
        .post(`${apiEndPoint}/auth/verify-account`, {
          access_token: id,
        })
        .then((res) => {
          toast.success(`Email Verify Successfully`);
          setSuccess(`Email Verify Successfully`);
          dispatch(setAuth(res.data));
          localStorage.setItem("user", JSON.stringify(res.data));
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
          setError(err?.response?.data?.message);
        })
        .finally(() => {
          setTimeout(() => {
            router.push("/");
          }, 2000);
        });
    }
  }, [id]);

  return (
    <>
     <section className="sec">
      <div className="container">
      {success && (
        <div className={styles.success}>
          {success}
          <Button
            type="button"
            color="success"
            onClick={() => router.push("/")}
          >
            Back to home
          </Button>
        </div>
      )}

      {error && (
        <div className={styles.error}>
          {error}
          <Button
            type="button"
            color="error"
            onClick={() => router.push("/")}
          >
            Back to home
          </Button>
        </div>
      )}
      </div>
     </section>
    </>
  );
};

export default ActiveAccount;