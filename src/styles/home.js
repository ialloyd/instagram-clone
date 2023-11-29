import styled from 'styled-components';

export const Container= styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  margin-top:10px;
`

export const Card=styled.div`
  border:1px solid lightgray;
  border-radius:10px;
  margin:10px 0;
`;

export const CardTop=styled.div`
  width:100%;
  padding:10px;
  display:flex;
  align-items:center;

`
export const CardImage=styled.img`
  width:500px;
  height:400px;
  padding:5px;
`

export const CardBottom=styled.div`
  width:100%;
  padding:15px;
`

export const CommentSection =styled.div`
  width:100%;
  margin-top:10px;
  padding:10px;
  display:flex;
  justify-content:space-between;
  align-items:center;
  border:1px solid lightgray;
  border-radius:5px;
`
export const StyledInput = styled.input`
  padding: 5px;
  width: 80%;
  border: none;
  outline: none;
`