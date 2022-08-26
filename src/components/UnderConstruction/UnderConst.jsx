import styled from "styled-components";
export default function UnderConst() {
  return (
    <Container>
      <h1>We'll be back soon!</h1>
      <p style={{ width: "650px" }}>
        We're very sorry for the inconvenience but we're performing maintenance.
        Please check back soon...
      </p>
      <p>- NIP team 🖤</p>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  font-size: 25px;
`;
