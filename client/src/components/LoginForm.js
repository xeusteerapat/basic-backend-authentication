import React, { useState } from 'react';
import axios from '../config/axios';
import JwtDecode from 'jwt-decode';

const LoginForm = ({ isLogin, setIsLogin, userInfo, setUserInfo }) => {
  const initialForm = {
    username: '',
    password: ''
  };

  const [formData, setFormData] = useState(initialForm);
  const { username, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      username,
      password
    };

    const result = await axios.post('/users/login', body);

    localStorage.setItem('ACCESS_TOKEN', result.data.token);
    const user = JwtDecode(result.data.token);
    setUserInfo(user);
    setFormData(initialForm);
    setIsLogin(true);
  };

  const logout = () => {
    localStorage.removeItem('ACCESS_TOKEN');
    setUserInfo({});
    setIsLogin(false);
  };

  return (
    <div>
      {isLogin ? (
        <>
          <h2>Yeahhhhhh!!! {userInfo.name}</h2>
          <button className="btn btn-info" onClick={logout}>
            Logout
          </button>
        </>
      ) : (
        <form action="" onSubmit={handleSubmit}>
          <input
            name="username"
            className="form-control"
            type="text"
            value={username}
            onChange={handleChange}
            placeholder="Enter username"
          />
          <input
            name="password"
            className="form-control"
            type="password"
            value={password}
            onChange={handleChange}
            placeholder="Enter password"
          />
          <button className="btn btn-info">Log in</button>
        </form>
      )}
    </div>
  );
};

export default LoginForm;
