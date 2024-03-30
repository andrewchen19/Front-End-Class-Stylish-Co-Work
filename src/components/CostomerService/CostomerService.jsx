import styled from "styled-components";
import SupportStaff from "./Staff";
import NewConversation from "./NewConversation";
import { useState, useEffect, useRef } from "react";
import api from "../../utils/api";

const ControlButton = styled.button`
  background-image: url("https://cdn.discordapp.com/attachments/1222856873397715045/1223120205794770994/c9524ded74e6bc45.png?ex=6618b275&is=66063d75&hm=544585030756104624087698748d14c921895fdcee7edca26b3efd1b841da760&");
  background-size: 100% 100%;
  position: fixed;
  width: 60px;
  height: 60px;
  top: 60%;
  right: 30px;
  border-radius: 50%;
  background-color: #ccc;
  z-index: 999;
  transition: opacity 0.5s ease-in-out, visibility 0.3s ease-in-out;
  visibility: ${({ chatboxdisplay }) =>
    chatboxdisplay === "true" ? "hidden" : "visible"};
  opacity: ${({ chatboxdisplay }) => (chatboxdisplay === "true" ? 0 : 1)};
`;

const Wrapper = styled.div`
  z-index: 999;
  position: fixed;
  bottom: 0;
  right: 30px;
  width: 430px;
  height: 500px;
  box-shadow: 5px 3px 7px #aaa;
  transition: opacity 0.5s ease-in-out, visibility 0.3s ease-in-out;
  visibility: ${({ chatboxdisplay }) =>
    chatboxdisplay === "true" ? "visible" : "hidden"};
  opacity: ${({ chatboxdisplay }) => (chatboxdisplay === "true" ? 1 : 0)};
`;
const Header = styled.header`
  width: 100%;
  height: 40px;
  line-height: 40px;
  background-color: #3a3a3a;
  color: white;
  text-align: center;
  position: relative;
  button {
    position: absolute;
    right: 15px;
    padding: 0 5px;
  }
`;
const Section = styled.section`
  display: flex;
  flex-direction: column;
  max-height: 376px;
  height: 376px;
  background-color: #eee;
  overflow-y: scroll;
  padding: 0 10px;
`;
const InputDiv = styled.div`
  display: flex;
  align-items: center;
  padding: 0 10px 0 16px;
  height: 83px;
  border-top: 1px solid black;
  display: flex;
  background-color: #fff;
`;
const Input = styled.input`
  flex: 1;
  height: 40px;
  border: 1px solid #3f3a3a;
  border-radius: 8px;
  margin-right: 12px;
  padding-left: 10px;
  outline: none;
`;
const Button = styled.button`
  width: 89px;
  height: 40px;
  border-radius: 8px;
  background-color: #d9d9d9;
`;

//SuppoptStaff

export default function CustomerService() {
  const chatBox = useRef(null);
  const [questions, setQuestions] = useState([]);
  const [chatboxDisplay, setChatboxDisplay] = useState(false);
  const [conversation, setConversation] = useState([]);
  function controlChatbox() {
    setChatboxDisplay((prevState) => !prevState);
  }
  useEffect(() => {
    (async () => {
      const QA = await api.getCostomerServiceQA();
      setQuestions(QA.data);
    })();
  }, []);
  console.log(questions);

  function scrollToBottom() {
    if (chatBox.current) {
      chatBox.current.scrollTop = chatBox.current.scrollHeight;
    }
  }

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  function handleQuestion(question, answer) {
    setConversation((prevConversation) => [
      ...prevConversation,
      { question, answer },
    ]);
  }

  return (
    <>
      <ControlButton
        onClick={controlChatbox}
        chatboxdisplay={chatboxDisplay.toString()}
      ></ControlButton>
      <Wrapper chatboxdisplay={chatboxDisplay.toString()}>
        <Header>
          客服小幫手
          <button onClick={controlChatbox}>X</button>
        </Header>
        <Section ref={chatBox}>
          <SupportStaff
            QnA={questions}
            handleQueastion={handleQuestion}
          ></SupportStaff>
          {conversation?.map((perConver, index) => (
            <NewConversation
              conversation={perConver}
              key={index}
              scrollToBottom={scrollToBottom}
            ></NewConversation>
          ))}
        </Section>
        <InputDiv>
          <Input placeholder="請輸入您要尋問的問題" />
          <Button>發送</Button>
        </InputDiv>
      </Wrapper>
    </>
  );
}
