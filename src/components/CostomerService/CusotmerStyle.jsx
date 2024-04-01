import React from "react";
import styled from "styled-components";

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
const CustomerItem = ({ children }) => {
  return (
    <Customer>
      <CustomerConversation>{children}</CustomerConversation>
    </Customer>
  );
};
export default CustomerItem;
