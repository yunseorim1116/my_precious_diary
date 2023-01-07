import styled from "styled-components";
interface propsType {
  text: string;
  clickFunction?: () => void;
}
const Button = ({ text, clickFunction }: propsType) => {
  return <ShareButton onClick={clickFunction}>{text}</ShareButton>;
};

const ShareButton = styled.button`
  font-family: "FlowerSalt";
  cursor: pointer;
  padding: 15px 20px;
  font-size: 28px;
  font-weight: 800;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  width: auto;
  border: none;
  border-radius: 4px;
  margin-bottom: 15px;
  color: #424242;
`;
export default Button;
