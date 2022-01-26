import styled from "styled-components";

export default function SelectPopup({ off, dataList, select, setFunc }) {
  return (
    <SelectPopupBox className="sortPopup" onClick={() => off()}>
      {dataList.map((cont, index) => (
        <li
          key={index}
          className={select === cont && "select"}
          onClick={() => setFunc(cont)}
        >
          {cont}
        </li>
      ))}
    </SelectPopupBox>
  );
}

const SelectPopupBox = styled.ul`
        width: inherit;
        padding: 6px 10px;
        background: #fff;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
        border-radius: 12px;
        position: absolute;
        transform: translate(0, 10px);
        z-index: 6;

        li {
          display: flex;
          align-items: center;
          height: 46px;
          padding: 0 14px;
          font-size: 16px;
          font-weight: 500;
          border-radius: 8px;
          cursor: pointer;

          &.select {
            color: #fff;
            background: #000;
          }
        }
`;