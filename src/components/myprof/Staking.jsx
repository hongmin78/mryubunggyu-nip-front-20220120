import styled from "styled-components";
import I_copy from "../../img/icon/I_copy.svg";
import I_circleChk from "../../img/icon/I_circleChk.svg";
import { D_recommendList } from "../../data/DmyPage";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { strDot } from "../../util/Util";
import {
  D_rewardHeader,
  D_rewardList,
  D_vaultHeader,
  D_vaultList,
  D_stakeHeader,
} from "../../data/Dstaking";
import { getmyaddress, LOGGER } from "../../util/common";
import axios from "axios";
import moment from "moment";
import { API } from "../../configs/api";
import ticketImg from "../../img/staking/E_prof1.png";
import { net } from "../../configs/net";
import {
  getabistr_forfunction,
  query_with_arg,
  query_noarg,
  query_eth_balance,
} from "../../util/contract-calls";
import { addresses } from "../../configs/addresses";
import { getweirep, getethrep } from "../../util/eth";
import SetErrorBar from "../../util/SetErrorBar";
import { requesttransaction } from "../../services/metamask";
import awaitTransactionMined from "await-transaction-mined";
import {
  TIME_FETCH_MYADDRESS_DEF,
  TX_POLL_OPTIONS,
} from "../../configs/configs";
import { web3 } from "../../configs/configweb3";
import { messages } from "../../configs/messages";
import { nettype } from "../../configs/configweb3-ropsten";

