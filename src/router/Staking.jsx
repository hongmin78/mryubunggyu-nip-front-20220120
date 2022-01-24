import styled from "styled-components";
import B_staking from "../img/staking/B_staking.png";

export default function Staking() {
  return (
    <StakingBox>
      <article className="imgContainer"></article>

      <article className="settingContainer"></article>
    </StakingBox>
  );
}

const StakingBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 92px;
  height: 100vh;
  background: #000;
  background-image: url(${B_staking});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  .imgContainer {
    width: 404px;
    height: 538px;
    background: #000;
    box-shadow: 0px 0px 60px rgba(255, 255, 255, 0.4);
    border-radius: 12px;
  }

  .settingContainer {
  }
`;
