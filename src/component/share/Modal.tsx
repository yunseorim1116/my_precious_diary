import styled from "styled-components";
import "../../font.css";

export interface IProps {
  text: string;
}

export const Modal = ({ text }: IProps) => (
  <ModalContainer>
    <ModalWrap>
      <Background>
        <Content>
          <p>{text}</p>
        </Content>
      </Background>
    </ModalWrap>
  </ModalContainer>
);

const ModalWrap = styled.div`
  font-family: "GangwonEdu_OTFBoldA";
  z-index: 9;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Background = styled.div`
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #b5b6b6;
  opacity: 0.9;
  height: 180px;
  width: 300px;
  text-align: center;
`;

const Content = styled.div`
  white-space: nowrap;
  font-size: 32px;
  padding: 40px;
  color: white;
`;
