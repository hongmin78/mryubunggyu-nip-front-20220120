import styled from "styled-components";
import I_x from "../img/icon/I_x.svg";
import I_tIcon from "../img/icon/I_tIcon.png";
import I_chkWhite from "../img/icon/I_chkWhite.svg";
import { putCommaAtPrice } from "../util/Util";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import PopupBg from "./PopupBg";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { getabistr_forfunction, query_with_arg } from '../util/contract-calls'
import { addresses } from "../configs/addresses";
import {MIN_STAKE_AMOUNT} from '../configs/configs'
import { LOGGER, getmyaddress
	, getobjtype
} from "../util/common";
import { getweirep , getethrep } from '../util/eth'
import { requesttransaction } from '../services/metamask'
import SetErrorBar from "../util/SetErrorBar";
import { messages } from "../configs/messages";
import { API } from '../configs/api'
import awaitTransactionMined from "await-transaction-mined";
import { web3 } from '../configs/configweb3'
import { TX_POLL_OPTIONS } from '../configs/configs'
import I_spinner from '../img/icon/I_spinner.svg'
import { strDot } from '../util/Util'
export default function StakingPopup({ off }) {
  const navigate = useNavigate();
  const isMobile = useSelector((state) => state.common.isMobile);
	const [ termChk , setTermChk] = useState(false);
	let [ myaddress , setmyaddress ] = useState(getmyaddress() )
	let [ mybalance , setmybalance]= useState()
	let [ isallowanceok , setisallowanceok] = useState( false )
	let [ allowanceamount , setallowanceamount ] = useState()
	let [ stakedbalance , setstakedbalance ] = useState()
	useEffect(_=>{
		const fetchdata=async _=>{
			axios.get( API.API_TICKERS ).then(resp=>{ LOGGER('MDmEMQ5xde' , resp.data )
				let { status , payload }=resp

			})
			let myaddress = getmyaddress()
			LOGGER( '' , addresses.contract_stake , myaddress )
			let resp_balances = await query_with_arg ({
					contractaddress : addresses.contract_stake
				, abikind : 'STAKE'
				, methodname : '_balances'
				, aargs : [ myaddress
				]
			})
			LOGGER( 'uQJ2POHvP8' , resp_balances )
			setstakedbalance ( resp_balances )
			
			query_with_arg ({contractaddress : addresses.contract_USDT
				, abikind : 'ERC20'
				, methodname : 'allowance'
				, aargs : [ myaddress 
					, addresses.contract_stake
				] 
			} ).then(resp=>{
				let allowanceineth =  getethrep( resp )
				LOGGER( '' , resp , allowanceineth )
				setallowanceamount ( allowanceineth )
				if ( allowanceineth > 0){ setisallowanceok ( false )				
				}
				else {}
			})
			query_with_arg ({contractaddress : addresses.contract_USDT
				, abikind : 'ERC20'
				, methodname : 'balanceOf'
				, aargs : [ myaddress ]
			}).then(resp=>{
				LOGGER( '' , resp , )
				setmybalance( getethrep(resp ) )
			})
		}
		fetchdata()
	} , [] )
	const onclick_approve=async _=>{ LOGGER( '' )
		let myaddress = getmyaddress()
		let abistr = getabistr_forfunction ({
			contractaddress : addresses.contract_USDT
			, abikind : 'ERC20'
			, methodname : 'approve'
			, aargs : [
				addresses.contract_stake
				, getweirep('' +10**10 )
			]
		})
		LOGGER('' , abistr )
		requesttransaction({
			from : myaddress
			, to : addresses.contract_USDT
			, data : abistr
		}).then(resp=>{
			if ( resp ){}
			else { SetErrorBar( messages.MSG_USER_DENIED_TX ) ; return }
			let txhash=resp
			SetErrorBar( messages.MSG_TX_REQUEST_SENT )
			awaitTransactionMined
			.awaitTx( web3 , txhash, TX_POLL_OPTIONS )
			.then((minedtxreceipt) => {
				LOGGER("", minedtxreceipt);
				SetErrorBar( messages.MSG_TX_FINALIZED )
//					Setisloader(false);
			})
		})
	}
	const onclick_buy=async _=>{LOGGER( 'YFVGAF0sBJ' )
		let myaddress = getmyaddress()
		LOGGER( 'eYJAgMYkR5' , myaddress )
/** 		if (myaddress){}
		else { 
			SetErrorBar( messages.MSG_PLEASE_ CONNECT_WALLET )
			return 
		} */
		let abistr = getabistr_forfunction( {
			contractaddress : addresses.contract_stake
			, abikind : 'STAKE'
			, methodname : 'stake'
			, aargs : [
					addresses.contract_USDT
				, getweirep( '' + MIN_STAKE_AMOUNT )
				, myaddress
			]
		})
		LOGGER( '' , abistr )
//		return
//		return
		const callreqtx=async _=>{
			let resp = await requesttransaction ( {
				from : myaddress
				, to : addresses.contract_stake
				, data : abistr
	//			, value : ''
			})
			let resptype = getobjtype ( resp )
			let txhash
			switch ( resptype ){
				case 'String' :
					txhash = resp 
				break 
				case 'Object' :
					txhash = resp.txHash
				break
			}			
			axios.post ( API.API_TXS + `/${txhash}` , { txhash
				, username : myaddress
				, typestr : 'STAKE'
				, auxdata : ''
			} ).then(resp=>{ LOGGER( '' , resp )
				SetErrorBar ( messages.MSG_TX_REQUEST_SENT )
			} )
		}
		callreqtx()
//		.then(resp=>{ LOGGER( '' , resp )		}) 
	}

  if (isMobile)
    return (
      <>
        <MstakingPopupBox>
          <article className="topBar">
            <span className="blank" />
            <p className="title">Stake</p>
            <button className="exitBtn" onClick={() => navigate(-1)}>
              <img src={I_x} alt="" />
            </button>
          </article>

          <article className="contBox">
            <div className="infoBox">
              <div className="coinBox">
                <span className="coinImgBox">
                  <img src={I_tIcon} alt="" />
                </span>

                <ul className="priceList">
                  <li className="price">100 USDT</li>
                  <li className="exchange">${putCommaAtPrice(2115222)}</li>
                </ul>
              </div>

              <ul className="dataList">
                <li>
                  <p className="key">Calculation</p>
                  <p className="value">2022-01-11 00:00 UTC</p>
                </li>
                <li>
                  <p className="key">Distribution</p>
                  <p className="value">2022-03-12 00:00 UTC</p>
                </li>
                <li>
                  <p className="key">Total Staked</p>
                  <p className="value">10 USDT</p>
                </li>
								<li>
	                <p className="key">your address</p>
  	              <p className="value">{ strDot(myaddress , 6 , 0 ) }</p>
    	          </li>
								<li>
									<p className="key">Your USDT balance</p>
                  <p className="value">{mybalance} USDT</p>
								</li>
								<li>
									<p className="key">Allowance</p>
                  <p className="value">{allowanceamount} USDT</p>
								</li>


              </ul>
            </div>

            <div className="confirmBox">
              <div className="termBox">
                <p className="key">Would you like to stake long term?</p>
                <span className="value">
                  <button className="yesBtn" onClick={() => setTermChk(true)}>
                    <span
                      className="chkBtn"
                      style={{
                        background: termChk && "#000",
                      }}
                    >
                      <img src={I_chkWhite} alt="" />
                    </span>
                    yes
                  </button>
                  <button className="noBtn" onClick={() => setTermChk(false)}>
                    <span
                      className="chkBtn"
                      style={{
                        background: !termChk && "#000",
                      }}
                    >
                      <img src={I_chkWhite} alt="" />
                    </span>
                    no
                  </button>
                </span>
              </div>

<div style={{ visibility:'hidden' }}>
              <button className="confirmBtn" onClick={() => {
								onclick_approve()
								false && navigate(-1)
							}}  >
                Approve
              </button>
</div>

<div>              <button className="confirmBtn" onClick={() => {
								onclick_buy()
								false && navigate(-1)
							}}>
                Confirm
								<img
          id="Spinner"
          className="spinner"
          src={I_spinner}
          alt=""
          style={{ display:  "block" }}
        />

              </button>
</div>							
            </div>
          </article>
        </MstakingPopupBox>
        <PopupBg blur />
      </>
    );
  else
    return (
      <PstakingPopupBox>
        <article className="topBar">
          <span className="blank" />
          <p className="title">Stake</p>
          <button className="exitBtn" onClick={() => off()}>
            <img src={I_x} alt="" />
          </button>
        </article>

        <article className="contBox">
          <div className="infoBox">
            <div className="coinBox">
              <span className="coinImgBox">
                <img src={I_tIcon} alt="" />
              </span>

              <ul className="priceList">
                <li className="price">100 USDT</li>
                <li className="exchange">${putCommaAtPrice(2115222)}</li>
              </ul>
            </div>

            <ul className="dataList">
              <li>
                <p className="key">Calculation</p>
                <p className="value">2022-01-11 00:00 UTC</p>
              </li>
              <li>
                <p className="key">Distribution</p>
                <p className="value">2022-03-12 00:00 UTC</p>
              </li>
              <li>
                <p className="key">Total Staked</p>
                <p className="value">10 USDT</p>
              </li>
              <li>
                <p className="key">your address</p>
                <p className="value">{strDot(myaddress , 8, 0 ) } </p>
              </li>
							<li>
									<p className="key">Your USDT balance</p>
                  <p className="value">{mybalance} USDT</p>
							</li>
							<li>
									<p className="key">Allowance</p>
                  <p className="value">{allowanceamount} USDT</p>
								</li>

            </ul>
          </div>

          <div className="confirmBox">
            <div className="termBox">
              <p className="key">Would you like to stake long term?</p>
              <span className="value">
                <button className="yesBtn" onClick={() => { setTermChk(true) } }>
                  <span
                    className="chkBtn"
                    style={{
                      background: termChk && "#000",
                    }}
                  >
                    <img src={I_chkWhite} alt="" />
                  </span>
                  yes
                </button>
                <button className="noBtn" onClick={() => setTermChk(false)}>
                  <span
                    className="chkBtn"
                    style={{
                      background: !termChk && "#000",
                    }}
                  >
                    <img src={I_chkWhite} alt="" />
                  </span>
                  no
                </button>
              </span>
            </div>

              <button className="confirmBtn" onClick={() => {
								onclick_approve()								
							}}>
                Approve
              </button>

						<button className="confirmBtn" onClick={() => { 
							onclick_buy()
							false && off()
						} } >
              Confirm
            </button>
          </div>
        </article>
      </PstakingPopupBox>
    );
}

