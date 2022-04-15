import axios from "axios";
import { useEffect } from "react";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { authEmail } from "../api/Signup";
import { messages } from "../configs/messages";
import { LOGGER } from "../util/common";
import SetErrorBar from "../util/SetErrorBar";
import { TIME_PAGE_TRANSITION_DEF } from "../configs/configs";
import { API } from "../configs/api";
import { setisAuthEmail } from "../util/store/commonSlice";
import { useDispatch } from "react-redux";

export default function EmailAuth() {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, authNum, walletaddress } = useParams();
  const dispatch = useDispatch();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    console.log(email, authNum, walletaddress);
    const postemailauth = (_) => {
      axios
        .post(API.API_EMAIL_VERIFY, { email, authNum, walletaddress })
        .then((resp) => {
          LOGGER("", resp.data);
          let { status } = resp.data;
          if (status == "OK") {
            SetErrorBar(messages.MSG_EMAIL_VERIFIED);
            dispatch(setisAuthEmail(true));

            setTimeout(() => {
              window.close();
            }, TIME_PAGE_TRANSITION_DEF);
          } else {
          }
        })
        .catch((err) => console.error(err));
    };
    postemailauth();
  }, []);
  return <EmailAuthBox></EmailAuthBox>;
}

const EmailAuthBox = styled.section``;
/**  await authEmail(email, authNum);
	setTimeout(_=>{
		navigate("/")
	} , 3000 ) 
	alert(messages.MSG_EMAIL_VERIFIED )
*/
