// import { useContext } from "react";
import ReactLoading from "react-loading";
import styled from "styled-components";
// import { AuthContext } from "../../context/authContext";
import avatarImg from "../../assets/avatar.svg";
import yellowCoin from "../../assets/y-coin.png";
import { useGlobalContext } from "../../context/globalContext";

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

const Loading = styled(ReactLoading)`
  margin-top: 50px;
`;

function Profile() {
  // const { user, isLogin, login, logout, loading } = useContext(AuthContext);
  const loading = false;
  const isLogin = true;
  const { setShouldModalOpen } = useGlobalContext();

  const loginHandler = () => {
    return null;
  };

  const logoutHandler = () => {
    return null;
  };

  const coinHandler = () => {
    setShouldModalOpen(true);
  };

  const renderContent = () => {
    if (loading) return <Loading type="spinningBubbles" color="#313538" />;
    if (isLogin)
      return (
        <>
          <div className="flex justify-center items-center gap-10">
            <div>
              <img
                src={avatarImg}
                alt="avatar-icon"
                className="mt-6 h-48 w-48"
              />
              <button
                className="mt-6 border-2 border-gray-300 px-4 py-2 font-bold rounded-lg tracking-wide hover:bg-secondary hover:border-transparent hover:text-white"
                onClick={logoutHandler}
              >
                登出
              </button>
            </div>

            <div className="-mt-8 flex flex-col justify-start">
              <div className="mt-6 flex items-center gap-4">
                <p className="font-bold capitalize text-xl">名字:</p>
                <span className="font-bold text-gray-500 capitalize text-xl">
                  Andrew
                </span>
              </div>
              <div className="mt-6 flex items-center gap-4">
                <p className="font-bold capitalize text-xl">信箱:</p>
                <span className="font-bold text-gray-500 text-xl">
                  andrew@gmail.com
                </span>
              </div>
              <div className="mt-8 flex items-center gap-4">
                <p className="font-bold capitalize text-xl flex items-center">
                  我的
                  <img
                    src={yellowCoin}
                    alt="yellow-coin-icon"
                    className="w-7 h-7 hover:cursor-pointer"
                    onClick={coinHandler}
                  />
                  幣:
                </p>

                <span className="font-bold text-gray-500 text-xl">$24</span>
              </div>
            </div>
          </div>
        </>
      );
    return (
      <>
        <div className="flex flex-col gap-y-2 mt-6">
          <label htmlFor="email" className="text-sm font-semibold">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="flex flex-col gap-y-2 mt-6">
          <label htmlFor="password" className="text-sm font-semibold">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <button
          className="mt-6 border-2 border-gray-300 px-4 py-2 font-bold rounded-lg tracking-wide hover:bg-secondary hover:border-transparent hover:text-white"
          onClick={loginHandler}
        >
          登入
        </button>
      </>
    );
  };

  return (
    <Wrapper>
      <Title>會員基本資訊</Title>
      {renderContent()}
    </Wrapper>
  );
}

export default Profile;
