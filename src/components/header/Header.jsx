import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import HeaderPopup from "../../components/HeaderPopup";
import I_headerLogo from "../../img/icon/I_headerLogo.png";
import I_headerLogoM from "../../img/icon/I_headerLogoM.png";
import I_headerLogoWhite from "../../img/icon/I_headerLogoWhite.png";
import axios from "axios";
import I_3line from "../../img/icon/I_3line.svg";
import I_3lineWhite from "../../img/icon/I_3lineWhite.svg";
import { get_contractaddress, strDot } from "../../util/Util";
import MmenuPopup from "./MmenuPopup";
import { query_with_arg } from "../../util/contract-calls";
import { LOGGER, getmyaddress } from "../../util/common";
import { getethrep } from "../../util/eth";
import { API } from "../../configs/api";
import SetErrorBar from "../../util/SetErrorBar.js";
import { messages } from "../../configs/messages";
import { net } from "../../configs/net";
import { addresses } from "../../configs/addresses-ropsten";

export default function Header() {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  let isStaking = pathname.indexOf("/staking") !== -1;
  const isMobile = useSelector((state) => state.common.isMobile);
  const isLogin = useSelector((state) => state.common.isLogin);
  const isAddress = useSelector((state) => state.common.address);
  let [isstaked, setisstaked] = useState(false);
  let address = useSelector((state) => state.common.address);
  const [headerPopup, setHeaderPopup] = useState(false);
  const [menuPopup, setMenuPopup] = useState(false);
  let [mybalance, setmybalance] = useState();
  let [myaddress, setmyaddress] = useState();
  const [ticketInfo, setTickInfo] = useState();
  const [walletStatus, setWalletStatus] = useState("");
  const [contractaddresses, setContractaddresses] = useState([]);

  const query_contractaddresses = async () => {
    return new Promise(async (res, rej) => {
      try {
        let { data } = await axios.get(API.API_CADDR);
        let { status, list } = data;
        if (status == "OK") {
          setContractaddresses(list);
          res(list);
        } else {
          rej("Failed to fetch contractaddresses");
        }
      } catch (err) {
        console.error(err);
      }
    });
  };

  useEffect(() => {
    // setTimeout(() => {
    // let myaddress = "0xb440393a03078b967000f09577e32c3252f15832";
    let myaddress = getmyaddress();
    if (myaddress) {
    } else {
      return;
    }
    axios
      .get(API.API_GET_TICK_INFO + `/${myaddress}?nettype=${net}`)
      .then((resp) => {
        let { status, respdata } = resp.data;
        if (status == "OK" && respdata !== null) {
          setTickInfo(respdata);
          awaitWallet();
        }
      });
    // }, 1000);
  }, []);

  const awaitWallet = () => {
    // let myaddress = "0xb440393a03078b967000f09577e32c3252f15832";
    // setTimeout(() => {
    let myaddress = getmyaddress();
    if (myaddress) {
      return;
    } else {
      setWalletStatus("Connect Wallet");
    }
    // }, 1500);
    setWalletStatus("Connecting...");
  };

  const fetchdataStaked = async () => {
    // let myaddress = "0xb440393a03078b967000f09577e32c3252f15832";
    let myaddress = getmyaddress();
    if (myaddress) {
    } else {
      return;
    }
    LOGGER("", myaddress);
    let resp = await axios.get(
      API.API_USERINFO + `/${myaddress}?nettype=${net}`
    );
    LOGGER("rBojncz0CD", resp.data);
    let { status, respdata } = resp.data;
    if (status == "OK") {
      setisstaked(respdata.isstaked ? true : false);
    }
  };
  const fetchdata = (_) => {
    query_contractaddresses().then(async (resp) => {
      // let myaddress = "0xb440393a03078b967000f09577e32c3252f15832";
      let myaddress = getmyaddress();
      if (myaddress) {
      } else {
        return;
      }
      LOGGER("MXZfykw8Mw", myaddress);
      setmyaddress(myaddress);
      if (myaddress) {
        query_with_arg({
          contractaddress: addresses.contract_USDT, // ETH_TESTNET.
          abikind: "ERC20",
          methodname: "balanceOf",
          aargs: [myaddress],
        }).then((resp) => {
          console.log("RESPONSE-BALANCE", resp);
          setmybalance(getethrep("" + resp));
        });

        window.ethereum.on("networkChanged", function (networkId) {
          LOGGER("", networkId);
          // Time to reload your interface with the new networkId
        });
      } else {
        return;
      }
    });
  };

  useEffect(
    (_) => {
      console.log("$ISLOGIN", isLogin);
      fetchdataStaked();
      fetchdata();
      awaitWallet();
    },
    [isLogin, address]
  );

  console.log("mybalance", mybalance);

  const onclick_staked_val_btn = (currentValue) => {
    if (ticketInfo) {
      navigate(currentValue);
    } else {
      SetErrorBar("You need purchased lucky ticket");
    }
  };

  if (isMobile) {
    return (
      <>
        <MheaderBox style={{ background: isStaking && "unset" }}>
          <button className="logoBox" onClick={() => navigate("/")}>
            <img
              className="logoImg"
              src={isStaking ? I_headerLogoWhite : I_headerLogo}
              alt=""
            />
          </button>

          <button className="menuBtn" onClick={() => setMenuPopup(true)}>
            <img src={isStaking ? I_3lineWhite : I_3line} alt="" />
          </button>
        </MheaderBox>

        {menuPopup && (
          <MmenuPopup
            off={setMenuPopup}
            mybalance={mybalance}
            ticketInfo={ticketInfo}
          />
        )}
      </>
    );
  } else {
    return (
      <PheaderBox style={{ background: isStaking && "unset" }}>
        <section className="innerBox">
          <button className="logoBox" onClick={() => navigate("/")}>
            <img
              className="logoImg"
              src={isStaking ? I_headerLogoWhite : I_headerLogo}
              alt=""
            />
          </button>

          <article className="rightBox">
            <nav>
              <button
                style={{ color: isStaking && "#fff" }}
                onClick={() => {
                  navigate("/staking");
                }}
              >
                Lucky Ticket
              </button>
              <button
                style={{ color: isStaking && "#fff" }}
                onClick={() => {
                  onclick_staked_val_btn("/auction");
                }}
              >
                Subscription Auction
              </button>
              <button
                style={{ color: isStaking && "#fff" }}
                onClick={() => {
                  navigate("/market");
                }}
              >
                Marketplace
              </button>
              {/* <button
                style={{ color: isStaking && "#fff" }}
                onClick={() => {
                  // onclick_staked_val_btn("/employment");
                  navigate("/employment");
                  // SetErrorBar("Will soon");
                }}
              >
                Employment
              </button> */}
            </nav>

            {/**  <button className='menuBtn' >
		      <span className='balanceBox'>Switch network</span></button>*/}
            {isLogin ? (
              <div
                className="menuBtn"
                style={{
                  color: isStaking && "#000",
                  background: isStaking && "#fff",
                }}
                onClick={() => {
                  setHeaderPopup(!headerPopup);
                }}
              >
                <span className="balanceBox">
                  <p className="price">{mybalance ? mybalance : "..."}</p>
                  <p className="unit">{mybalance && "USDT"}</p>
                </span>

                <span
                  className="address"
                  style={{
                    background: isStaking && "#f6f6f6",
                  }}
                >
                  {strDot(isLogin, 8, 0)}
                </span>

                {headerPopup && <HeaderPopup />}
              </div>
            ) : (
              <div
                className="connectBtn"
                onClick={() => {
                  navigate("/connectwallet");
                }}
              >
                {myaddress ? strDot(myaddress, 8, 0) : walletStatus}
              </div>
            )}
          </article>
        </section>
      </PheaderBox>
    );
  }
}