const MstakingPopupBox = styled.section`
  width: 88.88vw;
  border-radius: 20px;
  background: #fff;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: fixed;
  z-index: 6;
  overflow: hidden;

  .topBar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 15.55vw;
    padding: 0 5.55vw;

    .title {
      font-size: 5vw;
      font-weight: 600;
      line-height: 5vw;
    }

    .blank,
    .exitBtn img {
      width: 4.44vw;
    }
  }

  .contBox {
    display: flex;
    flex-direction: column;
    gap: 4.44vw;
    padding: 3.61vw 5.55vw 7.77vw 5.55vw;

    * {
      font-family: "Roboto", sans-serif;
    }

    .infoBox {
      display: flex;
      flex-direction: column;
      gap: 4.16vw;

      .coinBox {
        display: flex;
        align-items: center;
        gap: 4.16vw;
        height: 24.44vw;
        padding: 0 4.72vw;
        background: #f6f6f6;
        border-radius: 3.33vw;

        .coinImgBox {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 13.88vw;
          height: 13.88vw;
          padding: 3.61vw;
          border-radius: 50%;
          background: #fff;
          box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);

          img {
            width: 100%;
            object-fit: contain;
          }
        }

        .priceList {
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-size: 5vw;
          line-height: 5vw;

          .price {
            font-weight: 600;
          }

          .exchange {
            font-weight: 500;
            color: #7a7a7a;
          }
        }
      }

      .dataList {
        display: flex;
        flex-direction: column;
        gap: 3.61vw;
        font-size: 4.44vw;
        font-weight: 500;
        color: #7a7a7a;

        li {
          display: flex;
          flex-direction: column;
          gap: 0.8vw;

          .key {
            color: #aeaeae;
          }
        }
      }
    }

    .confirmBox {
      display: flex;
      flex-direction: column;
      gap: 20px;

      .termBox {
        display: flex;
        flex-direction: column;
        gap: 4.44vw;

        * {
          font-size: 4.44vw;
          line-height: 4.44vw;
        }

        .value {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 5vw;

          button {
            display: flex;
            align-items: center;
            gap: 6px;

            .chkBtn {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 6.11vw;
              height: 6.11vw;
              border: 1.4px solid #000;
              border-radius: 1.11vw;
            }
          }
        }
      }

      .confirmBtn {
        height: 13.88vw;
        font-size: 5.55vw;
        font-weight: 500;
        color: #fff;
        background: #000;
        border-radius: 3.33vw;
      }
    }
  }
`;

