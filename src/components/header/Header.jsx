import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import HeaderPopup from "../../components/HeaderPopup";
import I_headerLogo from "../../img/icon/I_headerLogo.png";
import I_headerLogoM from "../../img/icon/I_headerLogoM.png";
import I_headerLogoWhite from "../../img/icon/I_headerLogoWhite.png";

import I_3line from "../../img/icon/I_3line.svg";
import I_3lineWhite from "../../img/icon/I_3lineWhite.svg";
import { strDot } from "../../util/Util";
import MmenuPopup from "./MmenuPopup";
import { query_with_arg } from "../../util/contract-calls";
import { LOGGER, getmyaddress } from "../../util/common";
import { addresses } from '../../configs/addresses'
import { getethrep } from "../../util/eth";

export default function Header() {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  let isStaking = pathname.indexOf("/staking") !== -1;
  const isMobile = useSelector((state) => state.common.isMobile);
	const isLogin = useSelector((state) => state.common.isLogin);
	let address = useSelector ( state => state.common.address )
  const [headerPopup, setHeaderPopup] = useState(false);
	const [menuPopup, setMenuPopup] = useState(false)
	let [ mybalance , setmybalance ] = useState()
	let [ myaddress , setmyaddress ] = useState()
/**  	useEffect(_=>{
		const spinner = document.querySelector("#Spinner");
    spinner.animate(
      [{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }],
      {        duration: 1000,
        iterations: Infinity,
      }
    )
	} , [] ) */
	useEffect(_=>{
		if( address ){} // isLogin
		else { return }
		const fetchdata = _=>{
			let myaddress = getmyaddress() ; LOGGER( 'MXZfykw8Mw' , myaddress )
			setmyaddress( myaddress )
			if ( myaddress){}
			else { return }
      console.log(addresses.contract_USDT, [myaddress]) // ETH_TESTNET.
			query_with_arg ({contractaddress : addresses.contract_USDT // ETH_TESTNET.
				, abikind : 'ERC20'
				, methodname : 'balanceOf'
				, aargs : [ myaddress 
			] } ).then(resp=>{LOGGER( 'Ce4mDMhjbS' , resp )
				setmybalance( getethrep ( resp ) )				
			})

			window.ethereum.on('networkChanged', function (networkId) { LOGGER( '' ,  networkId )
				// Time to reload your interface with the new networkId
			})
		}
		setTimeout(_=>{ 
			fetchdata()
		} , 3000 )
	} , [ isLogin , address ] )
  if (isMobile) {
    return (
      <>
        <MheaderBox style={{ background: isStaking && "unset" }}>
          <button className="logoBox" onClick={() => navigate("/")}>
            <img className="logoImg" src={I_headerLogoM} alt="" />
          </button>

          <button className="menuBtn" onClick={() => setMenuPopup(true)}>
            <img src={isStaking ? I_3lineWhite : I_3line} alt="" />
          </button>
        </MheaderBox>

        {menuPopup && <MmenuPopup off={setMenuPopup} />}
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
                onClick={() => navigate(`/staking`)}
              >
                Lucky Ticket
              </button>
              <button
                style={{ color: isStaking && "#fff" }}
                onClick={() => navigate("/auction")}
              >
                Subscription Auction
              </button>
              <button
                style={{ color: isStaking && "#fff" }}
                onClick={() => navigate("/market")}
              >
                Marketplece
              </button>
            </nav>

{/**  <button className='menuBtn' >
		<span className='balanceBox'>Switch network</span></button>*/}
            {isLogin ? (
              <button
                className="menuBtn"
                style={{
                  color: isStaking && "#000",
                  background: isStaking && "#fff",
                }}
                onClick={() => setHeaderPopup(!headerPopup)}
              >
                <span className="balanceBox">
                  <p className="price">{ mybalance }</p>
                  <p className="unit">USDT</p>
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
              </button>
            ) : (
              <button
                className="connectBtn"
								onClick={() => {	navigate("/connectwallet")

								} }
              >
                { myaddress ? strDot(myaddress , 8 , 0 )  : 'Connect Wallet' }
              </button>
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
        width: 280px;
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
          flex: 1;
          display: flex;
          overflow: hidden;

          .price {
            flex: 1;
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
