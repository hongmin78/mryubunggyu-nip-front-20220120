const strDot = (str, startNum, endNum = 0) => {
  if (str && str.length) {
  } else {
    return null;
  }
  return `${str.substr(0, startNum)}...${str.substr(str.length - endNum)}`;
};

const chkValidEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  return re.test(String(email).toLowerCase());
};

export { strDot, chkValidEmail };