const MheaderBox = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 72px;
  padding: 0 20px;
  background: #fff;
  top: 0;
  right: 0;
  left: 0;
  position: fixed;
  z-index: 4;

  .logoBox {
    .logoImg {
      height: 56px;
    }
  }
`;

const PheaderBox = styled.header`
  display: flex;
  justify-content: center;
  height: 100px;
  background: #fff;
  top: 0;
  right: 0;
  left: 0;
  position: fixed;
  z-index: 4;

  .innerBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1440px;
    @media screen and (max-width: 1440px) {
      padding: 0 20px;
    }

    .logoBox {
      .logoImg {
        height: 90px;
      }
    }

    .rightBox {
      display: flex;
      align-items: center;
      gap: 40px;

      & > nav {
        display: flex;
        gap: 30px;

        button {
          font-size: 18px;
          font-weight: 500;
        }
      }

      .menuBtn {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 14px;
        width: 290px;
        height: 54px;
        padding: 6px 6px 6px 24px;
        font-size: 18px;
        font-weight: 500;
        color: #fff;
        background: #000;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
        border-radius: 30px;
        position: relative;

        .balanceBox {
          display: flex;
          overflow: hidden;
          align-items: center;
          gap: 10px;

          .price {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }

        .address {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 130px;
          height: 100%;
          font-size: 18px;
          font-weight: 500;
          color: #000;
          background: #f6f6f6;
          border-radius: 30px;
        }
      }
    }

    .connectBtn {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 54px;
      padding: 0 24px;
      font-size: 18px;
      font-weight: 500;
      line-height: 18px;
      color: #fff;
      background: #000;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
      border-radius: 30px;
    }
  }
`;
