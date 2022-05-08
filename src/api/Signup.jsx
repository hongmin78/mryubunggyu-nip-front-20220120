import { net } from "../configs/net";
import SetErrorBar from "../util/SetErrorBar";
import API from "./API";
export function getRequestEmail(email, walletAddress) {
  API.post("/signup/email/request?nettype=" + net, { email, walletAddress })
    .then((res) => {
      SetErrorBar(res.data);
    })
    .catch((err) => SetErrorBar(err.response.data));
}
export function authEmail(email, authNum) {
  API.post("/signup/email/auth?nettype=" + net, { email, authNum })
    .then((res) => {
      return res;
    })
    .catch((err) => console.error(err));
}
export const login = async (walletAddress) => {
  const { data } = await API.post("/signup/login?nettype=" + net, {
    walletAddress,
  });
  return data;
};

export const signup = async (walletAddress, email, password, referral) => {
  console.log({
    walletAddress,
    email,
    password,
    referral,
  });
  try {
    const { data } = await API.post("/signup?nettype=" + net, {
      walletAddress,
      email,
      password,
      referral,
    });
    return data;
  } catch (err) {
    SetErrorBar(err.response.data);
  }
};
