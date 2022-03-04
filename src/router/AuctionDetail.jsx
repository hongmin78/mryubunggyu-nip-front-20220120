import styled from "styled-components";
import I_clip from "../img/icon/I_clip.svg";
import I_heart from "../img/icon/I_heart.svg";
import I_heartO from "../img/icon/I_heartO.svg";
import I_3dot from "../img/icon/I_3dot.svg";
import I_rtArw from "../img/icon/I_rtArw.svg";
import { Fragment, useEffect, useRef, useState } from "react";
import { getStyle, putCommaAtPrice } from "../util/Util";
import { D_category, D_transactionHistory } from "../data/DauctionDetail";
import Offer from "../components/itemDetail/Offer";
import { autoAuctionList } from "../data/Dmain";
// import AuctionItem from "../components/AuctionItem";
import AuctionItem0228 from "../components/AuctionItem0228";
import Details from "../components/itemDetail/Details";
import Details0303 from "../components/itemDetail/Details0303";

import Properties from "../components/itemDetail/Properties";
import { useSelector } from "react-redux";
import Header from "../components/header/Header";
import PopupBg from "../components/PopupBg";
import axios from "axios";
import { useParams } from "react-router-dom";
import { LOGGER , getmyaddress, onclickcopy, PARSER
	, conv_jdata_arrkeyvalue
} from "../util/common";
import { API } from "../configs/api";
import SetErrorBar from '../util/SetErrorBar'
import { messages } from '../configs/messages'

