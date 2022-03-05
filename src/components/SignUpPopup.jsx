import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import I_x from "../img/icon/I_x.svg";
import I_chkWhite from "../img/icon/I_chkWhite.svg";
import { setLogin } from "../util/store/commonSlice";
import { chkValidEmail } from "../util/Util";
import { signup, getRequestEmail } from "../api/Signup";
import SetErrorBar from "../util/SetErrorBar";
import { messages } from "../configs/messages";
import { generaterandomstr_charset, LOGGER, getmyaddress } from "../util/common";
import axios from 'axios'
import { API } from '../configs/api'
import { TIME_PAGE_TRANSITION_DEF } from "../configs/configs";

export default function SignUpPopup({ walletAddress }) {  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMobile = useSelector((state) => state.common.isMobile);
  const [email, setEmail] = useState("");
  const [emailAlarm, setEmailAlarm] = useState("");
  const [pw, setPw] = useState("");
  const [pwConfrim, setPwConfirm] = useState("");
  const [pwAlarm, setPwAlarm] = useState("");
  const [referral, setReferal] = useState("");
  const [agreeList, setAgreeList ] = useState(new Array(2).fill(false));
  const [pending, setPending] =useState(false)
  const [ mailcheck, setMailcheck] =useState(false)
	let [ isemailrequested , setisemailrequested] = useState( false )
	let [ myaddress , setmyaddress] = useState( getmyaddress() )
  localStorage.setItem("mailcheck", false);
  function clickRegistrationBtn() {
    setPending(true)
    localStorage.setItem("MAIL_CHECK", false);
		let myaddress = getmyaddress()
		axios.post( API.API_EMAIL_REQUEST , { email, walletAddress : myaddress })
		.then( resp => { // SetErrorBar(res.data);
			LOGGER ( '' , resp.data )
			let { status }=resp.data
			if ( status == 'OK') {
				SetErrorBar ( messages.MSG_EMAIL_SENT )
//				setPending( false )
				setisemailrequested( true )
			} else {
				SetErrorBar ( messages.MSG_SERVER_ERR )
			}
		})
		.catch((err) =>{ 
			LOGGER( '' , err )
			SetErrorBar( messages.MSG_SERVER_ERR ) ; 
			return 
		} )
//    getRequestEmail( email, walletAddress );
  }
  
  window.addEventListener('storage', function(event) {
    setMailcheck(localStorage.getItem("MAIL_CHECK"))
  }, false);

  useEffect(() => {
		console.log(walletAddress);
		let pwrandom = generaterandomstr_charset(6 , 'base58')
		setPw('')
		setPwConfirm ('')
		setReferal('')
		setEmail ('')
  }, [] )

  const disableConfirm =
		!(email && pw && pwConfrim && agreeList[0] && agreeList[1]
				&& isemailrequested
			) ||
    emailAlarm ||
    pwAlarm;

  function onClickAgreeList(index) {
    let dataList = agreeList;
    dataList[index] = !dataList[index];
    setAgreeList([...dataList]);
  }

  useEffect(()=>{
    if(!pending)return;
    console.log('checking')

  })

  async function onClickSignUpBtn() {
		if(chkValidEmail( email) ){}
		else {SetErrorBar( messages.MSG_EMAIL_INVALID ); return }
		if ( isemailrequested ){}
		else {SetErrorBar( messages.MSG_PLEASE_REQUEST_EMAIL_VERIFY_CODE ) ; return }
		if(referral){}
		else { SetErrorBar( messages.MSG_PLEASE_INPUT + ' referer code' ); return }
		let respreferer = await axios.get( API.API_QUERY_REFERER + `/users/myreferercode/${referral}`)
		LOGGER('' , respreferer.data )
		let { status , respdata} = respreferer.data
		if ( status == 'OK' && respdata && respdata?.myreferercode ) {
		}
		else { SetErrorBar( messages.MSG_REFERER_CODE_INVALID ) ; return }
		axios.post( API.API_SIGNUP , {
			walletAddress 
			, email
			, password : pw  
			, referral 
		} ).then(resp=>{			LOGGER ( 'VrPcFLisLA' , resp.data )
			let { status }=resp.data
			if ( status == 'OK'){
				SetErrorBar( messages.MSG_DONE_REGISTERING )
				setTimeout(() => {
					navigate("/staking");
				}, TIME_PAGE_TRANSITION_DEF );
			} else { 
				SetErrorBar( messages.MSG_SERVER_ERR )
				return
			}
		})
    
/** 		const res = await signup(walletAddress, email, pw, referral);
    console.log(res);
    if (res) {
      dispatch(setLogin(walletAddress));
			localStorage.setItem( "walletAddress" , walletAddress);
			localStorage.setItem( "address" , walletAddress);
      SetErrorBar(res.message);
      navigate("/staking");
    }*/
  }

  useEffect(() => {
    if (email) {
      if (chkValidEmail(email)) setEmailAlarm();
      else setEmailAlarm("Please enter a valid email address.");
    } else {
      setEmailAlarm("");
    }
  }, [email]);

  useEffect(() => {
    if (pw && pwConfrim) {
      if (pw === pwConfrim) setPwAlarm("");
      else setPwAlarm("Passwords are not matching.");
    } else {
      setPwAlarm("");
    }
  }, [pw, pwConfrim]);

  if (isMobile)
    return (
      <MsignUpBox>
        <article className="topBar">
          <span className="blank" />

          <p className="title">Sign up</p>

          <button className="exitBtn" onClick={() => navigate(-1)}>
            <img src={I_x} alt="" />
          </button>
        </article>

        <ul className="inputList">
          <li>
            <p className="contTitle">Address</p>
            <div className="inputContainer">
              <div className="inputBox">
                <input style={{color:'#bbb'}}
                  type=""
                  value={ myaddress }
									disabled
									/>
              </div>
            </div>
          </li>
          <li>
            <p className="contTitle">Email</p>
            <div className="inputContainer">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Please enter your email address"
              />

              {emailAlarm && <p className="alarm">{emailAlarm}</p>}

              <button
                className="registrationBtn"
                onClick={clickRegistrationBtn}
              >
                Registration
              </button>
            </div>
          </li>

          <li>
            <p className="contTitle">Password</p>
            <div className="inputContainer">
              <div className="inputBox">
                <input 
                  type=""
                  value={pw}
                  onChange={(e) => setPw(e.target.value)}
                  placeholder="Password"
                />
              </div>
            </div>
          </li>

          <li>
            <p className="contTitle">Confirm Password</p>
            <div className="inputContainer">
              <div className="inputBox">
                <input
                  type="password"
                  value={pwConfrim}
                  onChange={(e) => setPwConfirm(e.target.value)}
                  placeholder="Password confirmation"
                />
              </div>

              {pwAlarm && <p className="alarm">{pwAlarm}</p>}
            </div>
          </li>

          <li>
            <p className="contTitle">Referrals</p>
            <div className="inputContainer">
              <div className="inputBox">
                <input
                  value={referral}
                  onChange={(e) => setReferal(e.target.value)}
									placeholder="Friend Recommendation"									
                />
              </div>
            </div>
          </li>
        </ul>

        <ul className="agreeList">
          <li>
            <button
              className={agreeList[0] ? "chkBtn on" : "chkBtn"}
							onClick={() => onClickAgreeList(0)}
							style={{transform:'scale(3,3)'}}
            >
              <img src={I_chkWhite} alt="" />
            </button>
            <p>
              Subscribe{" "}
              <u onClick={() => navigate("/term")}>Terms of Service</u>{" "}
              &#40;required&#41;
            </p>
          </li>

          <li>
            <button
              //className="chkBtn"
              className={agreeList[1] ? "chkBtn on" : "chkBtn"}
              onClick={() => onClickAgreeList(1)}
            >
              <img src={I_chkWhite} alt="" />
            </button>
            <p>
              Personal lnformation Collection and Usage Agreement
              &#40;required&#41;
            </p>
          </li>
        </ul>

        <ul className="btnBox">
          <button className="cancelBtn" onClick={() => navigate("/")}>
            Cancel
          </button>
          <button
            className="confirmBtn"
            disabled={disableConfirm}
            onClick={onClickSignUpBtn}
          >
            Sign up
          </button>
        </ul>
      </MsignUpBox>
    );
  else
    return (
      <PsignUpPopupBox>
        <p className="title">Sign up</p>

        <ul className="inputList">
          <li>
            <p className="contTitle">Address</p>
            <div className="inputContainer">
              <div className="inputBox">
                <input style={{color:'#bbb'}}
                  type=""
                  value={ myaddress }
									disabled
									/>
              </div>
            </div>
          </li>

          <li>
            <p className="contTitle">Email</p>
            <div className="inputContainer">
              <div className="inputBox">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Please enter your email address"
                  disabled={mailcheck}
                />

                {pending?(<button>{mailcheck?"VERIFIED":"PENDING"}</button>):(<button
                  className="registrationBtn"
                  onClick={clickRegistrationBtn }
                >
                  Registration
                </button>)}
              </div>

              {emailAlarm && <p className="alarm">{emailAlarm}</p>}
            </div>
          </li>

          <li>
            <p className="contTitle">Password</p>
            <div className="inputContainer">
              <div className="inputBox">
                <input
                  type="password"
                  value={pw}
                  onChange={(e) => setPw(e.target.value)}
                  placeholder="Password"
                />
              </div>
            </div>
          </li>

          <li>
            <p className="contTitle">Password</p>
            <div className="inputContainer">
              <div className="inputBox">
                <input
                  type="password"
                  value={pwConfrim}
                  onChange={(e) => setPwConfirm(e.target.value)}
                  placeholder="Password confirmation"
                />
              </div>

              {pwAlarm && <p className="alarm">{pwAlarm}</p>}
            </div>
          </li>

          <li>
            <p className="contTitle">Referrals</p>
            <div className="inputContainer">
              <div className="inputBox">
                <input
                  value={referral}
                  onChange={(e) => setReferal(e.target.value)}
                  placeholder="Friend Recommendation"
                />
              </div>
            </div>
          </li>
        </ul>

        <ul className="agreeList">
          <li>
            <button
              className={agreeList[0] ? "chkBtn on" : "chkBtn"}
              onClick={() => onClickAgreeList(0)}
            >
              <img src={I_chkWhite} alt="" />
            </button>
            <p>
              Subscribe{" "}
              <u onClick={() => navigate("/term")}>Terms of Service</u>{" "}
              &#40;required&#41;
            </p>
          </li>

          <li>
            <button
              //className="chkBtn"
              className={agreeList[1] ? "chkBtn on" : "chkBtn"}
              onClick={() => onClickAgreeList(1)}
            >
              <img src={I_chkWhite} alt="" />
            </button>
            <p>
              Personal lnformation Collection and Usage Agreement
              &#40;required&#41;
            </p>
          </li>
        </ul>

        <ul className="btnBox">
          <button className="cancelBtn" onClick={() => {
						navigate("/")}						
					}>
            Cancel
          </button>
          <button
            className="confirmBtn"
            disabled={disableConfirm}
            onClick={onClickSignUpBtn}
          >
            Sign up
          </button>
        </ul>
      </PsignUpPopupBox>
    );
}

