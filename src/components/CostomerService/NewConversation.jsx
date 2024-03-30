import styled from "styled-components";
import { useState, useEffect } from "react";
const Staff = styled.div`
  display: flex;
  width: 100%;
  margin-top: 10px;
  gap: 10px;
`;

const Avatar = styled.div`
  background-image: url("https://cdn.discordapp.com/attachments/1222856873397715045/1223120205794770994/c9524ded74e6bc45.png?ex=6618b275&is=66063d75&hm=544585030756104624087698748d14c921895fdcee7edca26b3efd1b841da760&");
  background-size: 100% 100%;
  width: 40px;
  height: 40px;
  border-radius: 25px;
  background-color: #fff;
`;
const ConversationContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;
const Conversation = styled.div`
  max-width: auto;
  background-color: #fff;
  border-radius: 20px;
  margin-bottom: 10px;
  padding: 10px 12px;
`;
const P = styled.p`
  line-height: 1.25rem;
`;

const Customer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 10px;
  gap: 10px;
`;

const CustomerConversation = styled.div`
  background-color: #ffe5be;
  border-radius: 20px;
  margin-bottom: 10px;
  padding: 10px 12px;
  span {
    line-height: 1.25rem;
  }
`;
const YesNoButton = styled.button`
  width: 50px;
  height: 30px;
  background-color: #ddd;
  border-radius: 10px;
  margin-top: 10px;
  margin-right: 20px;
`;

export default function NewConversation({ conversation, scrollToBottom }) {
  const { question, answer } = conversation;
  const [solveProblemChat, setSolveProblemChat] = useState([]);
  const [yseOrNo, setYseOrNo] = useState([]);

  useEffect(() => {
    scrollToBottom();
  }, [solveProblemChat]);

  function handleSolveProblem(boolean) {
    if (boolean) {
      setYseOrNo((prev) => [...prev, "是"]);
      setSolveProblemChat((prevchat) => [
        ...prevchat,
        "謝謝您使用線上客服系統，很高興能解決您的問題",
      ]);
    } else {
      setYseOrNo((prev) => [...prev, "否"]);
      setSolveProblemChat((prevchat) => [
        ...prevchat,
        <>
          麻煩聯絡我們：）
          <br />
          聯絡信箱：stylish@stylish.com
          <br />
          聯絡電話：02-2222-2222
        </>,
      ]);
    }
  }

  return (
    <>
      <>
        <Customer>
          <CustomerConversation>
            <span>{question}?</span>
          </CustomerConversation>
        </Customer>
        <Staff>
          <Avatar></Avatar>
          <ConversationContainer>
            <Conversation>
              <P>{answer}</P>
            </Conversation>
            <Conversation>
              <P>請問有解決您的問題嗎?</P>
              <YesNoButton onClick={() => handleSolveProblem(true)}>
                是
              </YesNoButton>
              <YesNoButton onClick={() => handleSolveProblem(false)}>
                否
              </YesNoButton>
            </Conversation>
            {yseOrNo.map((each) => (
              <Customer>
                <CustomerConversation>
                  <span>{each}</span>
                </CustomerConversation>
              </Customer>
            ))}
            {solveProblemChat.map((perresponse) => (
              <Conversation>
                <P>{perresponse}</P>
              </Conversation>
            ))}
          </ConversationContainer>
        </Staff>
      </>
    </>
  );
}
