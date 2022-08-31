const CONSOLEON = 0;
const bs58 = require("bs58");
const crypto = require("crypto");
const _characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
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

export const get_ipfsformatcid_str = (str) => {
  const hashFunction = Buffer.from("12", "hex"); // 0x20
  const digest = crypto.createHash("sha256").update(str).digest(); // data
  CONSOLEON && console.log(digest.toString("hex")); // b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9
  const digestSize = Buffer.from(digest.byteLength.toString(16), "hex");
  CONSOLEON && console.log(digestSize.toString("hex")); // 20
  const combined = Buffer.concat([hashFunction, digestSize, digest]);
  CONSOLEON && console.log(combined.toString("hex")); // 1220b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9
  const multihash = bs58.encode(combined);
  CONSOLEON && console.log(multihash.toString()); // QmaozNR7DZHQK1ZcU9p7QdrshMvXqWK6gpu5rmrkPdT3L4
  return multihash.toString();
};

export const generate_random_string = (length) => {
  var result = "";
  var characters = _characters;
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const get_contractaddress = (name, list) => {
  return new Promise((resolve, reject) => {
    const address = list.find((el) => el.name == name)?.address;
    address ? resolve(address) : reject(null);
  });
};

export const get_ipfsformatcid = () => {
  let str = generate_random_string(10);
  const hashFunction = Buffer.from("12", "hex"); // 0x20
  const digest = crypto.createHash("sha256").update(str).digest(); // data
  CONSOLEON && console.log(digest.toString("hex")); // b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9
  const digestSize = Buffer.from(digest.byteLength.toString(16), "hex");
  CONSOLEON && console.log(digestSize.toString("hex")); // 20
  const combined = Buffer.concat([hashFunction, digestSize, digest]);
  CONSOLEON && console.log(combined.toString("hex")); // 1220b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9
  const multihash = bs58.encode(combined);
  CONSOLEON && console.log(multihash.toString()); // QmaozNR7DZHQK1ZcU9p7QdrshMvXqWK6gpu5rmrkPdT3L4
  return multihash.toString();
};

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
