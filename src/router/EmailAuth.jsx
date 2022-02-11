import axios from "axios";
import { useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { authEmail } from "../api/Signup";

export default function EmailAuth() {
  const navigate = useNavigate();
  const { walletaddress, authNum } = useParams();

  useEffect(async () => {
    await authEmail(walletaddress, authNum);
    navigate("/");
  }, []);
  return <EmailAuthBox></EmailAuthBox>;
}

const EmailAuthBox = styled.section``;
