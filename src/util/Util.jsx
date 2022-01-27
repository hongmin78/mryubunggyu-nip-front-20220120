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

function putCommaAtPrice(data) {
  let str;

  if (data !== undefined) {
    data = Number(data);

    // if (data < 1000)
    //   return data.toFixed(3);

    str = data.toString().split(".");

    str[0] = `${str[0]}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return str.join(".");
  }
  return 0;
}

function getStyle(ref, getStyle) {
  const style = window.getComputedStyle(ref.current);
  let styleGap = style.getPropertyValue(getStyle);
  return Number(styleGap.replace("px", ""));
}

export { strDot, chkValidEmail, putCommaAtPrice, getStyle };
