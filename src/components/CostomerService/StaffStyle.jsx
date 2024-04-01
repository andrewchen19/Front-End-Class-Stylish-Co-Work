import React from "react";
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
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const StaffConversation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: auto;
  background-color: #fff;
  border-radius: 20px;
  margin-bottom: 10px;
  padding: 10px 12px;
`;

const StaffItem = ({ children }) => {
  return (
    <Staff>
      <Avatar />
      <ConversationContainer>{children}</ConversationContainer>
    </Staff>
  );
};

export default StaffItem;
export { Staff, Avatar, StaffConversation };
