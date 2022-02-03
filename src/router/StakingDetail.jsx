import styled from "styled-components";
import B_staking from "../img/staking/B_staking.png";
import I_tIcon from "../img/icon/I_tIcon.png";
import E_staking from "../img/common/E_staking.png";
import E_title from "../img/staking/E_title.svg";
import { useState } from "react";
import PopupBg from "../components/PopupBg";
import StakingPopup from "../components/StakingPopup";

import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/header/Header";
import {
  D_rewardHeader,
  D_rewardList,
  D_vaultHeader,
  D_vaultList,
} from "../data/Dstaking";
import Footer from "./Footer";

export default function StakingDetail() {
  const navigate = useNavigate();
  const param = useParams();

  const isMobile = useSelector((state) => state.common.isMobile);
  const isLogin = useSelector((state) => state.common.isLogin);

  if (isMobile)
    return (
      <>
        <Header />
        <MstakingDetailBox>
          <article className="listArea">
            <div className="vaultBox listContainer">
              <p className="title">Vaults</p>

              <ul className="list">
                {D_vaultList.map((cont, index) => (
                  <li key={index}>
                    <div className="listHeader">
                      <img src={cont.img} alt="" />
                      <p>{cont.name}</p>
                    </div>

                    <ul className="data">
                      <li>
                        <p className="key">Staking Amount</p>
                        <p className="value">{cont.amount}&nbsp;USDT</p>
                      </li>
                      <li>
                        <p className="key">Start</p>
                        <p className="value">{cont.start}</p>
                      </li>
                      <li>
                        <p className="key">Ended</p>
                        <p className="value">{cont.end}</p>
                      </li>
                    </ul>

                    <div className="btnBox">
                      <button className="unstakeBtn" onClick={() => {}}>
                        Unstake
                      </button>
                      <button className="stakeBtn" onClick={() => {}}>
                        Stake
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rewardBox listContainer">
              <p className="title">Earned Rewards</p>

              <ul className="list">
                {D_rewardList.map((cont, index) => (
                  <li key={index}>
                    <div className="listHeader">
                      <img src={cont.img} alt="" />
                      <p>{cont.name}</p>
                    </div>

                    <ul className="data">
                      <li>
                        <p className="key">Staking Amount</p>
                        <p className="value">{cont.amount}&nbsp;USDT</p>
                      </li>
                      <li>
                        <p className="key">APY</p>
                        <p className="value">{cont.apy}%</p>
                      </li>
                      <li>
                        <p className="key">Reward Distribution Cycle</p>
                        <p className="value">{cont.cycle}</p>
                      </li>
                    </ul>

                    <div className="btnBox">
                      <button className="claimBtn" onClick={() => {}}>
                        Claim
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </article>
          <Footer />
        </MstakingDetailBox>
      </>
    );
  else
    return (
      <>
        <Header />
        <PstakingDetailBox>
          <div className="innerBox">
            <article className="titleBox">
              <p className="title">
                the longer you stake, the better the rewards!
              </p>

              <p className="address">
                Your address : {isLogin ? isLogin : "-"}
              </p>
            </article>

            <article className="listArea">
              <div className="vaultBox listContainer">
                <p className="title">Vaults</p>

                <div className="listBox">
                  <ul className="listHeader">
                    {D_vaultHeader.map((cont, index) => (
                      <li key={index}>{cont}</li>
                    ))}
                  </ul>

                  <ul className="list">
                    {D_vaultList.map((cont, index) => (
                      <li key={index}>
                        <span>
                          <img src={cont.img} alt="" />
                          <p>{cont.name}</p>
                        </span>

                        <span>
                          <p>{cont.amount}&nbsp;USDT</p>
                        </span>

                        <span>{cont.start}</span>

                        <span>{cont.end}</span>

                        <span>
                          <button className="unstakeBtn" onClick={() => {}}>
                            Unstake
                          </button>
                          <button className="stakeBtn" onClick={() => {}}>
                            Stake
                          </button>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="rewardBox listContainer">
                <p className="title">Earned Rewards</p>

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
                          <button className="claimBtn" onClick={() => {}}>
                            Claim
                          </button>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          </div>
          <Footer />
        </PstakingDetailBox>
      </>
    );
}

const MstakingDetailBox = styled.div`
  padding: 75px 5.55vw 5.55vw 5.55vw;
  background: #000;
  background-image: url(${B_staking});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  overflow-y: scroll;

  .listArea {
    display: flex;
    flex-direction: column;
    gap: 5.55vw;
    padding: 0 0 16.66vw 0;

    .listContainer {
      display: flex;
      flex-direction: column;
      gap: 6.66vw;
      padding: 3.88vw 5.55vw;
      color: #fff;
      background: rgba(255, 255, 255, 0.2);
      border: 2px solid #ffffff;
      border-radius: 3.33vw;

      .title {
        font-size: 5.55vw;
        font-weight: 600;
      }

      .list {
        & > li {
          display: flex;
          flex-direction: column;
          gap: 6.66vw;
          padding-bottom: 5.55vw;

          &:nth-of-type(n + 2) {
            padding-top: 5.55vw;
            border-top: 1px solid rgba(217, 217, 217, 0.2);
          }

          .listHeader {
            display: flex;
            align-items: center;
            gap: 2.77vw;
            font-size: 5vw;

            img {
              width: 13.88vw;
              height: 13.88vw;
              border-radius: 50%;
              object-fit: cover;
            }
          }

          .data {
            display: flex;
            flex-direction: column;
            gap: 3.88vw;

            li {
              display: flex;
              justify-content: space-between;
              font-size: 3.88vw;
            }
          }

          .btnBox {
            display: flex;
            gap: 3.3vw;

            button {
              flex: 1;
              height: 13.88vw;
              font-size: 5vw;
              font-weight: 600;
              border-radius: 3.33vw;

              &.unstakeBtn {
                color: #fff;
                background: #004ce0;
              }

              &.stakeBtn,
              &.claimBtn {
                background: #fff;
              }
            }
          }
        }
      }
    }
  }
`;

const PstakingDetailBox = styled.div`
  min-height: 100vh;
  background: #000;
  background-image: url(${B_staking});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  & > .innerBox {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 60px;
    padding: 220px 0;

    .titleBox {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      color: #fff;

      .title {
        font-size: 44px;
        font-weight: 600;
      }

      .address {
        font-size: 18px;
      }
    }

    .listArea {
      display: flex;
      flex-direction: column;
      gap: 44px;
      width: 100%;
      max-width: 1440px;

      .listContainer {
        display: flex;
        flex-direction: column;
        gap: 30px;
        padding: 20px 40px 60px 40px;
        color: #fff;
        background: rgba(255, 255, 255, 0.2);
        border: 2px solid #ffffff;
        border-radius: 20px;

        &.rewardBox {
          .listHeader li,
          .list li span {
            &:nth-of-type(3) {
              justify-content: center;
              padding: 0 90px 0 0;
            }
          }
        }

        .title {
          font-size: 24px;
          font-weight: 600;
        }

        .listBox {
          .listHeader {
            display: flex;
            font-size: 18px;
            font-weight: 600;
          }

          .list {
            li {
              display: flex;
              align-items: center;
              height: 104px;

              &:nth-of-type(n + 2) {
                border-top: 1px solid rgba(217, 217, 217, 0.2);
              }
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

            &:nth-of-type(3) {
              width: 255px;
            }

            &:nth-of-type(4) {
              width: 255px;
            }

            &:nth-of-type(5) {
              flex: 1;
              justify-content: flex-end;
              gap: 24px;

              button {
                width: 162px;
                height: 50px;
                font-size: 18px;
                font-weight: 600;
                border-radius: 12px;

                &.unstakeBtn {
                  color: #fff;
                  background: #004ce0;
                }

                &.stakeBtn,
                &.claimBtn {
                  background: #fff;
                }
              }
            }
          }
        }
      }
    }
  }
`;
