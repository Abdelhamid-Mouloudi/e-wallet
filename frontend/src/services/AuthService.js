import axios from './axios';

const login = (body) => {
  const url = '/auth/login';
  return axios.post(url, body).then((response) => {
    localStorage.setItem('user', JSON.stringify(response.data));
    return response.data;
  });
};

const signup = (body) => {
  const url = '/auth/signup';
  return axios.post(url, body).then((response) => response.data);
};

const logout = () => {
  localStorage.removeItem('user');
};

const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  if (!user) return null;
  try {
    return JSON.parse(user);
  } catch (err) {
    console.error("Erreur parsing user:", err);
    return null;
  }
};

const AuthService = {
  login,
  signup,
  logout,
  getCurrentUser,
};

export default AuthService;