const MsignUpBox = styled.section`
  display: flex;
  flex-direction: column;
  padding: 0 0 9.44vw 0;

  .topBar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 56px;
    padding: 0 15px;

    .blank,
    .exitBtn img {
      width: 15px;
    }

    .title {
      font-size: 16px;
      font-weight: 600;
      line-height: 16px;
    }
  }

  .inputList {
    display: flex;
    flex-direction: column;
    gap: 6.66vw;
    padding: 8.33vw 5.55vw 0 5.55vw;

    li {
      display: flex;
      flex-direction: column;
      gap: 4.44vw;

      .contTitle {
        font-size: 4.44vw;
        font-weight: 600;
      }

      .inputContainer {
        display: flex;
        flex-direction: column;

        input {
          width: 100%;
          height: 12.22vw;
          padding: 0 4.44vw;
          font-size: 4.44vw;
          border: 1px solid #d9d9d9;
          border-radius: 3.33vw;

          &::placeholder {
            color: #d9d9d9;
          }
        }

        .registrationBtn {
          height: 12.22vw;
          margin: 1.66vw 0 0 0;
          font-size: 5vw;
          font-weight: 500;
          color: #fff;
          background: #000;
          border-radius: 3.33vw;
        }

        .alarm {
          margin: 2.77vw 0;
          font-size: 3.88vw;
          color: #ff5050;
        }
      }
    }
  }

  .agreeList {
    display: flex;
    flex-direction: column;
    gap: 3.61vw;
    margin: 7.22vw 0 0 0;
    padding: 0 5.55vw;

    li {
      display: flex;
      align-items: center;
      gap: 3.88vw;
      font-size: 3.88vw;
      line-height: 3.88vw;

      .chkBtn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 6.11vw;
        height: 6.11vw;
        padding: 1vw;
        border: 1px solid #000;
        border-radius: 1.11vw;

        &.on {
          background: #000;
        }

        img {
          width: 100%;
        }
      }

      p {
        flex: 1;
      }
    }
  }

  .btnBox {
    display: flex;
    gap: 24px;
    margin: 8.33vw 0 0 0;
    padding: 0 5.55vw;

    button {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 13.88vw;
      font-size: 4.44vw;
      font-weight: 500;
      border-radius: 3.33vw;

      &.cancelBtn {
        border: 1.4px solid #000000;
      }

      &.confirmBtn {
        color: #fff;
        background: #000;

        &:disabled {
          background: #aaa;
          cursor: not-allowed;
        }
      }
    }
  }
`;

const PsignUpPopupBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 44px;
  width: 720px;
  padding: 60px 50px 70px;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: fixed;
  z-index: 6;

  .title {
    font-size: 24px;
    font-weight: 600;
    line-height: 36px;
    text-align: center;
  }

  .inputList {
    display: flex;
    flex-direction: column;
    gap: 30px;

    li {
      display: flex;
      flex-direction: column;
      gap: 14px;

      .contTitle {
        font-size: 18px;
        font-weight: 600;
        line-height: 27px;
      }

      .inputContainer {
        display: flex;
        flex-direction: column;
        gap: 10px;

        .inputBox {
          display: flex;
          align-items: center;
          gap: 20px;

          input {
            flex: 1;
            height: 44px;
            padding: 0 16px;
            font-size: 16px;
            border: 1px solid #d9d9d9;
            border-radius: 12px;

            &::placeholder {
              color: #d9d9d9;
            }
          }

          .registrationBtn {
            height: 44px;
            padding: 0 20px;
            font-size: 18px;
            font-weight: 500;
            color: #fff;
            background: #000;
            border-radius: 12px;
          }
        }

        .alarm {
          font-size: 16px;
          color: #ff5050;
        }
      }
    }
  }

  .agreeList {
    display: flex;
    flex-direction: column;
    gap: 12px;

    li {
      display: flex;
      align-items: center;
      gap: 14px;

      font-size: 16px;
      line-height: 16px;

      .chkBtn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 22px;
        height: 22px;
        border: 1px solid #000;
        border-radius: 4px;

        &.on {
          background: #000;
        }
      }

      p {
        u {
          cursor: pointer;
        }
      }
    }
  }

  .btnBox {
    display: flex;
    gap: 24px;

    button {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 60px;
      font-size: 20px;
      font-weight: 500;
      border-radius: 12px;

      &.cancelBtn {
        border: 1.4px solid #000000;
      }

      &.confirmBtn {
        color: #fff;
        background: #000;

        &:disabled {
          background: #aaa;
          cursor: not-allowed;
        }
      }
    }
  }
`;
