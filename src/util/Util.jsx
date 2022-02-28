export function strDot(str, startNum, endNum = 0) {
  if (str && str.length) {
  } else {
    return null;
  }
  return `${str.substr(0, startNum)}...${str.substr(str.length - endNum)}`;
}

export function chkValidEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(String(email).toLowerCase());
}

export function putCommaAtPrice(data) {
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

export function getStyle(ref, getStyle) {
  const style = window.getComputedStyle(ref.current);
  let styleGap = style.getPropertyValue(getStyle);
  return Number(styleGap.replace("px", ""));
}

export function onClickPreBtn(ref, itemList, index, setIndex) {
  if (!ref.current.children) return;

  const wrapWidth = ref.current.offsetWidth;
  const contWidth = ref.current.children[0].offsetWidth;
  const itemNumByPage = Math.floor(wrapWidth / contWidth);
  const pageNum = Math.ceil(itemList.length / itemNumByPage);

  if (index > 0) setIndex(index - 1);
  else setIndex(pageNum - 1);
}

export function onClickNextBtn(ref, itemList, index, setIndex) {
  if (!ref.current.children) return;

  const wrapWidth = ref.current.offsetWidth;
  const contWidth = ref.current.children[0].offsetWidth;
  const itemNumByPage = Math.floor(wrapWidth / contWidth);
  const pageNum = Math.ceil(itemList.length / itemNumByPage);
  if (index < pageNum - 1) setIndex(index + 1);
  else setIndex(0);
}

export function swiperListener(ref, index) {
  if (!ref || !ref.current || !ref.current.children[0]) return;

  const wrapWidth = ref.current.offsetWidth;
  const contWidth = ref.current.children[0].offsetWidth;
  const itemNumByPage = Math.floor(wrapWidth / contWidth);

  if (ref.current?.scrollTo) {
    if (index === 0) {
      ref.current.scrollTo({
        left: 0,
        behavior: "smooth",
      });
    } else {
      ref.current.scrollTo({
        left:
          contWidth * itemNumByPage * index +
          index * getStyle(ref, "gap") * itemNumByPage,
        behavior: "smooth",
      });
    }
  }
}
