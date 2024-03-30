import styled from "styled-components";
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
  width: 100%;
  background-color: #fff;
  border-radius: 20px;
  padding: 10px 15px;
  margin-bottom: 10px;
`;
const Conversation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
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

export default function SuppoptStaff({ QnA, handleQueastion }) {
  return (
    <>
      <Staff>
        <Avatar></Avatar>
        <ConversationContainer>
          <Conversation>
            {QnA.map((qna, index) => (
              <QuestionButton
                onClick={() => handleQueastion(qna.question, qna.answer)}
                key={index}
                className="hover:bg-secondary hover:text-white hover:border-none"
              >
                {qna.question}
              </QuestionButton>
            ))}
          </Conversation>
        </ConversationContainer>
      </Staff>
    </>
  );
}
