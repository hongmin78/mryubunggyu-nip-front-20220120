import axios from "axios";
import { useState } from "react";
import styled from "styled-components";

export default function Test() {
  const [image, setImg] = useState("");
  /*
  image,
  */
 const itemData = {
   name: " #17",
   description: "",
   image,
   dna: "dbccbfe9f467e87307b9b35236ccfabe2715c4ee",
   edition: 17,
   date: 1643469914234,
   attributes: [
     {
       trait_type: "background",
       value: "blue",
     },
     {
       trait_type: "skin",
       value: "green",
     },
     {
       trait_type: "body",
       value: "violet suit",
     },
     {
       trait_type: "mouth",
       value: "tongue out",
     },
     {
       trait_type: "eyes",
       value: "vr",
     },
     {
       trait_type: "head",
       value: "cap",
     },
   ],
   compiler: "HashLips Art Engine",
 };

  function OnChangeProfImgFile(file) {
    if (file.size >= 10 * 1024 * 1024) return;
    if (
      file.type !== "image/png" &&
      file.type !== "image/jpg" &&
      file.type !== "image/gif"
    )
      return;

    let reader = new FileReader();
    reader.onloadend = function () {
      var b64 = reader.result;
      console.log(b64);
      setImg(b64);
    };
    reader.readAsDataURL(file);
  }

  function get() {
    axios.get("http://3.35.11 7.87:34805/auction").then((res) => console.log(res));
  }
  function post() {
    axios
      .post("http://3.35.11 7.87:34805/auction", itemData)
      .then((res) => console.log(res));
  }

  return (
    <TestBox>
      <button className="" onClick={get}>
        getBtn
      </button>

      <input
        id="UploadInput"
        type="file"
        onChange={(e) => OnChangeProfImgFile(e.target.files[0])}
      />

      <img src={image} alt="" />

      <button className="" onClick={post}>
        postBtn
      </button>
    </TestBox>
  );
}

const TestBox = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  gap: 10vw;

  img {
    height: 400px;
  }

  button {
    width: 200px;
    height: 40px;
    border-radius: 10px;
    color: #fff;
    background: #90e0ef;
    font-size: 32px;
  }
`;