export default function AuctionDetail() {
  const params = useParams();
  const moreRef = useRef();
  const isMobile = useSelector((state) => state.common.isMobile);
  const [toggleLike, setToggleLike] = useState(false);
  const [category, setCategory] = useState(0);
  const [moreIndex, setMoreIndex] = useState(0);
  const [showCopyBtn, setShowCopyBtn] = useState(false);
  const [itemdata, setitemdata ] = useState({});
  const [moreCollection, setMoreCollection] = useState([]);
	let [ attributes , setattributes ] = useState ( [] )
	const onclicklike=_=>{
		let myaddress = getmyaddress()
		if (myaddress){} else {SetErrorBar( messages.MSG_PLEASE_CONNECT_WALLET ) ; return }
		axios.post ( API.API_TOGGLE_FAVORITE + `/${itemdata?.itemid}` , {username : myaddress } ).then(			resp=>{ LOGGER( '' , resp.data )
			let { status , respdata }=resp.data
			if ( status =='OK'){
				setToggleLike ( respdata? true : false )
				switch(+respdata ){
					case 1 : SetErrorBar ( messages.MSG_DONE_LIKE )
					break
					default : SetErrorBar ( messages.MSG_DONE_UNLIKE)
					break
				}
			}
		}	)
		setToggleLike(!toggleLike)
	}

	const onclickfavorite=_=>{
		axios.post (API.API_TOGGLE_FAVORITE ).then(resp=>{
			LOGGER( 'xMYQNYFa9d' , resp.data )
		})
		setToggleLike(!toggleLike)
		LOGGER('8FCYJgzDZX')
	} 
  function onClickAuctionNextBtn() {
    if (!moreRef.current.children[0]) return;
    const wrapWidth = moreRef.current.offsetWidth;
    const contWidth = moreRef.current.children[0].offsetWidth;
    const itemNumByPage = Math.floor(wrapWidth / contWidth);
    const pageNum = Math.ceil(autoAuctionList.length / itemNumByPage);
    if (moreIndex < pageNum - 1) setMoreIndex(moreIndex + 1);
    else setMoreIndex(0);
  }
	const getitem=_=>{
		axios.get( API.API_ITEMDETAIL + `/${params.itemid }`).then ( resp => { LOGGER ('7FzS4oxYPN' , resp.data )
		let { status , respdata}=resp.data
		if (status == 'OK'){
			setitemdata( respdata )
			let { metadata}=respdata
			if ( metadata ) {
				let jmetadata= PARSER( metadata )
				LOGGER ( 'oXhffF8eTM' , conv_jdata_arrkeyvalue ( jmetadata ) )
				setattributes ( conv_jdata_arrkeyvalue ( jmetadata ) )
			}
		}
	})
	}
  function getAuction() {
		axios //      .get("http://3.35.1 17.87:34705/auction/list", { params: { limit: 8 } })
			.get(API.API_COMMONITEMS + `/items/group_/kong/0/128/id/DESC` )
      .then( resp => {	LOGGER( '' , resp.data )
				let { status ,list }=resp.data
				if ( status =='OK'){
					setMoreCollection( list )
				}
//        console.log(res.data);
  //      setMoreCollection(res.data);
      });
  }

	useEffect (_=>{
		getitem()
		getAuction()
	} , [] )
/**   useEffect(() => {
    axios
      .ge t(`http://3.35.117.87:34705/auction/item/${params.dna}`)
      .then((res) => {
        console.log(res.data[0]);
        setItemD ata(res.data[0]);
      });
    getAuction();
  }, []); */

  useEffect(() => {
    if (!moreRef.current.children[0]) return;
    const wrapWidth = moreRef.current.offsetWidth;
    const contWidth = moreRef.current.children[0].offsetWidth;
    const itemNumByPage = Math.floor(wrapWidth / contWidth);
    if (moreRef.current?.scrollTo) {
      if (moreIndex === 0) {
        moreRef.current.scrollTo( {
          left: 0,
          behavior: "smooth",
        });
      } else {
        moreRef.current.scrollTo({
          left:
            contWidth * itemNumByPage * moreIndex +
            moreIndex * getStyle(moreRef, "gap") * itemNumByPage,
          behavior: "smooth",
        });
      }
    }
  }, [moreIndex]);

  if (isMobile)
    return (
      <>
        <Header />

        <MauctionDetailBox>
          <section className="itemInfoContainer">
            <span className="itemImgBox">
              <img className="itemImg" src={itemdata?.url } alt="" />
            </span>

            <article className="infoBox">
              <div className="itemInfoBox">
                <div className="titleBox">
                  <div className="topBar">
                    <div className="btnBox">
                      <button
                        className="likeBtn hoverBtn"
												onClick={() => { onclicklike () // onclick favorite ()
												} }
                      >
                        <img src={toggleLike ? I_heartO : I_heart} alt="" />
                      </button>

                      <button
                        className="moreBtn hoverBtn"
                        onClick={() => setShowCopyBtn(true)}
                      >
                        <img src={I_3dot} alt="" />
                      </button>
                    </div>

                    {showCopyBtn && (
                      <>
                        <button
                          className="copyBtn displayBtn"
                          onClick={() => {
														onclickcopy ( window.location.href )
														SetErrorBar(messages.MSG_COPIED )
														setShowCopyBtn(false)														
													}}
                        >
                          <img src={I_clip} alt="" />
                          Copy Link
                        </button>
                        <PopupBg off={setShowCopyBtn} />
                      </>
                    )}
                  </div>

                  <strong className="title">Kingkong #112</strong>
                </div>

                <div className="ownedBox">
                  <p className="key">Owned by</p>
                  <p className="value">@andyfeltham</p>
                </div>

                <div className="saleBox">
                  <div className="price">
                    <p className="key">Current price</p>
                    <strong className="value">
                      {putCommaAtPrice(372)} USDT
                    </strong>
                  </div>

                  <div className="time">
                    <p className="key">Ending in</p>

                    <ul className="timeList">
                      <li>00</li>
                      <li>12</li>
                      <li>59</li>
                      <li>09</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="categoryBox">
                <ul className="category">
                  {D_category.map((cont, index) => (
                    <li key={index} onClick={() => setCategory(index)}>
                      {cont}

                      <div
                        className="underLine"
                        style={{
                          display: category === index && "block",
                        }}
                      />
                    </li>
                  ))}
                </ul>

                <div className="contBox">
                  {category === 0 && <Offer />}
                  {category === 1 && <Details0303 attributes={ attributes } />}
                  {category === 2 && <Properties itemdata={ itemdata } />}
                </div>
              </div>
            </article>
          </section>

          <section className="historyBox">
            <article className="titleBox">
              <strong className="title">Transaction History</strong>
            </article>

            <ul className="historyList">
              {D_transactionHistory.map((cont, index) => (
                <Fragment key={index}>
                  {index ? (
                    <div key={0} className="sideBarBox">
                      <span className="sideBar" />
                    </div>
                  ) : (
                    <></>
                  )}
                  <li key={index}>
                    <span className="iconBox">
                      <img src={cont.img} alt="" />
                    </span>

                    <div className="contBox">
                      <p className="cont">{cont.cont}</p>
                      <p className="time">{cont.time}</p>
                    </div>
                  </li>
                </Fragment>
              ))}
            </ul>
          </section>

          <section className="moreBox">
            <strong className="title">More from this collection</strong>

            <div className="listBox">
              <div className="posBox">
                <ul className="itemList" ref={moreRef}>
                  {moreCollection.map((cont, index) => (
                    <Fragment key={index}>
                      <AuctionItem0228 data={cont} index={index} />
                    </Fragment>
                  ))}
                </ul>
                <button className="nextBtn" onClick={onClickAuctionNextBtn}>
                  <img src={I_rtArw} alt="" />
                </button>
              </div>
            </div>
          </section>

          <button className="bidBtn">Auction in progress..</button>
        </MauctionDetailBox>
      </>
    );
  else
    return (
      <>
        <Header />
        <PauctionDetailBox>
          <section className="itemInfoContainer">
            <span className="itemImgBox">
              <img className="itemImg" src={itemdata?.url } alt="" />
            </span>

            <article className="infoBox">
              <div className="itemInfoBox">
                <div className="titleBox">
                  <strong className="title">
                    Series Kong {itemdata?.titlename }
                  </strong>

                  <div className="btnBox">
                    <div className="posBox">
                      <button
                        className="likeBtn hoverBtn"
												onClick={() => { onclicklike () // onclickfavorite()
												} }
                      >
                        <img src={toggleLike ? I_heartO : I_heart} alt="" />
                      </button>
                    </div>

                    <div className="posBox">
                      <button
                        className="moreBtn hoverBtn"
                        onClick={() => setShowCopyBtn(true)}
                      >
                        <img src={I_3dot} alt="" />
                      </button>

                      <div className="hoverBox">
                        <button
                          className="copyBtn displayBtn"
													onClick={() =>{ 
														onclickcopy ( window.location.href )
														SetErrorBar(messages.MSG_COPIED )
														setShowCopyBtn(false)														
													}}
                        >
                          <img src={I_clip} alt="" />
                          Copy Link
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="ownedBox">
                  <p className="key">Owned by</p>
                  <p className="value">@andyfeltham</p>
                </div>

                <div className="saleBox">
                  <div className="key">
                    <p className="price">Current price</p>
                    <p className="time">Ending in</p>
                  </div>

                  <div className="value">
                    <strong className="price">
                      {putCommaAtPrice(372)} USDT
                    </strong>

                    <ul className="timeList">
                      <li>00</li>
                      <li>12</li>
                      <li>59</li>
                      <li>09</li>
                    </ul>
                  </div>
                </div>

                <button className="bidBtn">Auction in progress..</button>
              </div>

              <div className="categoryBox">
                <ul className="category">
                  {D_category.map((cont, index) => (
                    <li key={index} onClick={() => setCategory(index)}>
                      {cont}

                      <div
                        className="underLine"
                        style={{
                          display: category === index && "block",
                        }}
                      />
                    </li>
                  ))}
                </ul>

                <div className="contBox">
                  {category === 0 && <Offer />}
                  {category === 1 && <Details0303 attributes={ attributes } />}
                  {category === 2 && <Properties itemdata={ itemdata } />}
                </div>
              </div>
            </article>
          </section>

          <section className="historyBox">
            <article className="titleBox">
              <strong className="title">Transaction History</strong>
            </article>

            <ul className="historyList">
              {D_transactionHistory.map((cont, index) => (
                <Fragment key={index}>
                  {index ? (
                    <div className="sideBarBox">
                      <span className="sideBar" />
                    </div>
                  ) : (
                    <></>
                  )}
                  <li>
                    <span className="iconBox">
                      <img src={cont.img} alt="" />
                    </span>

                    <div className="contBox">
                      <p className="cont">{cont.cont}</p>
                      <p className="time">{cont.time}</p>
                    </div>
                  </li>
                </Fragment>
              ))}
            </ul>
          </section>

          <section className="moreBox">
            <strong className="title">More from this collection</strong>

            <div className="listBox">
              <div className="posBox">
                <ul className="itemList" ref={moreRef}>
                  {moreCollection.map((cont, index) => (
                    <Fragment key={index}>
                      <AuctionItem0228 data={cont} index={index} />
                    </Fragment>
                  ))}
                </ul>
                <button className="nextBtn" onClick={onClickAuctionNextBtn}>
                  <img src={I_rtArw} alt="" />
                </button>
              </div>
            </div>
          </section>
        </PauctionDetailBox>
      </>
    );
}

