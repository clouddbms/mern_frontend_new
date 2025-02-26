import styles from "../LoginPage/loginstyles.module.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../providers/authProvider";
import { useUser } from "../../providers/UserProvider";
import { toast } from "sonner";
import LoadingAnimation from "../../components/LoadingAnimation/LoadingAnimation";
import { backendUrl } from "../../backendUrl";
const LoginForm = () => {
  const { setUserDetails } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailerror, setEmailerror] = useState("");

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setToken } = useAuth();

  const emailhandler = (event) => {
    setEmail(event.target.value);
    console.log(email);
  };
  const passwordhandler = (event) => {
    setPassword(event.target.value);
  };
  const [csrfToken, setcsrfToken] = useState("");
  // const gettoken = () => {
  //   axios.get(backendUrl+"/log/csrf-token", {withCredentials: true}).then((res) => {

  //     console.log(res.data.csrfToken);
  //     setcsrfToken(res.data.csrfToken);

  //   }).catch((err) => console.log(err))
  // };

  // useEffect(() => {
  //   gettoken();
  // }, []);

  const formSubmitHandler = (event) => {
    event.preventDefault();
    // send post request to /api/login
    setLoading(true);
    axios
      .post(
        backendUrl + "/log/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.status === 200) {
          // save token in local storage
          localStorage.setItem("token", res.data.token);
          // set token in authProvider
          setToken(res.data.token);

          //fetch user details and store in context
          const url = backendUrl + "/user/email/" + email;
          fetch(url)
            .then((res) => res.json())
            .then((data) => {
              setUserDetails(data);
            })
            .catch((err) => console.log(err));

          // redirect to home page
          setLoading(false);
          navigate("/home");
        } else {
          toast.error("invalid credentials");
        }
      })
      .catch((err) => {
        const errorMessage = err.response.data.message;
        toast.error("invalid credentials");
        console.log(err);
      });
    setLoading(false);
  };

  return (
    <>
      {loading && <LoadingAnimation></LoadingAnimation>}
      <form onSubmit={formSubmitHandler} className={styles.loginform}>
        <div className={styles.field}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={email}
            required
            autoComplete="off"
            id="email"
            onChange={emailhandler}
          />
        </div>
        <div className={styles.field} style={{ marginBottom: "10px" }}>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            className={styles.pswd}
            id={styles.pswd}
            required
            autoComplete="off"
            onChange={passwordhandler}
          />
        </div>
        <span
          style={{
            color: "red",
            marginTop: "10px",
            fontSize: "15px",
            display: "block",
          }}
          className={styles.errorMessage}
        >
          {emailerror !== "" && emailerror}
        </span>

        <Link
          to="/forgotpassword"
          style={{
            color: "black",
            marginTop: "2px",
            fontSize: "16px",
            textDecoration: "none",
          }}
        >
          Forgot/Reset password?
        </Link>
        <button
          className={`${styles.field} ${styles.btn}`}
          id="loginsubmit"
          type="submit"
          style={{ backgroundColor: "black", fontSize: "20px", color: "white" }}
        >
          Login
        </button>
        <div className={styles["signup-link"]}>
          Not a member? <Link to="/register">Signup now</Link>
        </div>
      </form>
    </>
  );
};
export default LoginForm;
