import styled from "styled-components";

const Select = styled.select`
  width: 30%;
  height:35px;
  background: white;
  color: gray;
  padding-left: 6px;
  font-size: 14px;
  border:none;
  margin-left: 10px;
  margin-top: 10px;

       option {
         color: black;
         background: white;
         font-weight: small;
         display: flex;
         white-space: pre;
         min-height: 20px;
         padding: px 2px 1px;
       }
`;

export default Select;