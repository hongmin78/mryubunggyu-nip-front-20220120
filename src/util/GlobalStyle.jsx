import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

  *{
    padding:0;
    margin:0;
    list-style: none;
    text-decoration: none;
    box-sizing: border-box;
    border: none;
    font-family: 'Poppins', sans-serif;
    user-select: none;
  }
  
  
  u{
    text-decoration: underline;
  }
  
  *:link,
  *:visited{
    color:unset;
  }
  
  *::-webkit-scrollbar {
    width: 0;
  }
  
  *:focus{
    outline:none;
  }

  *:disabled{
    cursor: not-allowed;
  }
  
  input{
    outline: none;
    user-select: auto;
    background: unset;
    
    
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }


  label{
    cursor: pointer;
  }

  button{
    background: none;
    cursor: pointer;
  }

  textarea{
    resize: none;
    user-select:auto;
  }

  &#BroadBox {
    background: #373737;
  }

  .noSpace{
    width: 0;
    height: 0;
    position: absolute;
  }

  .defaultPopup {
    width: 500px;
    padding: 40px;
    background: #fff;
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 15px;
    top: 50%;
    left: 50%;
    position: fixed;
    transform: translate(-50%, -50%);
    z-index: 6;
  }
`;

export default GlobalStyle;
