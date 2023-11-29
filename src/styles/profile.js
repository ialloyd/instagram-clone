import styled from 'styled-components';

export const Container = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  margin-top:25px;
`
export const Stat = styled.div`
    font-size:22px;
    display:flex;

`
export const Para = styled.p`
    margin-right:25px;

`
export const Grid = styled.div`
    display:grid;
    grid-template-columns:repeat(3, 1fr);
    gap:25px;
    margin-top:25px;
    margin-bottom:25px;
`