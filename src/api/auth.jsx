import API from "./API";

export const verifyEmail = async (email) => {
  try {
    const { data } = await API.post("/mail/verify", { email });
    return data;
  } catch (err) {
    console.table(err);
  }
};

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