const PstakingPopupBox = styled.section`
  width: 540px;
  border-radius: 20px;
  background: #fff;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: fixed;
  z-index: 6;

  .topBar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 72px;
    padding: 0 30px;

    .title {
      font-size: 24px;
      font-weight: 600;
      line-height: 24px;
    }

    .blank,
    .exitBtn {
      width: 22px;
    }
  }

  .contBox {
    display: flex;
    flex-direction: column;
    gap: 80px;
    padding: 40px;

    * {
      font-family: "Roboto", sans-serif;
    }

    .infoBox {
      display: flex;
      flex-direction: column;
      gap: 24px;

      .coinBox {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 104px;
        padding: 0 26px;
        background: #f6f6f6;
        border-radius: 12px;

        .coinImgBox {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 68px;
          height: 68px;
          padding: 15px;
          border-radius: 50%;
          background: #fff;
          box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);

          img {
            width: 100%;
            object-fit: contain;
          }
        }

        .priceList {
          display: flex;
          flex-direction: column;
          text-align: end;
          gap: 6px;
          font-size: 20px;
          line-height: 20px;

          .price {
            font-weight: 600;
          }

          .exchange {
            font-weight: 500;
            color: #7a7a7a;
          }
        }
      }

      .dataList {
        display: flex;
        flex-direction: column;
        gap: 8px;
        font-size: 18px;
        font-weight: 500;
        color: #7a7a7a;

        li {
          display: flex;
          justify-content: space-between;
        }
      }
    }

    .confirmBox {
      display: flex;
      flex-direction: column;
      gap: 20px;

      .termBox {
        display: flex;
        align-items: center;
        gap: 10px;

        * {
          font-size: 18px;
          line-height: 18px;
        }

        .value {
          display: flex;
          gap: 18px;
          align-items: center;

          button {
            display: flex;
            align-items: center;
            gap: 6px;

            .chkBtn {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 22px;
              height: 22px;
              border: 1.4px solid #000;
              border-radius: 4px;
            }
          }
        }
      }

      .confirmBtn {
        height: 60px;
        font-size: 20px;
        font-weight: 500;
        color: #fff;
        background: #000;
        border-radius: 12px;
      }
    }
  }
`;