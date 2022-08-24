import styled, { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 32px;

  width: 100vw;
  height: 100vh;
`

export const DataContainer = styled.div`
  display: flex;
  align-items: center;

  padding: 0 10vw;

  width: 100%;
`

export const TableContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 40vw;

  gap: 8px;
`

export const ButtonContainer = styled.span`
  display: flex;
  justify-content: flex-end;
`

export const DeleteButton = styled.button`
  padding: 0 8px;
  border: 1px solid red;
  border-radius: 4px;

  font-size: 16px;
  background-color: white;
  color: red;

  :hover{
    cursor: pointer;
    font-weight: bold;
    background-color: red;
    color: white;
  }
`