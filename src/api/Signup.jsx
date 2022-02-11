import API from "./API";

export function getRequestEmail(email, walletAddress) {
  API.post("/signup/email/request", { email, walletAddress })
    .then((res) => {
      return res;
    })
    .catch((err) => console.error(err));
}

export function authEmail(walletAddress, authNum) {
  API.post("/signup/email/auth", { walletAddress, authNum })
    .then((res) => {
      return res;
    })
    .catch((err) => console.error(err));
}

export const login = async (email, password) => {
  const { data } = await API.post("/user/login", { email, password });
  console.log(data);
};

export const signup = async (
  walletAddress,
  email,
  password,
  referrals,
  subscrible,
  personalInfo
) => {
  console.log({
    walletAddress,
    email,
    password,
    referrals,
    subscrible,
    personalInfo,
  });
  const { data } = await API.post("/user", {
    walletAddress,
    email,
    password,
    referrals,
    subscrible,
    personalInfo,
  });
  console.log(data);
  return data;
};
