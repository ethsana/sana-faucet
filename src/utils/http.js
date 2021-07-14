import axios from "axios";

const instance = axios.create({
  //   baseURL: 'https://dapp.doschain.org/cracy/',
  //   baseURL: process.env.NODE_ENV === 'production' ? 'https://dapp.doschain.org/recharge' : '/recharge',
  //   baseURL: 'https://games-testnet.doschain.org/recharge',
  baseURL:
    process.env.NODE_ENV === "production" ? "https://faucet-api.ethsana.org" : "/",
  timeout: 10000,
});

// 拦截器
instance.interceptors.response.use(
  (response) => {
    // if (response.data.code !== 200) {
    //   alert("netWork error");
    // }
    return { code: response.data.code, data: response.data.data || null, msg:  response.data.msg || null};
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
