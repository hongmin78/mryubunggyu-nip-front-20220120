import { Fragment, useState } from "react";
import styled from "styled-components";
import I_search from "../img/icon/I_search.svg";
import I_dnArw from "../img/icon/I_dnArw.svg";
import AuctionItem from "../components/AuctionItem";
import { D_auctionItemList, D_sortList } from "../data/Dauction";
import Footer from "./Footer";
import PopupBg from "../components/PopupBg";
import SelectPopup from "../components/SelectPopup";

export default function Auction() {
  const [search, setSearch] = useState("");
  const [sortOpt, setSortOpt] = useState(D_sortList[1]);
  const [sortPopup, setSortPopup] = useState(false);
  const [likeObj, setLikeObj] = useState({});
  const [limit, setLimit] = useState(8);

  return (
    <>
      <AuctionBox>
        <section className="topBar">
          <p className="title">Subscription Auction All NFTs</p>

          <article className="rightBox">
            <div className="searchBox">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
              />

              <img src={I_search} alt="" />
            </div>

            <div className="sortBox">
              <button className="sortBtn" onClick={() => setSortPopup(true)}>
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
            else return <Fragment />;
          })}
        </ul>

        <button className="moreBtn" onClick={() => setLimit(limit + 4)}>
          Load more
        </button>
      </AuctionBox>
      <Footer />
    </>
  );
}

const AuctionBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 44px;
  padding: 208px 0 220px 0;
  margin: 0 auto;
  max-width: 1440px;

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
