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
    method: "GET",
    url,
  });
};
