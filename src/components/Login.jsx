import { useMutation } from "@apollo/client";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext2";
import { LOGIN } from "../graphql/Mutations";
import { isValidToken, setSession } from "../utils/jwt";
//import "../styles/loginStyle.css";

const Login = () => {
  const navigate = useNavigate();
  const [isInValid, setisInValid] = useState("");
  const { setAuthorized, authorized } = useAuthContext();

  const [login, { error }] = useMutation(LOGIN, {});

  const refEmail = useRef();
  const refPassword = useRef();

  useEffect(() => {
    if (authorized) {
      navigate("/home", { replace: true });
    }
  }, [authorized]);

  const loginHandler = async (e) => {
    e.preventDefault();

    const email = refEmail.current.value;
    const password = refPassword.current.value;

    await login({ variables: { email, password } })
      .then(function (response) {
        var token = response.data.login;

        if (token && isValidToken(token)) {
          setSession(token);
          setAuthorized(true);
          navigate("/home");
        } else {
          setisInValid("invalid credentials");
        }
      })
      .catch(function (err) {
        console.log("Something went wrong!!", err);
      });
  };

  return (

    <div
      className="container mt-5  "
      style={{ width: "780px", display: "grid", gap: "1.5rem" }}
    >
      <form
        onSubmit={loginHandler}
        style={{
          display: "grid",
          gap: "1.5rem",
        }}
      >
        <div className="text-center">
          <h3 className="m-0 text-light font-weight-bold">Sign In</h3>
          {error && <p className="m-1 text-danger">{error}</p>}
        </div>

        <div
          className="container mb-5 p-5 "
          style={{
            width: "680px",
            display: "grid",
            gap: "1.5em",
            background: "rgb(54,25,62)",
            background:
              "radial-gradient(circle, rgba(54,25,62,1) 0%, rgba(53,30,69,1) 0%, rgba(18,6,23,1) 100%)",
          }}
        >
          <div>
            <h6 className="text-light m-0">Do you have an HBO Max Account?</h6>
          </div>
          {isInValid && (
            <div>
              <h6 className="text-danger m-0">Invalid credentials</h6>
            </div>
          )}

          <div>
            <input
              ref={refEmail}
              name="username"
              placeholder="Username"
              type="text"
              className="form-control "
              autoComplete="off"
              style={{ height: "56px" }}
            />
          </div>
          <div>
            <input
              ref={refPassword}
              name="password"
              placeholder="Password"
              type="password"
              className="form-control"
              style={{ height: "56px" }}
            />
          </div>

          <div className="d-flex">
            <button
              type="submit"
              className=" btn-h w-25  btn-lg mt-3"
              style={{ height: "56px" }}
            >
              SIGN IN
            </button>

            <p className="mx-4 mt-3 pt-3" style={{ color: "rgb(145,129,248)" }}>
              Forgot you're password?
            </p>
          </div>
        </div>
      </form>
      {/* <div className="text-center">
        <p>Don´t you have an account?</p>
        <Link to={"/signup"}>
          <button type="link" className="w-100 btn btn-white border">
            Sign Up
          </button>
        </Link>
      </div> */}
    </div>
  );
};

export default Login;
