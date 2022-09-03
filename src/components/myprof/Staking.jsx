import styled from "styled-components";
import I_copy from "../../img/icon/I_copy.svg";
import I_circleChk from "../../img/icon/I_circleChk.svg";
import { D_recommendList } from "../../data/DmyPage";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
<<<<<<< HEAD
import { strDot } from "../../util/Util";
=======
import { get_contractaddress, strDot } from "../../util/Util";
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
import {
  D_rewardHeader,
  D_rewardList,
  D_vaultHeader,
  D_vaultList,
<<<<<<< HEAD
=======
  D_stakeHeader,
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
} from "../../data/Dstaking";
import { getmyaddress, LOGGER } from "../../util/common";
import axios from "axios";
import moment from "moment";
import { API } from "../../configs/api";
import ticketImg from "../../img/staking/E_prof1.png";
import { net } from "../../configs/net";
<<<<<<< HEAD

export default function Staking() {
  const isMobile = useSelector((state) => state.common.isMobile);

  const [toggleCode, setToggleCode] = useState(false);
  const [toggleLink, setToggleLink] = useState(false);
  const [ticketInfo, setItckInfo] = useState();

  const fatchData = () => {
=======
import {
  getabistr_forfunction,
  query_with_arg,
  query_noarg,
  query_eth_balance,
} from "../../util/contract-calls";

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
  const fatchData = async () => {
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
    let myaddress = getmyaddress();
    axios
      .get(API.API_GET_TICK_INFO + `/${myaddress}?nettype=${net}`)
      .then((resp) => {
<<<<<<< HEAD
        LOGGER("API_ticketInfo", resp.data);

=======
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
        let { status, respdata } = resp.data;
        if (status == "OK" && respdata !== null) {
          setItckInfo([respdata]);
        }
      });
<<<<<<< HEAD
  };

  useEffect(() => {
    fatchData();
  }, []);

  console.log("logsataasdasd", ticketInfo);

=======
    try {
      let resp = await axios.get(
        API.API_ITEMBALANCES + `/${myaddress}?nettype=${net}`
      );
      let { list, status } = resp.data;
      console.log("__list", list);
      if (status == "OK") {
        let stakedcount = list.filter((el) => el.isstaked == 1);
        set_staked_count(stakedcount.length);
        set_kingkong_list(list.filter((el) => el.group_ == "kingkong"));
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    let myaddress = getmyaddress();

    query_contractaddresses().then(async (resp) => {
      fatchData();
      const query_claimable_amount = async (myaddress) => {
        query_with_arg({
          contractaddress: await get_contractaddress("KIP17[staking]", resp),
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
      const query_claimed_reward = async (_) => {
        query_noarg({
          contractaddress: await get_contractaddress("KIP17[staking]", resp),
          abikind: "KIP17Stake", //
          methodname: "query_claimed_reward",
        }).then((resp) => {
          LOGGER("@query_claimed_reward", getethrep(resp));
          setTotalClaimedReward((+getethrep(resp)).toFixed(4));
        });
      };
      const queryTotalMinted = async (myaddress) => {
        //    let myaddress = getmyaddress();
        if (myaddress) {
        } else {
          return;
        }
        console.log("asdasdasdsad", myaddress);
        query_with_arg({
          contractaddress: await get_contractaddress("KIP17[staking]", resp),
          //      abikind: "STAK ING", // NFT
          abikind: "KIP17Stake", //
          methodname: "balanceOf",
          aargs: [myaddress],
        }).then((res) => {
          setTotalMinted(res);
          console.log("@total minted", res);
        });
      };

      query_claimable_amount(myaddress);
      query_claimed_reward();
      queryTotalMinted(myaddress);
    });
  }, []);

  const make_employ_tx = async (itemDetail, _status) => {
    let myaddress = getmyaddress();
    console.log("res", itemDetail); //    let msg;
    setSpinner(true);
    let { itemid, itemdata } = itemDetail;
    let options_arg = {
      withdraw: {
        contractaddress: await get_contractaddress(
          "KIP17[staking]",
          contractaddresses
        ), // ETH_TESTNET.
        abikind: "KIP17Stake",
        methodname: _status,
        aargs: [
          await get_contractaddress("KIP17", contractaddresses),
          itemdata?.tokenid,
          myaddress,
        ], // .ETH_TESTNET
      },
      mint_deposit: {
        contractaddress: await get_contractaddress(
          "KIP17[staking]",
          contractaddresses
        ), // ETH_TESTNET.
        abikind: "KIP17Stake",
        methodname: _status,
        aargs: [
          await get_contractaddress("KIP17", contractaddresses),
          itemid,
          250,
        ], // .ETH_TESTNET
      },
    };
    console.log("__________asdfasdfaqwef", options_arg[_status]);

    let abistr = await getabistr_forfunction(options_arg[_status]);
    requesttransaction({
      from: myaddress,
      to: await get_contractaddress("KIP17[staking]", contractaddresses), // ETH_TESTNET.
      data: abistr,
    }).then((resp) => {
      LOGGER("@txresp", resp);
      let txhash = resp;
      if (resp) {
      } else {
        setSpinner(false);
        return;
      }
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
              contractaddress: await get_contractaddress(
                "KIP17[staking]",
                contractaddresses
              ),
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
      contractaddress: await get_contractaddress(
        "KIP17[staking]",
        contractaddresses
      ),
      abikind: "KIP17Stake", // STAKING",
      methodname: "claim",
      aargs: [],
    });
    setSpinner(true);
    requesttransaction({
      from: myaddress,
      to: await get_contractaddress("KIP17[staking]", contractaddresses),
      data: abistring,
      value: "0x00",
    }).then(async (res) => {
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
          const query_claimed_reward = async (_) => {
            query_noarg({
              contractaddress: await get_contractaddress(
                "KIP17[staking]",
                contractaddresses
              ),
              abikind: "KIP17Stake", //
              methodname: "query_claimed_reward",
            }).then((resp) => {
              LOGGER("@query_claimed_reward", getethrep(resp));
              setTotalClaimedReward((+getethrep(resp)).toFixed(4));
            });
          };
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
            rewardTokenContract: await get_contractaddress(
              "ERC20",
              contractaddresses
            ), // contract_nip_token,
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
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
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
<<<<<<< HEAD
                            : "UNACTIVE"}
=======
                            : "INACTIVE"}
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
                        </p>
                      </div>

                      <ul className="dataList">
                        <li>
                          <p className="key">Staking Amount</p>
<<<<<<< HEAD
                          <p>{cont.amount}&nbsp;USDT</p>
=======
                          <p>{cont.price}&nbsp;USDT</p>
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
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
<<<<<<< HEAD

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
=======
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
        </ul>
      </MstakingBox>
    );
  else
    return (
      <PstakingBox>
        <ul className="contList">
          <li className="vaultsBox">
<<<<<<< HEAD
=======
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
        </ul>
        <ul className="contList">
          <li className="vaultsBox">
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
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
<<<<<<< HEAD
                            : "UNACTIVE"}
=======
                            : "INACTIVE"}
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
                        </p>
                      </span>

                      <span>
<<<<<<< HEAD
                        <p>{cont.amount}&nbsp;USDT</p>
=======
                        <p>{cont.price}&nbsp;USDT</p>
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
                      </span>

                      <span>
                        {moment(cont.createdat).format("YYYY-MM-DD hh:mm:ss")}
                      </span>

                      <span>
                        {moment(cont.createdat)
                          .add(90, "day")
                          .format("YYYY-MM-DD hh:mm:ss")}
                      </span>
<<<<<<< HEAD

                      <span>
                        <button className="unstakeBtn" onClick={() => {}}>
                          Unstake
                        </button>
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
=======
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
                            : "INACTIVE"}
                        </p>
                      </span>

                      <span>
                        <p>{cont.buyprice}&nbsp;USDT</p>
                      </span>

                      <span>
                        {moment(cont.createdat).format("YYYY-MM-DD hh:mm:ss")}
                      </span>

                      <span>
                        {/* {moment(cont.createdat)
                          .add(90, "day")
                          .format("YYYY-MM-DD hh:mm:ss")} */}
                        -
                      </span>

                      <span>
                        {cont.isstaked == 1 ? (
                          <button
                            className="unstakeBtn"
                            disabled={spinner}
                            onClick={() => make_employ_tx(cont, "withdraw")}
                          >
                            {spinner ? <div id="loading"></div> : "Unemploy"}
                          </button>
                        ) : (
                          <button
                            className="unstakeBtn"
                            disabled={spinner}
                            onClick={() => make_employ_tx(cont, "mint_deposit")}
                          >
                            {spinner ? <div id="loading"></div> : "Employ"}
                          </button>
                        )}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
          </li>
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
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
<<<<<<< HEAD
=======

              #loading {
                display: inline-block;
                width: 38px;
                height: 38px;
                border: 3px solid rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                border-top-color: #fff;
                animation: spin 1s ease-in-out infinite;
                -webkit-animation: spin 1s ease-in-out infinite;
                z-index: 999;
              }

              @keyframes spin {
                to {
                  -webkit-transform: rotate(360deg);
                }
              }
              @-webkit-keyframes spin {
                to {
                  -webkit-transform: rotate(360deg);
                }
              }
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
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
<<<<<<< HEAD
=======
              margin-left: 50px;
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
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
<<<<<<< HEAD
=======
                #loading {
                  display: inline-block;
                  width: 28px;
                  height: 28px;
                  border: 3px solid rgba(255, 255, 255, 0.3);
                  border-radius: 50%;
                  border-top-color: #fff;
                  animation: spin 1s ease-in-out infinite;
                  -webkit-animation: spin 1s ease-in-out infinite;
                }

                @keyframes spin {
                  to {
                    -webkit-transform: rotate(360deg);
                  }
                }
                @-webkit-keyframes spin {
                  to {
                    -webkit-transform: rotate(360deg);
                  }
                }
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
              }
            }
          }
        }
      }
<<<<<<< HEAD
=======
      .claimBtn {
        width: 300px;
        height: 50px;
        font-size: 18px;
        font-weight: 600;
        border-radius: 12px;
        color: #fff;
        background: #000;
      }
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027

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
