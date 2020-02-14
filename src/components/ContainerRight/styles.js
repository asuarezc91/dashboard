import styled from "styled-components";

export const MainMenu = styled.div`
  position: absolute;
  right: 0px;
  width: 950px;
  height: calc(100% - 10px);
  background: #0D0D0D;
  display: flex; 
  flex-direction: column;
`;

export const Content = styled.div`
  display: flex; 
  flex-direction: row;
`;

export const DataDashboard = styled.div`
  display: flex;
  justify-content: center;
  aling-items: center;
  width: 200px;
  height: 40px;
  background: #262626;
  margin: 10px; 
`;

export const TextData = styled.p`
  color: #BFBFBF;
`;


export const TextTittle = styled.p`
  color: #BFBFBF;
  font-weight: bold;
`;
