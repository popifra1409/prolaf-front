import axios from 'axios';

const Credentials_API_BASE_URL = "http://localhost:8000/user/Credentials/"; 


class LoginAPI {

login = async (pseudo, password) => {
  try {
    const response = await axios.post(Credentials_API_BASE_URL, { pseudo, password });
    if (response.data) {
      // handle successful login
      return { success: true, data: response.data };
    }
  } catch (error) {
    // handle login error
    return { success: false, error: error.message };
  }
}
};

export default LoginAPI;


