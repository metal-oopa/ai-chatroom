import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
// import Logout from "./Logout";
import { v4 as uuidv4 } from "uuid";
// import axios from "axios";
// import { sendMessageRoute } from "../utils/APIRoutes";
import { query } from "../utils/query";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ChatContainer({ currentChat }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [past_user_inputs, set_past_user_inputs] = useState([]);
  const [generated_responses, set_generated_responses] = useState([]);
  // const [arrivalMessage, setArrivalMessage] = useState(null);

  // useEffect(() => {
  //   async function getMessages() {
  //     const data = await JSON.parse(
  //       localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
  //     );
  //     const response = await axios.post(recieveMessageRoute, {
  //       from: data._id,
  //       to: currentChat._id,
  //     });
  //     setMessages(response.data);
  //   }

  //   getMessages();

  // }, [currentChat]);

  // useEffect(() => {
  //   const getCurrentChat = async () => {
  //     if (currentChat) {
  //       await JSON.parse(
  //         localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
  //       )._id;
  //     }
  //   };
  //   getCurrentChat();
  // }, [currentChat]);

  const handleSendMsg = async (msg) => {
    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);

    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    const inputs = {
      past_user_inputs: past_user_inputs,
      generated_responses: generated_responses,
      text: msg,
    };

    await query({
      inputs: inputs,
    }).then((response, error) => {

      if (!error && !response.error) {
        msgs.push({ fromSelf: false, message: response.generated_text });
        setMessages(msgs);

        if (!response.error) {
          set_past_user_inputs(response.conversation.past_user_inputs);
          set_generated_responses(response.conversation.generated_responses);

          if (response.conversation.past_user_inputs.length > 2) {
            set_generated_responses(
              response.conversation.generated_responses.splice(0, 1)
            );
            set_past_user_inputs(
              response.conversation.past_user_inputs.splice(0, 1)
            );
          }
        }
      }
      else {
        msgs.push({ fromSelf: false, message: "Sorry, I'm having trouble understanding you. Can you tell me again?" });
      }
    });

    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // useEffect(() => {
  //   if (socket.current) {
  //     socket.current.on("msg-recieve", (msg) => {
  //       setArrivalMessage({ fromSelf: false, message: msg });
  //     });
  //   }
  // }, [socket]);

  // useEffect(() => {
  //   arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  // }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    // toast('The bot can take upto 1 minute to load.', {
    //   position: "top-center",
    //   autoClose: 3000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    // });


  }, []);

  return (
    <>
      <Container>
        <div className="chat-header">
          <div className="user-details">
            <div className="avatar">
              <img
                src={`${currentChat.avatarImage}`}
                style={{ borderRadius: "50%" }}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h3>{currentChat.username}</h3>
            </div>
          </div>
          {/* <Logout /> */}
        </div>
        <div className="chat-messages">
          {messages.map((message) => {
            return (
              <div ref={scrollRef} key={uuidv4()}>
                <div
                  className={`message ${message.fromSelf ? "sended" : "recieved"
                    }`}
                >
                  <div className="content ">
                    <p>{message.message}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <ChatInput handleSendMsg={handleSendMsg} />
        <ToastContainer />
      </Container>
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
`;
