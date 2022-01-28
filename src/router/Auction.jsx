import { Fragment, useRef, useState } from "react";
import styled from "styled-components";
import I_search from "../img/icon/I_search.svg";
import I_dnArw from "../img/icon/I_dnArw.svg";
import AuctionItem from "../components/AuctionItem";
import { D_auctionItemList, D_sortList } from "../data/Dauction";
import Footer from "./Footer";
import PopupBg from "../components/PopupBg";
import SelectPopup from "../components/SelectPopup";
import { useSelector } from "react-redux";
import Header from "../components/header/Header";

export default function Auction() {
  const searchBoxRef = useRef();
  const sortBtnRef = useRef();

  const isMobile = useSelector((state) => state.common.isMobile);

  const [search, setSearch] = useState("");
  const [sortOpt, setSortOpt] = useState(D_sortList[1]);
  const [sortPopup, setSortPopup] = useState(false);
  const [likeObj, setLikeObj] = useState({});
  const [limit, setLimit] = useState(8);

  if (isMobile)
    return (
      <>
        <Header />
        <MauctionBox>
          <div className="innerBox">
            <section className="topBar">
              <p className="title">Subscription Auction All NFTs</p>

              <article className="rightBox">
                <div className="searchBox" ref={searchBoxRef}>
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search"
                  />

                  <img src={I_search} alt="" />
                </div>

                <div className="sortBox">
                  <button
                    className="sortBtn"
                    onClick={() => setSortPopup(true)}
                  >
                    <p>{sortOpt}</p>
                    <img src={I_dnArw} alt="" />
                  </button>

                  {sortPopup && (
                    <>
                      <SelectPopup
                        off={setSortPopup}
                        dataList={D_sortList}
                        select={sortOpt}
                        setFunc={setSortOpt}
                      />
                      <PopupBg off={setSortPopup} />
                    </>
                  )}
                </div>
              </article>
            </section>

            <ul className="itemList">
              {D_auctionItemList.map((cont, index) => {
                if (index < limit)
                  return (
                    <Fragment key={index}>
                      <AuctionItem
                        data={cont}
                        index={index}
                        likeObj={likeObj}
                        setLikeObj={setLikeObj}
                      />
                    </Fragment>
                  );
                else return <Fragment key={index} />;
              })}
            </ul>

            <button className="moreBtn" onClick={() => setLimit(limit + 4)}>
              Load more
            </button>
          </div>
        </MauctionBox>
        <Footer />
      </>
    );
  else
    return (
      <>
        <Header />
        <PauctionBox>
          <section className="topBar">
            <p className="title">Subscription Auction All NFTs</p>

            <article className="rightBox">
              <div className="searchBox" ref={searchBoxRef}>
                <input
                  value={search}
                  onFocus={() =>
                    (searchBoxRef.current.style.border = "1.4px solid #000")
                  }
                  onBlur={() =>
                    (searchBoxRef.current.style.border = "1px solid #d9d9d9")
                  }
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search"
                />

                <button className="" onClick={() => {}}>
                  <img src={I_search} alt="" />
                </button>
              </div>

              <div className="sortBox">
                <button
                  ref={sortBtnRef}
                  className="sortBtn"
                  onFocus={() =>
                    (sortBtnRef.current.style.border = "1.4px solid #000")
                  }
                  onBlur={() =>
                    (sortBtnRef.current.style.border = "1px solid #d9d9d9")
                  }
                  onClick={() => setSortPopup(true)}
                >
                  <p>{sortOpt}</p>
                  <img src={I_dnArw} alt="" />
                </button>

                {sortPopup && (
                  <>
                    <SelectPopup
                      off={setSortPopup}
                      dataList={D_sortList}
                      select={sortOpt}
                      setFunc={setSortOpt}
                    />
                    <PopupBg off={setSortPopup} />
                  </>
                )}
              </div>
            </article>
          </section>

          <ul className="itemList">
            {D_auctionItemList.map((cont, index) => {
              if (index < limit)
                return (
                  <Fragment key={index}>
                    <AuctionItem
                      data={cont}
                      index={index}
                      likeObj={likeObj}
                      setLikeObj={setLikeObj}
                    />
                  </Fragment>
                );
              else return <Fragment key={index} />;
            })}
          </ul>

          <button className="moreBtn" onClick={() => setLimit(limit + 4)}>
            Load more
          </button>
        </PauctionBox>
        <Footer />
      </>
    );
}

const MauctionBox = styled.div`
  padding: 56px 0 0 0;
  margin: 0 auto;

  .innerBox {
    padding: 4.44vw 20px 15.55vw 20px;

    & > .topBar {
      display: flex;
      flex-direction: column;
      gap: 4.44vw;

      .title {
        font-size: 5.55vw;
        font-weight: 600;
        line-height: 5.55vw;
      }

      .rightBox {
        display: flex;
        flex-direction: column;
        gap: 2.77vw;

        * {
          font-family: "Roboto", sans-serif;
        }

        .searchBox {
          display: flex;
          align-items: center;
          height: 12.22vw;
          padding: 0 5vw;
          border: 1px solid #d9d9d9;
          border-radius: 3.33vw;

          * {
            font-size: 5vw;
            font-size: 500;
          }

          input {
            flex: 1;

            &::placeholder {
              color: #d9d9d9;
            }
          }
        }

        .sortBox {
          width: 100%;
          position: relative;

          .sortBtn {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: inherit;
            height: 12.22vw;
            padding: 0 5vw;
            font-size: 5vw;
            line-height: 5vw;
            font-weight: 500;
            border: 1px solid #d9d9d9;
            border-radius: 3.33vw;
          }
        }
      }
    }

    .itemList {
      display: flex;
      flex-direction: column;
      gap: 2.77vw;
      margin: 4.44vw 0 0 0;
    }

    .moreBtn {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 6.66vw 0 0 0;
      width: 100%;
      height: 15vw;
      font-size: 4.44vw;
      font-weight: 500;
      line-height: 4.44vw;
      color: #fff;
      background: #000;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
      border-radius: 8.33vw;
    }
  }
`;

const PauctionBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 44px;
  padding: 208px 0 220px 0;
  margin: 0 auto;
  max-width: 1440px;
  @media screen and (max-width: 1440px) {
    padding: 0 20px;
  }

  .topBar {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      font-size: 44px;
      font-weight: 600;
      line-height: 44px;
    }

    .rightBox {
      display: flex;
      gap: 14px;

      * {
        font-family: "Roboto", sans-serif;
      }

      .searchBox {
        display: flex;
        align-items: center;
        width: 340px;
        height: 44px;
        padding: 0 18px;
        border: 1px solid #d9d9d9;
        border-radius: 12px;

        * {
          font-size: 18px;
          font-size: 500;
        }

        input {
          flex: 1;

          &::placeholder {
            color: #d9d9d9;
          }
        }
      }

      .sortBox {
        position: relative;
        width: 240px;

        .sortBtn {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: inherit;
          height: 44px;
          padding: 0 18px;
          font-size: 18px;
          line-height: 18px;
          font-weight: 500;
          border: 1px solid #d9d9d9;
          border-radius: 12px;
        }
      }
    }
  }

  .itemList {
    display: flex;
    flex-wrap: wrap;
    gap: 40px;
    @media screen and (max-width: 1440px) {
      justify-content: center;
    }
  }

  .moreBtn {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 54px;
    font-size: 18px;
    font-weight: 500;
    line-height: 18px;
    color: #fff;
    background: #000;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    border-radius: 30px;
  }
`;