const MauctionDetailBox = styled.div`
  padding: 72px 0 80px 0;

  * {
    font-family: "Roboto", sans-serif;
  }

  .itemInfoContainer {
    .itemImg {
      width: 100%;
      height: 100vw;
      object-fit: contain;
      border-radius: 5.55vw;
    }

    & > .infoBox {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 100%;

      .itemInfoBox {
        padding: 5.55vw 5.55vw 0 5.55vw;

        .titleBox {
          display: flex;
          flex-direction: column;
          gap: 3.33vw;
          font-size: 56px;
          font-weight: 600;
          line-height: 84px;

          .topBar {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .btnBox {
              display: flex;
              gap: 5vw;

              button {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 8.33vw;
                height: 8.33vw;
                border-radius: 50%;
                box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);

                &.likeBtn {
                  padding: 1.94vw;
                }

                &.moreBtn {
                  padding: 1.38vw;
                }

                img {
                  width: 100%;
                }
              }
            }

            .copyBtn {
              display: flex;
              justify-content: center;
              align-items: center;
              gap: 2.22vw;
              width: 32.22vw;
              height: 8.33vw;
              font-size: 3.88vw;
              font-weight: 500;
              line-height: 3.88vw;
              background: #fff;
              border-radius: 1.66vw;
              box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

              img {
                height: 5vw;
              }
            }
          }

          .title {
            font-size: 7.77vw;
            line-height: 7.77vw;
            font-family: "Poppins", sans-serif;
          }
        }

        .ownedBox {
          display: flex;
          gap: 2.22vw;
          margin: 2.22vw 0 0 0;
          font-size: 4.44vw;
          font-weight: 500;

          .key {
            color: #7a7a7a;
          }
        }

        .saleBox {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin: 4.44vw 0 0 0;

          .price {
            display: flex;
            flex-direction: column;
            gap: 1.11vw;

            .key {
              font-size: 3.88vw;
              font-weight: 500;
              line-height: 3.88vw;
            }

            .value {
              font-size: 6.11vw;
            }
          }

          .time {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 3.05vw;

            .key {
              font-size: 5vw;
              font-weight: 500;
            }

            .timeList {
              display: flex;
              gap: 10px;

              li {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 9.72vw;
                height: 9.72vw;
                font-weight: 700;
                font-size: 5.55vw;
                line-height: 5.55vw;
                color: #fff;
                background: #000;
                border-radius: 1.66vw;
              }
            }
          }
        }
      }

      .categoryBox {
        margin: 10vw 0 0 0;

        .category {
          display: flex;
          height: 16.66vw;
          border-bottom: 1.4px solid #d9d9d9;

          li {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            font-size: 4.44vw;
            font-weight: 600;
            font-family: "Poppins", sans-serif;
            position: relative;
            cursor: pointer;

            .underLine {
              display: none;
              width: 100%;
              height: 4px;
              background: #000;
              bottom: 0;
              position: absolute;
            }
          }
        }

        .contBox {
          height: 90.83vw;
          overflow-y: scroll;

          &::-webkit-scrollbar {
            width: 10px;
          }

          &::-webkit-scrollbar-thumb {
            width: 10px;
            background-color: #d9d9d9;
            border-radius: 8px;
          }

          &::-webkit-scrollbar-track {
            background-color: #fff;
          }
        }
      }
    }
  }

  .historyBox {
    margin: 9.44vw 0 0 0;

    .titleBox {
      display: flex;
      align-items: center;
      height: 13.88vw;
      border-bottom: 1.4px solid #d9d9d9;

      .title {
        padding: 0 20px;
        font-size: 5vw;
        line-height: 5vw;
      }
    }

    .historyList {
      display: flex;
      flex-direction: column;
      gap: 2.22vw;
      padding: 40px 20px 0;

      .sideBarBox {
        display: flex;
        justify-content: center;
        width: 10.55vw;

        .sideBar {
          width: 0.55vw;
          height: 5.55vw;
          background: #d9d9d9;
        }
      }

      li {
        display: flex;
        align-items: center;
        gap: 3.33vw;

        .iconBox {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 10.55vw;
          height: 10.55vw;
          padding: 2.5vw;
          border-radius: 50%;
          background: #004ce0;

          img {
            width: 100%;
          }
        }

        .contBox {
          display: flex;
          flex-direction: column;

          .cont {
            font-size: 3.88vw;
            font-weight: 500;
          }

          .time {
            font-size: 3.33vw;
            color: #7a7a7a;
          }
        }
      }
    }
  }

  .moreBox {
    display: flex;
    flex-direction: column;
    gap: 1.38vw;
    padding: 0;
    margin: 15.55vw 0 0 0;

    .title {
      padding: 0 20px;
      font-size: 5vw;
    }

    .listBox {
      .posBox {
        display: flex;
        align-items: center;
        position: relative;

        .itemList {
          display: flex;
          gap: 20px;
          padding: 20px;
          overflow-x: scroll;

          .item {
            min-width: 100%;
          }
        }

        .nextBtn {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 54px;
          height: 54px;
          background: rgba(255, 255, 255, 0.8);
          border: 1px solid #f6f6f6;
          border-radius: 50%;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
          position: absolute;
          z-index: 2;
          right: 6px;
        }
      }
    }
  }

  .bidBtn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 60px;
    font-size: 20px;
    font-weight: 500;
    color: #fff;
    background: #000;
    right: 0;
    bottom: 0;
    left: 0;
    position: fixed;
    z-index: 4;
  }
`;

