import { net } from "../configs/net";
import SetErrorBar from "../util/SetErrorBar";
import API from "./API";
export function getRequestEmail(email, walletAddress) {
  API.post("/signup/email/request?nettype=" + net, {
    email,
    walletAddress,
    nettype: net,
  })
    .then((res) => {
      SetErrorBar(res.data);
    })
    .catch((err) => SetErrorBar(err.response.data));
}
export function authEmail(email, authNum) {
  API.post("/signup/email/auth?nettype=" + net, {
    email,
    authNum,
    nettype: net,
  })
    .then((res) => {
      return res;
    })
    .catch((err) => console.error(err));
}
export const login = async (walletAddress) => {
  const { data } = await API.post("/signup/login?nettype=" + net, {
    walletAddress,
    nettype: net,
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
      nettype: net,
    });
    return data;
  } catch (err) {
    SetErrorBar(err.response.data);
  }
};
