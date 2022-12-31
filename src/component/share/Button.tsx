import styled from "styled-components";
interface propsType {
  text: string;
  clickFunction?: () => void;
}
const Button = ({ text, clickFunction }: propsType) => {
  return <ShareButton onClick={clickFunction}>{text}</ShareButton>;
};
const ShareButton = styled.button`
  cursor: pointer;
  padding: 8px 15px;
  font-size: 12px;
  font-weight: 400;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  width: auto;
  border: none;
  border-radius: 4px;
`;
export default Button;
