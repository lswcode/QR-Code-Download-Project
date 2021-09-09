import axios, { AxiosRequestConfig } from "axios";
export const tokenRequest = axios.create({
  baseURL: "https://test.gfitgo.com/gfit-frontend-inf/harmony",
});
// ---------------------------------------------------------------

export const getAddress = axios.create({
  baseURL: "https://lfhagmirror.hwcloudtest.cn:18449/open-ability/v1/harmony-tag/create",
});

export const downloadRequest = axios.create({
  baseURL: "",
  responseType: "blob",
  // axios 请求头部加上responseType='blob'
});

getAddress.interceptors.request.use((req: AxiosRequestConfig) => {
  const token = window.localStorage.getItem("token");
  console.log(token);
  const nowTime = new Date();
  console.log("执行请求拦截器");
  req.headers = {
    Accept: "application/json",
    "x-appid": 101753119,
    "x-hag-trace-id": Math.round(nowTime.getTime() / 1000),
    "Content-Type": "application/json",
    "x-client-version": "1.0.2",
  };
  req.headers.Authorization = `Bearer ${token}`;
  console.log(req);
  return req;
});
