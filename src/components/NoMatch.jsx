import styled from "styled-components";
export default function NoMatch() {
  return (
    <Container>
      <h1>Oops not found :(</h1>
      <p style={{ width: "650px", textAlign: "center" }}>
        Probably you are trying to access not existing page... Try again later
        ;)
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
