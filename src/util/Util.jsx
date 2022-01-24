const strDot = (str, startNum, endNum = 0) => {
  if (str && str.length) {
  } else {
    return null;
  }
  return `${str.substr(0, startNum)}...${str.substr(str.length - endNum)}`;
};

export { strDot };
