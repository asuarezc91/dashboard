import styled from "styled-components";

export const MainMenu = styled.div`
  position: absolute;
  right: 0px;
  width: 1100px;
  height: calc(100% - 10px);
  background: #0D0D0D;
  display: flex; 
  flex-direction: column;
  @media (max-width: 1024px) {
    width: 600px;
  }
   
`;

export const Scroll = styled.div`
  position: absolute;
  top: 60px;
  right: 0px;
  width: 1100px;
  background: #0D0D0D;
  height: calc(100% - 60px);
  overflow: overlay;
  display: flex; 
  flex-direction: column;
`;



export const Content = styled.div`
  position: relative;
  left: -10px;
  display: flex; 
  flex-direction: row;
`;

export const DataDashboard = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  width: 200px;
  height: 40px;
  background: #262626;
  margin: 15px; 
  border-style: solid;
  border-width: 1px;
  border-color: #BFBFBF;

`;


export const TextData = styled.p`
  color: #BFBFBF;
  position: relative;
  top: 8px;
  @media (max-width: 1024px) {
    font-size: 9px;
  }
`;


export const TextTittle = styled.p`
  color: #BFBFBF;
  font-weight: bold;
  position: relative;
  top: 8px;
  @media (max-width: 1024px) {
    font-size: 9px;
  }
`;
