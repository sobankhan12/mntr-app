import axios from './axios';

class AuthService {
  async login(ethaddress) {
    const response = await axios.post('auth/login-eth', ethaddress).catch(e => {
      console.log(e);
    });
    // console.log(response);
    if (!response) {
      return;
    }
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  }
  async createUser(user) {
    const response = await axios.post('auth/register', user).catch(e => {
      console.log(e);
    });
    if (!response) {
      return;
    }
    // console.log(response);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  }

  async logout() {
    const refreshToken = localStorage.getItem('refreshToken')
    const response = await axios.post('auth/logout', {refreshToken}).catch(e => {
      console.log(e);
    });
    return response?.data;
  }
}

export default new AuthService();
