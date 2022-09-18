import React from "react";
import styled from "styled-components";
import ChatContainer from "../components/ChatContainer";
import Welcome from "../components/Welcome";

export default function Chat() {
  const currentChat = {
    username: "Rintaro AI Bot",
    avatarImage: "https://i.pinimg.com/736x/45/d7/e7/45d7e7fd0a98af2cc964d830b1166af4--stein-gates.jpg",
  };

  return (
    <>
      <Container>
        <div className="container">
          {/* <Contacts contacts={contacts} changeChat={handleChatChange} /> */}
          {currentChat === undefined ? (
            <Welcome />
          ) : (
            <ChatContainer currentChat={currentChat} />
          )}
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 95% 10%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 90% 10%;
    }
  }
`;
