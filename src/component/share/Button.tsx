interface propsType {
  text: string;
  clickFunction?: () => void;
}
const Button = ({ text, clickFunction }: propsType) => {
  return <button onClick={clickFunction}>{text}</button>;
};

export default Button;