export default function Staking() {
  const isMobile = useSelector((state) => state.common.isMobile);
  const [toggleCode, setToggleCode] = useState(false);
  const [toggleLink, setToggleLink] = useState(false);
  const [ticketInfo, setItckInfo] = useState();
  const [totalClaimedReward, setTotalClaimedReward] = useState(0);
  const [totalMinted, setTotalMinted] = useState(0);
  let [spinner, setSpinner] = useState(false);
  let [myaddress, setmyaddress] = useState();
  let [claimbaleamount, setclaimbaleamount] = useState();
  let [claimedamount, setclaimedamount] = useState();
  let [kingkong_list, set_kingkong_list] = useState([]);
  let [staked_count, set_staked_count] = useState(0);
  const fatchData = async () => {
    let myaddress = getmyaddress();
    query_claimable_amount(myaddress);
    axios
      .get(API.API_GET_TICK_INFO + `/${myaddress}?nettype=${net}`)
      .then((resp) => {
        let { status, respdata } = resp.data;
        if (status == "OK" && respdata !== null) {
          setItckInfo([respdata]);
        }
      });
    try {
      let resp = await axios.get(
        API.API_ITEMBALANCES + `/${myaddress}?nettype=${net}`
      );
      let { list, status } = resp.data;
      console.log("__list", list);
      if (status == "OK") {
        let stakedcount = list.filter((el) => el.isstaked == 1);
        set_staked_count(stakedcount.length);
        set_kingkong_list(list);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fatchData();
  }, []);
  useEffect((_) => {
    let myaddress = getmyaddress();
    // query_claimable_amount(myaddress);
    query_claimed_reward();
    queryTotalMinted(myaddress);
  }, []);
  console.log("logsataasdasd", ticketInfo); //claim_nipcoin_reward

  const query_claimable_amount = (myaddress) => {
    query_with_arg({
      contractaddress: addresses.contract_kip17_staking,
      abikind: "KIP17Stake", //
      methodname: "query_claimable_amount",
      aargs: [myaddress],
    })
      .then((resp) => {
        LOGGER(`@query_claimable_amount`, resp);
        setclaimbaleamount((+getethrep(resp)).toFixed(4));
      })
      .catch(LOGGER);
  };
  const query_claimed_reward = (_) => {
    query_noarg({
      contractaddress: addresses.contract_kip17_staking,
      abikind: "KIP17Stake", //
      methodname: "query_claimed_reward",
    }).then((resp) => {
      LOGGER("@query_claimed_reward", getethrep(resp));
      setTotalClaimedReward((+getethrep(resp)).toFixed(4));
    });
  };

  const make_employ_tx = async (itemDetail, _status) => {
    let myaddress = getmyaddress();
    console.log("res", itemDetail); //    let msg;
    setSpinner(true);
    let { itemid, itemdata } = itemDetail;
    let options_arg = {
      withdraw: {
        contractaddress: addresses.contract_kip17_staking, // ETH_TESTNET.
        abikind: "KIP17Stake",
        methodname: _status,
        aargs: [addresses.contract_kip17, itemdata?.tokenid, myaddress], // .ETH_TESTNET
      },
      mint_deposit: {
        contractaddress: addresses.contract_kip17_staking, // ETH_TESTNET.
        abikind: "KIP17Stake",
        methodname: _status,
        aargs: [addresses.contract_kip17, itemid, 250], // .ETH_TESTNET
      },
    };
    console.log("__________asdfasdfaqwef", options_arg[_status]);

    let abistr = await getabistr_forfunction(options_arg[_status]);
    requesttransaction({
      from: myaddress,
      to: addresses.contract_kip17_staking, // ETH_TESTNET.
      data: abistr,
    }).then((resp) => {
      LOGGER("@txresp", resp);
      let txhash = resp;
      awaitTransactionMined
        .awaitTx(web3, txhash, TX_POLL_OPTIONS)
        .then(async (minedtxreceipt) => {
          LOGGER("minedtxreceipt", minedtxreceipt);
          let { status } = minedtxreceipt;
          if (status) {
          } else {
            SetErrorBar(messages.MSG_TX_FAILED);
            return;
          }
          SetErrorBar(messages.MSG_TX_FINALIZED);
          axios
            .post(API.API_TXS + `/${resp}?nettype=${nettype}`, {
              typestr: `${_status == "withdraw" ? "UN" : ""}EMPLOY_KINGKONG`,
              username: myaddress,
              itemid,
              contractaddress: addresses.contract_kip17_staking,
            })
            .then(async (_) => {
              window.location.reload();
            })
            .catch((err) => {
              console.log(err);
            }); //
        });
    });
  };
  //count mint ( kingkong )
  const queryTotalMinted = (myaddress) => {
    //    let myaddress = getmyaddress();
    if (myaddress) {
    } else {
      return;
    }
    console.log("asdasdasdsad", myaddress);
    query_with_arg({
      contractaddress: addresses.contract_kip17_staking,
      //      abikind: "STAK ING", // NFT
      abikind: "KIP17Stake", //
      methodname: "balanceOf",
      aargs: [myaddress],
    }).then((res) => {
      setTotalMinted(res);
      console.log("@total minted", res);
    });
  };

  //claim
  const onclickclaim = async () => {
    let myaddress = getmyaddress();
    if (myaddress) {
    } else {
      return;
    }
    // if (+totalClaimedReward > 0) {
    // } else {
    //   SetErrorBar("You dont have any Reward");
    //   return;
    // }
    const abistring = getabistr_forfunction({
      contractaddress: addresses.contract_kip17_staking,
      abikind: "KIP17Stake", // STAKING",
      methodname: "claim",
      aargs: [],
    });
    setSpinner(true);
    requesttransaction({
      from: myaddress,
      to: addresses.contract_kip17_staking,
      data: abistring,
      value: "0x00",
    }).then((res) => {
      console.log(res);
      if (res) {
      } else {
        SetErrorBar("User denied");
        setSpinner(false);
        return;
      }
      let txhash;
      txhash = res;
      awaitTransactionMined
        .awaitTx(web3, txhash, TX_POLL_OPTIONS)
        .then(async (minedtxreceipt) => {
          query_claimed_reward();
          console.log("minedtxreceipt", minedtxreceipt);
        });
      axios
        .post(API.API_TXS + `/${txhash}`, {
          txhash: res,
          username: myaddress,
          typestr: "CLAIM_KINGKONG_WAGE",
          amount: totalClaimedReward,
          auxdata: {
            toAmount: totalClaimedReward,
            rewardTokenContract: addresses.contract_reward_token, // contract_nip_token,
            rewardTokenSymbol: "NIP",
            nettype: net,
          },
        })
        .then((res) => {
          console.log("on click claim reported!", res);
        })
        .catch((err) => console.log(err));
    });
  };
  if (isMobile)
    return (
      <MstakingBox>
        <ul className="contList">
          <li className="vaultsBox">
            <strong className="contTitle">Vaults</strong>

            <div className="listBox">
              <ul className="list">
                {ticketInfo &&
                  ticketInfo.map((cont, index) => (
                    <li key={index}>
                      <div className="topBar">
                        <img src={ticketImg} alt="" />
                        <p>
                          {cont.active && cont.active === 1
                            ? "ACTIVE"
                            : "UNACTIVE"}
                        </p>
                      </div>

                      <ul className="dataList">
                        <li>
                          <p className="key">Staking Amount</p>
                          <p>{cont.price}&nbsp;USDT</p>
                        </li>
                        <li>
                          <p className="key">Start</p>
                          <p className="value">
                            {moment(cont.createdat).format(
                              "YYYY-MM-DD hh:mm:ss"
                            )}
                          </p>
                        </li>
                        <li>
                          <p className="key">Ended</p>
                          <p className="value">
                            {moment(cont.createdat)
                              .add(90, "day")
                              .format("YYYY-MM-DD hh:mm:ss")}
                          </p>
                        </li>
                      </ul>

                      <button className="unstakeBtn" onClick={() => {}}>
                        Unstake
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
          </li>

          {/* <li className="rewardBox">
            <strong className="contTitle">Earned Rewards</strong>

            <div className="listBox">
              <ul className="list">
                {ticketInfo &&
                  ticketInfo.map((cont, index) => (
                    <li key={index}>
                      <div className="topBar">
                        <img src={ticketImg} alt="" />
                        <p>{cont.active && cont.active === 1 ? "ACTIVE" : "UNACTIVE"}</p>
                      </div>

                      <ul className="dataList">
                        <li>
                          <p className="key">Staking Amount</p>
                          <p>{cont.amount}&nbsp;USDT</p>
                        </li>
                        <li>
                          <p className="key">Start</p>
                          <p className="value">{cont.cycle}</p>
                        </li>
                        <li>
                          <p className="key">Ended</p>
                          <span>{moment(cont.createdat).add(90, "day").format("YYYY-MM-DD hh:mm:ss")}</span>
                        </li>
                      </ul>

                      <button className="unstakeBtn" onClick={() => {}}>
                        Claim
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
          </li> */}
        </ul>
      </MstakingBox>
    );
  else
    return (
      <PstakingBox>
        <ul className="contList">
          <li className="vaultsBox">
            <strong className="contTitle">Staking Status</strong>

            <div className="listBox">
              <ul className="listHeader">
                {D_stakeHeader.map((cont, index) => (
                  <li key={index}>{cont}</li>
                ))}
              </ul>

              <ul className="list">
                <li>
                  <span style={{ marginLeft: 40 }}>
                    <p>{staked_count} NFT</p>
                  </span>
                  <span>
                    <p>{totalClaimedReward} Nips</p>
                  </span>
                  <span>{claimbaleamount}</span>
                  <button className="claimBtn" onClick={() => onclickclaim()}>
                    Claim
                  </button>
                </li>
              </ul>
            </div>
          </li>

          {/* <li className="rewardBox">
            <strong className="contTitle">Earned Rewards</strong>

            <div className="listBox">
              <ul className="listHeader">
                {D_rewardHeader.map((cont, index) => (
                  <li key={index}>{cont}</li>
                ))}
              </ul>

              <ul className="list">
                {D_rewardList.map((cont, index) => (
                  <li key={index}>
                    <span>
                      <img src={cont.img} alt="" />
                      <p>{cont.name}</p>
                    </span>

                    <span>
                      <p>{cont.amount}&nbsp;USDT</p>
                    </span>

                    <span>{cont.apy}%</span>

                    <span>{cont.cycle}</span>

                    <span>
                      <p>{cont.earned} NIP</p>
                      <button className="claimBtn" onClick={() => {}}>
                        Claim
                      </button>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </li> */}
        </ul>
        <ul className="contList">
          <li className="vaultsBox">
            <strong className="contTitle">Vaults</strong>

            <div className="listBox">
              <ul className="listHeader">
                {D_vaultHeader.map((cont, index) => (
                  <li key={index}>{cont}</li>
                ))}
              </ul>

              <ul className="list">
                {ticketInfo &&
                  ticketInfo?.map((cont, index) => (
                    <li key={index}>
                      <span>
                        <img src={ticketImg} alt="" />
                        <p>
                          {cont.active && cont.active === 1
                            ? "ACTIVE"
                            : "UNACTIVE"}
                        </p>
                      </span>

                      <span>
                        <p>{cont.price}&nbsp;USDT</p>
                      </span>

                      <span>{cont.createdat.split(".", 1)}</span>

                      <span>
                        {moment(cont.createdat)
                          .add(90, "day")
                          .format("YYYY-MM-DDThh:mm:ss")}
                      </span>

                      {/* <span>
                        <button className="unstakeBtn" onClick={() => {}}>
                          Unstake
                        </button>
                      </span> */}
                    </li>
                  ))}
              </ul>
              <ul className="list">
                {kingkong_list &&
                  kingkong_list?.map((cont, index) => (
                    <li key={index}>
                      <span>
                        <img src={cont.itemdata?.url} alt="" />
                        <p>
                          {cont.isstaked && cont.isstaked === 1
                            ? "ACTIVE"
                            : "UNACTIVE"}
                        </p>
                      </span>

                      <span>
                        <p>{cont.buyprice}&nbsp;USDT</p>
                      </span>

                      <span>{cont.createdat.split(".", 1)}</span>

                      <span>
                        {moment(cont.createdat)
                          .add(90, "day")
                          .format("YYYY-MM-DDThh:mm:ss")}
                      </span>

                      <span>
                        {cont.isstaked == 1 ? (
                          <button
                            className="unstakeBtn"
                            onClick={() => make_employ_tx(cont, "withdraw")}
                          >
                            Unemploy
                          </button>
                        ) : (
                          <button
                            className="unstakeBtn"
                            onClick={() => make_employ_tx(cont, "mint_deposit")}
                          >
                            Employ
                          </button>
                        )}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
          </li>

          {/* <li className="rewardBox">
            <strong className="contTitle">Earned Rewards</strong>

            <div className="listBox">
              <ul className="listHeader">
                {D_rewardHeader.map((cont, index) => (
                  <li key={index}>{cont}</li>
                ))}
              </ul>

              <ul className="list">
                {D_rewardList.map((cont, index) => (
                  <li key={index}>
                    <span>
                      <img src={cont.img} alt="" />
                      <p>{cont.name}</p>
                    </span>

                    <span>
                      <p>{cont.amount}&nbsp;USDT</p>
                    </span>

                    <span>{cont.apy}%</span>

                    <span>{cont.cycle}</span>

                    <span>
                      <p>{cont.earned} NIP</p>
                      <button className="claimBtn" onClick={() => {}}>
                        Claim
                      </button>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </li> */}
        </ul>
      </PstakingBox>
    );
}

const MstakingBox = styled.section`
  padding: 9.16vw 5.55vw 0 5.55vw;

  .contList {
    display: flex;
    flex-direction: column;
    gap: 9.44vw;

    & > li {
      display: flex;
      flex-direction: column;
      gap: 4.44vw;

      .contTitle {
        font-size: 5vw;
      }

      .listBox {
        border-radius: 3.33vw;
        box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
        overflow: hidden;

        * {
          font-family: "Roboto", sans-serif;
        }

        .list {
          padding: 5.55vw;

          & > li {
            display: flex;
            flex-direction: column;
            gap: 5.55vw;
            padding-bottom: 6.66vw;

            &:nth-of-type(n + 2) {
              padding-top: 6.66vw;
              border-top: 1px solid #d9d9d9;
            }

            .topBar {
              display: flex;
              align-items: center;
              gap: 2.77vw;
              font-size: 4.44vw;

              img {
                width: 13.88vw;
                height: 13.88vw;
                border-radius: 50%;
                object-fit: cover;
              }
            }

            .dataList {
              display: flex;
              flex-direction: column;
              gap: 3.33vw;

              li {
                display: flex;
                justify-content: space-between;
                font-size: 3.88vw;

                .key {
                  font-weight: 600;
                }
              }
            }

            .unstakeBtn {
              height: 13.88vw;
              font-size: 5vw;
              font-weight: 500;
              color: #fff;
              border-radius: 3.33vw;
              background: #000;
            }
          }
        }
      }
    }
  }
`;

const PstakingBox = styled.section`
  padding: 60px 0 0 0;

  .contList {
    display: flex;
    flex-direction: column;
    gap: 44px;
    margin: 14px 0 0 0;

    & > li {
      display: flex;
      flex-direction: column;
      gap: 24px;

      .contTitle {
        font-size: 18px;
      }

      .listBox {
        * {
          font-family: "Roboto", sans-serif;
        }
        box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.16);
        border-radius: 20px;
        overflow: hidden;

        .listHeader {
          display: flex;
          align-items: center;
          height: 55px;
          padding: 0 20px;
          font-weight: 600;
        }

        .list {
          li {
            display: flex;
            align-items: center;
            height: 104px;
            padding: 0 20px;
            font-weight: 500;
            border-top: 1px solid #d9d9d9;
          }
        }

        .listHeader li,
        .list li span {
          display: flex;
          align-items: center;
          font-size: 18px;

          &:nth-of-type(1) {
            width: 288px;
            gap: 14px;

            img {
              width: 68px;
              height: 68px;
              border-radius: 50%;
              object-fit: cover;
            }
          }
          &:nth-of-type(2) {
            width: 220px;
          }

          &:nth-of-type(4) {
            width: 255px;
          }
        }
      }

      &.vaultsBox {
        .listBox {
          .listHeader li,
          .list li span {
            &:nth-of-type(3) {
              width: 255px;
              margin-left: 50px;
            }

            &:nth-of-type(5) {
              flex: 1;
              justify-content: flex-end;

              button {
                width: 162px;
                height: 50px;
                font-size: 18px;
                font-weight: 600;
                border-radius: 12px;
                color: #fff;
                background: #000;
              }
            }
          }
        }
      }
      .claimBtn {
        width: 300px;
        height: 50px;
        font-size: 18px;
        font-weight: 600;
        border-radius: 12px;
        color: #fff;
        background: #000;
      }

      &.rewardBox {
        .listBox {
          .listHeader li,
          .list li span {
            &:nth-of-type(3) {
              width: 134px;
            }

            &:nth-of-type(4) {
              width: 298px;
            }

            &:nth-of-type(5) {
              flex: 1;
              justify-content: space-between;

              button {
                width: 162px;
                height: 50px;
                font-size: 18px;
                font-weight: 600;
                border-radius: 12px;
                color: #fff;
                background: #000;
              }
            }
          }
        }
      }
    }
  }
`;
