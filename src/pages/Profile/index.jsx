import { useContext } from "react";
import ReactLoading from "react-loading";
import styled from "styled-components";
import { AuthContext } from "../../context/authContext";

const Wrapper = styled.div`
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Title = styled.div`
  padding-bottom: 16px;
  border-bottom: 1px solid #979797;
  font-size: 24px;
  font-weight: bold;
`;

const Photo = styled.img`
  margin-top: 24px;
`;

const Content = styled.div`
  margin-top: 24px;
`;

const LogoutButton = styled.button`
  margin-top: 24px;
`;

const Loading = styled(ReactLoading)`
  margin-top: 50px;
`;

function Profile() {
  // const { user, isLogin, login, logout, loading } = useContext(AuthContext);
  const loading = false;
  const isLogin = true;

  const renderContent = () => {
    if (loading) return <Loading type="spinningBubbles" color="#313538" />;
    if (isLogin)
      return (
        <>
          {/* <Photo src={user.picture} /> */}
          <Content>name</Content>
          <Content>email</Content>
          <LogoutButton>登出</LogoutButton>
        </>
      );
    return <LogoutButton>登入</LogoutButton>;
  };

  return (
    <Wrapper>
      <Title>會員基本資訊</Title>
      {renderContent()}
    </Wrapper>
  );
}

export default Profile;