const PauctionDetailBox = styled.div`
  max-width: 1480px;
  padding: 180px 0 220px 0;
  margin: 0 auto;

  & > * {
    padding: 0 20px;
  }

  * {
    font-family: "Roboto", sans-serif;
  }

  & > .topBar {
    display: flex;
    justify-content: flex-end;
  }

  .itemInfoContainer {
    display: flex;
    justify-content: space-between;
    gap: 40px;

    .itemImgBox {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 760px;
      height: 760px;
      object-fit: contain;

      @media screen and (max-width: 1440px) {
        min-width: 500px;
        height: 500px;
        border-radius: 20px;
      }

      .itemImg {
        height: 100%;
        border-radius: 20px;
      }
    }

    & > .infoBox {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      max-width: 608px;
      min-width: 445px;
      width: 100%;

      .itemInfoBox {
        .titleBox {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          font-size: 40px;
          font-weight: 600;
          line-height: 60px;

          .title {
            font-family: "Poppins", sans-serif;
          }

          .btnBox {
            display: flex;
            gap: 20px;

            .posBox {
              position: relative;

              &:hover {
                .hoverBox {
                  display: flex;
                  justify-content: flex-end;
                }
              }

              .hoverBtn {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 40px;
                height: 40px;
                padding: 10px;
                border-radius: 50%;
                box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);

                img {
                  width: 100%;
                }
              }

              .hoverBox {
                display: none;
                width: 100%;
                height: 108px;
                bottom: 0;
                position: absolute;

                .copyBtn {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  gap: 10px;
                  min-width: 152px;
                  width: 152px;
                  height: 44px;
                  font-size: 18px;
                  font-weight: 500;
                  line-height: 18px;
                  background: #fff;
                  border-radius: 12px;
                  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                }
              }
            }
          }
        }

        .ownedBox {
          display: flex;
          gap: 10px;
          margin: 14px 0 0 0;
          font-size: 18px;
          font-weight: 500;

          .key {
            color: #7a7a7a;
          }
        }

        .saleBox {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin: 44px 0 0 0;

          .key {
            display: flex;
            justify-content: space-between;
            font-size: 18px;
            font-weight: 500;
            line-height: 21px;
          }

          .value {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .price {
              font-size: 38px;
            }

            .timeList {
              display: flex;
              gap: 10px;

              li {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 45px;
                height: 45px;
                font-weight: 700;
                font-size: 24px;
                line-height: 24px;
                color: #fff;
                background: #000;
                border-radius: 6px;
              }
            }
          }
        }

        .bidBtn {
          width: 100%;
          height: 60px;
          margin: 44px 0 0 0;
          font-size: 20px;
          font-weight: 500;
          box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
          border-radius: 12px;
        }
      }

      .categoryBox {
        .category {
          display: flex;
          height: 66px;
          border-bottom: 1.4px solid #d9d9d9;

          li {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            padding: 0 16px;
            font-size: 18px;
            font-weight: 600;
            font-family: "Poppins", sans-serif;
            position: relative;
            cursor: pointer;

            .underLine {
              display: none;
              width: 100%;
              height: 4px;
              background: #000;
              position: absolute;
              bottom: 0;
            }
          }
        }

        .contBox {
          height: 270px;
          overflow-y: scroll;

          &::-webkit-scrollbar {
            width: 10px;
          }

          &::-webkit-scrollbar-thumb {
            width: 10px;
            background-color: #d9d9d9;
            border-radius: 8px;
          }

          &::-webkit-scrollbar-track {
            background-color: #fff;
          }
        }
      }
    }
  }

  .historyBox {
    margin: 120px 0 0 0;

    .titleBox {
      display: flex;
      align-items: center;
      height: 88px;
      border-bottom: 1.4px solid #d9d9d9;

      .title {
        font-size: 34px;
        font-weight: 700;
        line-height: 34px;
      }
    }

    .historyList {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 40px 20px 0;

      .sideBarBox {
        display: flex;
        justify-content: center;
        width: 52px;

        .sideBar {
          width: 2px;
          height: 20px;
          background: #d9d9d9;
        }
      }

      li {
        display: flex;
        align-items: center;
        gap: 16px;

        .iconBox {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: #004ce0;
        }

        .contBox {
          display: flex;
          flex-direction: column;
          gap: 6px;

          .cont {
            font-weight: 500;
          }

          .time {
            color: #7a7a7a;
          }
        }
      }
    }
  }

  .moreBox {
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 0;
    margin: 120px 0 0 0;

    .title {
      padding: 0 20px;
      font-size: 30px;
    }

    .listBox {
      .posBox {
        display: flex;
        align-items: center;
        position: relative;

        .itemList {
          display: flex;
          gap: 40px;
          width: 100%;
          padding: 20px;
          overflow-x: scroll;
        }

        .nextBtn {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 54px;
          height: 54px;
          background: rgba(255, 255, 255, 0.8);
          border: 1px solid #f6f6f6;
          border-radius: 50%;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
          position: absolute;
          z-index: 2;
          right: -7px;
        }
      }
    }
  }
`;
