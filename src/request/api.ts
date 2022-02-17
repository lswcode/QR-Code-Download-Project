import { tokenRequest } from "@/request/request";
import { getAddress } from "@/request/request";
import { downloadRequest } from "@/request/request";

export const tokenReq = () => {
  return tokenRequest({
    method: "GET",
    url: "/oauth2/v2/token",
  });
};

export const getAddressReq = (data: unknown) => {
  return getAddress({
    method: "POST",
    data,
  });
};

export const downloadImg = (url: string) => {
  return downloadRequest({
    // downloadRequest是使用axios.created创建的基础axios，在里面已经配置好了responseType: "blob"，所以使用downloadRequest发送的axios请求，接收的结果都会转换成blob格式
    method: "GET",
    url,
  });
};
