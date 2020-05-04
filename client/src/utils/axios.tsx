import axios from "axios";

class AxiosConfig {
  static token: string;

  static httpAxios() {
    return axios.create({
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  }
}

export default AxiosConfig;
