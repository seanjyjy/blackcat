import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import { apiPostLogin } from "../../api";

import LogoCat from "../../images/logo-cat.svg";
import User from "../../images/user.svg";
import Password from "../../images/password.svg";

import styles from "./index.scss";

const Login = () => {
  const history = useHistory();
  const location = useLocation<{ queryParams: string | undefined }>();
  const { setName, setPw, setAuth, auth, setAvatar } = useAuth();

  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (auth) {
      // redirect them back to home page if already authenticated
      const queryParams = location.state?.queryParams;
      if (queryParams) {
        history.push(`/posts/${queryParams}`);
      } else {
        history.push(`/posts`);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history, auth]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (userName.length <= 0) {
      setError("Username should not be empty");
      return;
    }

    if (password.length <= 0) {
      setError("Password should not be empty");
      return;
    }

    const res = await apiPostLogin(userName, password);
    const { data, err } = res;

    if (err) {
      return;
    }

    // simulating a check
    if (data?.success) {
      setError("");
      setName(userName);
      setPw(password);
      setAvatar(data?.avatar);
      setAuth(true);
      setUserName("");
      setPassword("");
      history.push("/posts");
    }
  };

  return (
    <div className={styles.loginBackground}>
      <form className={styles.container} onSubmit={handleSubmit}>
        <div>
          <p className={styles.title}>FIND THE MOST LOVED ACTIVITIES</p>
          <p className={styles.appName}>BLACK CAT</p>
          <div>
            <img src={LogoCat} className={styles.logo} alt="logo" />
          </div>
        </div>
        <div className={styles.inputsContainer}>
          <div className={styles.inputContainer}>
            <img src={User} alt="user" />
            <input
              className={styles.input}
              placeholder="Username"
              type="text"
              value={userName}
              onChange={e => setUserName(e.target.value)}
            />
          </div>
          <div className={styles.inputContainer}>
            <img src={Password} alt="password" />
            <input
              className={styles.input}
              placeholder="Password"
              type="text"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          {!!error && <span className={styles.errorMessage}>{error}</span>}
        </div>
        <button className={styles.signInButton} type="submit">
          SIGN IN
        </button>
      </form>
    </div>
  );
};

export default Login;
