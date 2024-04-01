import styled from "styled-components";
import StaffItem, { Staff, Avatar, StaffConversation } from "./StaffStyle";
import CustomerItem from "./CusotmerStyle";
import { useState, useEffect, useRef, Fragment } from "react";
import { socket } from "../../utils/socket";
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
const Form = styled.form`
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
const CustomerMsg = styled.span`
  align-self: flex-end;
  background-color: #ffe5be;
  border-radius: 20px;
  margin-bottom: 10px;
  padding: 10px 12px;
`;

const ServiceMsg = styled.span`
  background-color: #fff;
  border-radius: 20px;
  margin-bottom: 10px;
  padding: 10px 12px;
`;
const QuestionButton = styled.button`
  width: auto;
  text-align: left;
  height: 45px;
  background-color: #fff;
  border: 3px solid #ccc;
  border-radius: 15px;
  margin-bottom: 10px;
  padding: 0 20px;
`;
const P = styled.p`
  line-height: 1.25rem;
`;
const YesNoButton = styled.button`
  width: 50px;
  height: 30px;
  background-color: #ddd;
  border-radius: 10px;
  margin-top: 10px;
  margin-right: 20px;
`;

//SuppoptStaff

export default function CustomerService({ serviceMsg, isConnected }) {
  const [allConversation, setAllConversation] = useState([]);

  //initial get QA
  useEffect(() => {
    (async () => {
      const QA = await api.getCostomerServiceQA();
      const newQa = (
        <Fragment>
          <StaffItem>
            <StaffConversation>
              {QA.data.map((qna, index) => (
                <QuestionButton
                  onClick={() => handleQuestion(qna.question, qna.answer)}
                  key={index}
                  className="hover:bg-secondary hover:text-white hover:border-none"
                >
                  {qna.question}
                </QuestionButton>
              ))}
            </StaffConversation>
          </StaffItem>
        </Fragment>
      );
      setAllConversation((prevchat) => [...prevchat, newQa]);
    })();
  }, []);

  // Receive msg from real service
  useEffect(() => {
    setAllConversation((prevServiceMsg) => [
      ...prevServiceMsg,
      <Staff>
        <Avatar />
        <ServiceMsg>{serviceMsg}</ServiceMsg>
      </Staff>,
    ]);
  }, [serviceMsg]);

  //Send a message to customer service.
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(event) {
    event.preventDefault();
    setAllConversation((prevAllConvert) => [
      ...prevAllConvert,
      <CustomerMsg>{value}</CustomerMsg>,
    ]);
    setIsLoading(true);
    socket.timeout(5000).emit("/app/chat.sendMessage", value, () => {
      setIsLoading(false);
    });
    setValue("");
  }

  // Control the screen
  const chatBox = useRef(null);
  const [chatboxDisplay, setChatboxDisplay] = useState(false);

  function controlChatbox() {
    setChatboxDisplay((prevState) => !prevState);
  }
  function scrollToBottom() {
    if (chatBox.current) {
      chatBox.current.scrollTop = chatBox.current.scrollHeight;
    }
  }
  useEffect(() => {
    scrollToBottom();
  }, [allConversation]);

  function handleQuestion(question, answer) {
    setAllConversation((prevchat) => [
      ...prevchat,
      <Fragment>
        <CustomerItem>
          <span>{question}?</span>
        </CustomerItem>
        <StaffItem>
          <StaffConversation>
            <P>{answer}</P>
          </StaffConversation>
          <StaffConversation>
            <P>請問有解決您的問題嗎?</P>
            <YesNoButton onClick={() => handleSolveProblem(true)}>
              是
            </YesNoButton>
            <YesNoButton onClick={() => handleSolveProblem(false)}>
              否
            </YesNoButton>
          </StaffConversation>
        </StaffItem>
      </Fragment>,
    ]);
  }
  function handleSolveProblem(boolean) {
    if (boolean) {
      setAllConversation((prevchat) => [
        ...prevchat,
        <Fragment>
          <CustomerItem>
            <span>是</span>
          </CustomerItem>
          <StaffItem>
            <StaffConversation>
              <P>謝謝您使用線上客服系統，很高興能解決您的問題</P>
            </StaffConversation>
          </StaffItem>
        </Fragment>,
      ]);
    } else {
      setAllConversation((prevchat) => [
        ...prevchat,
        <Fragment>
          <CustomerItem>
            <span>否</span>
          </CustomerItem>
          <StaffItem>
            <StaffConversation>
              <P>
                麻煩聯絡我們：）
                <br />
                聯絡信箱：stylish@stylish.com
                <br />
                聯絡電話：02-2222-2222
              </P>
            </StaffConversation>
          </StaffItem>
        </Fragment>,
        connectSocket(),
      ]);
    }
  }

  const [isConnectedLoading, setIsconnectedLoading] = useState(false);
  function connectSocket() {
    setIsconnectedLoading(true);
    setTimeout(() => {
      socket.connect();
      setIsconnectedLoading(false);
    }, 2000);
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
          {allConversation.map((permsg, index) => (
            <Fragment key={index}>{permsg}</Fragment>
          ))}
          {isConnectedLoading ? <p>連線客服人員中</p> : <></>}
        </Section>
        <Form onSubmit={onSubmit}>
          <Input
            placeholder="請輸入您要尋問的問題"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button type="submit" disabled={isLoading}>
            發送
          </Button>
        </Form>
      </Wrapper>
    </>
  );
}
