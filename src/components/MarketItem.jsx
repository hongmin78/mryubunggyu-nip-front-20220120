import { strDot } from "../util/Util";
import I_heart from "../img/icon/I_heart.svg";
import I_heartO from "../img/icon/I_heartO.svg";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";
<<<<<<< HEAD
=======
import E_staking from "../img/common/E_staking.png";
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027

export default function MarketItem({ data, index, likeObj, setLikeObj }) {
  const navigate = useNavigate();

  const isMobile = useSelector((state) => state.common.isMobile);
<<<<<<< HEAD

=======
  console.log("data", data);
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
  function onClickItemLike(e, index) {
    e.stopPropagation();
    let dataObj = likeObj;
    dataObj[index] = !dataObj[index];

    setLikeObj({ ...dataObj });
  }

  if (isMobile)
    return (
<<<<<<< HEAD
      <Mitem
        className="item"
        onClick={() => navigate(`/market/detail/${data?.itemid}`)}
      >
=======
      <Mitem className="item" onClick={() => navigate(`/market/detail/${data?.itemid}`)}>
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
        <div className="topBar">
          <div className="profBox">
            <img src={data?.url} alt="" />
            <p className="address">{strDot("0x5c7MMMMd8d7", 5, 4)}</p>
          </div>

          {likeObj && (
<<<<<<< HEAD
            <button
              className="likeBtn"
              onClick={(e) => onClickItemLike(e, index)}
            >
=======
            <button className="likeBtn" onClick={(e) => onClickItemLike(e, index)}>
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
              <img src={likeObj[index] ? I_heartO : I_heart} alt="" />
              <p
                className="count"
                style={{
                  color: likeObj[index] && "#ff5050",
                }}
              >
                {data.like}
              </p>
            </button>
          )}
        </div>

        <img className="itemImg" src={data.url} alt="" />

        <div className="infoBox">
          <p className="title">{data.titlename}</p>

          <ul className="detailList">
            <li>
              <p>Current bid</p>
              <p>Ending in</p>
            </li>
            <li style={{ color: "#fff" }}>
              <p>
                {data.price}&nbsp;{data.unit}
              </p>

              <p>{moment(data.createdat).fromNow()}</p>
            </li>
          </ul>
        </div>
      </Mitem>
    );
  else
    return (
      <Pitem
        className="item"
<<<<<<< HEAD
        onClick={() => navigate(`/market/detail/${data?.itemid}`)}
      >
        <div className="topBar">
          <div className="profBox">
            <img src={data.url} alt="" />
            <p className="address">{strDot("0x5c7MMMMd8d7", 5, 4)}</p>
          </div>

          {likeObj && (
            <button
              className="likeBtn"
              onClick={(e) => onClickItemLike(e, index)}
            >
=======
        onClick={() => {
          navigate(`/market/detail/${data.uuid}`);
        }}
      >
        <div className="topBar">
          <div className="profBox">
            {data.item?.url ? (
              <img className="itemImg" src={data.item?.url} alt="" />
            ) : (
              <img className="itemImg" src={E_staking} alt="" />
            )}
            <p className="address">{strDot(data?.username, 5, 4)}</p>
          </div>

          {likeObj && (
            <button className="likeBtn" onClick={(e) => onClickItemLike(e, index)}>
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
              <img src={likeObj[index] ? I_heartO : I_heart} alt="" />
              <p
                className="count"
                style={{
                  color: likeObj[index] && "#ff5050",
                }}
              >
                {data.like}
              </p>
            </button>
          )}
        </div>

        <img className="itemImg" src={data.url} alt="" />

        <div className="infoBox">
          <p className="title">{data.titlename}</p>

          <ul className="detailList">
            <li>
              <p>Current bid</p>
              <p>Ending in</p>
            </li>
            <li style={{ color: "#fff" }}>
              <p>
                {data.price}&nbsp;{data.unit}
              </p>

              <p>{moment(data.createdat).fromNow()}</p>
            </li>
          </ul>
        </div>
      </Pitem>
    );
}

const Mitem = styled.li`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 100%;
  height: 136.11vw;
  box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.2);
  border-radius: 3.33vw;
  overflow: hidden;
  cursor: pointer;

  .topBar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 16.66vw;
    padding: 0 4.44vw;

    .profBox {
      display: flex;
      align-items: center;
      gap: 2.77vw;
      font-size: 4.44vw;

      img {
        width: 9.44vw;
        height: 9.44vw;
        border-radius: 50%;
        object-fit: cover;
      }
    }

    .likeBtn {
      display: flex;
      align-items: center;
      gap: 1.66vw;
      height: 10.55vw;
      padding: 0 3.61vw;
      font-size: 4.44vw;
      font-weight: 500;
      backdrop-filter: blur(60px);
      border-radius: 8.33vw;

      img {
        height: 4.44vw;
      }
    }
  }

  .itemImg {
    flex: 1;
    width: 100%;
    object-fit: cover;
  }

  .infoBox {
    display: flex;
    flex-direction: column;
    height: 36.66vw;

    .title {
      height: 12.77vw;
      padding: 0 4.44vw;
      font-size: 4.44vw;
      font-weight: 600;
      line-height: 12.77vw;
    }

    .detailList {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 0.55vw;
      padding: 0 4.44vw;
      font-size: 3.88vw;
      font-weight: 500;
      color: #7a7a7a;
      background: #000;

      li {
        display: flex;
        justify-content: space-between;
      }
    }
  }
`;

const Pitem = styled.li`
  display: flex;
  flex-direction: column;
  width: 330px;
  min-width: 330px;
  height: 522px;
  box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;

  .topBar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    padding: 0 16px;

    .profBox {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .likeBtn {
      display: flex;
      align-items: center;
      gap: 6px;
      height: 38px;
      padding: 0 13px;
      font-weight: 500;
      backdrop-filter: blur(60px);
      border-radius: 30px;

      &:hover {
        background: #f6f6f6;
      }
    }
  }

  .itemImg {
    flex: 1;
    width: 100%;
    object-fit: cover;
  }

  .infoBox {
    display: flex;
    flex-direction: column;
    height: 132px;

    .title {
      height: 54px;
      padding: 0 12px;
      font-size: 20px;
      font-weight: 600;
      line-height: 54px;
    }

    .detailList {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 6px;
      padding: 0 12px;
      font-size: 16px;
      font-weight: 500;
      line-height: 19px;
      color: #7a7a7a;
      background: #000;

      li {
        display: flex;
        justify-content: space-between;
      }
    }
  }
`;
