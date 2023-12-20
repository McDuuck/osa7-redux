import { useState, useEffect } from "react"
import loginService from "../services/login"
import blogService from "../services/blogs"
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, user_loginId } from '../redux/userSlice';
import { setNotification, clearNotification } from '../redux/notificationSlice';
import "../index.css"

const LoginForm = (props) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState("wrong credentials")
  const [errorStatus, setStatus] = useState(false)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(login(user));
      blogService.setToken(user.token);
    }
  }, [dispatch]);

  const Notification = ({ message }) => {
    if (message === null) {
      return null;
    }
    if (errorStatus === true) {
      return <div className="error">{message}</div>;
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      blogService.setToken(user.token);
      dispatch(login(user))
      dispatch(user_loginId(user.id))
      props.onLogin(true);
      setUsername("");
      setPassword("");
      dispatch(setNotification(`Welcome ${user.name}!`));
      setTimeout(() => {
        dispatch(clearNotification());
      }, 5000);
    } catch (exception) {
      setStatus(true);
      setErrorMessage("wrong username or password");
      setTimeout(() => {
        setErrorMessage(null);
        setStatus(false);
      }, 5000);
    }
  };

  if (user === null) {
    return (
      <div>
        <Notification message={errorMessage} />
        <h2 id="login_click">Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              id="username"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              id="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  }
};

export default LoginForm;
