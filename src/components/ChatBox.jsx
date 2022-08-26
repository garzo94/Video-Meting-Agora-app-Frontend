import AgoraRTM from "agora-rtm-sdk";
import { v4 as uuidv4 } from "uuid";
import "../App.css";
import useMeeting from "../globalVariables/MeetingContext";
import DialogTime from "./DialogTime";
import { Box } from "@mui/material";

const APP_ID = "e00fc18b59d448278a3dfaf71de5b2d9";

let client = AgoraRTM.createInstance(APP_ID);
let uid = uuidv4();

import React, { useEffect, useRef, useState } from "react";

export default function ChatBox({ CHANNEL, timeDisable, chat }) {
  const {
    MessagesVar,
    messagesVar,
    extendMeeting,
    extendMeetingBack,
    extendMeetingBackMessage,
    ExtendMeetingBackMessage,
  } = useMeeting();
  const [theirMessages, setTheirMessages] = useState([]);
  const messagesRef = useRef();
  const [messages, setMessages] = useState([]);
  const [messageBack, setmessageBack] = useState("");
  const [extendMessage, setExtendMessage] = useState("");

  const [text, setText] = useState("");
  const [channel, setChannel] = useState(null);
  const [dialog, setDialog] = useState(null);
  const display = chat ? "block" : "none";

  console.log(extendMeetingBackMessage, "kkk");


  const appendMessage = (message) => {
    setMessages((messages) => [...messages, message]);
  };

  useEffect(() => {
    if (messageBack === "Yes" || messageBack === "No") {
      ExtendMeetingBackMessage(messageBack);
    }
  }, [messageBack]);

  useEffect(() => {
    if (messagesVar === false && theirMessages.length === 0) {
      return;
    }
    if (messagesVar === false) {
      MessagesVar(true);
    }
  }, [theirMessages]);

  useEffect(() => {
    if (extendMessage === "Extending Meeting" && timeDisable === false) {
      setDialog(<DialogTime openDialog={timeDisable} />);
    }
  }, [extendMessage, timeDisable]);

  useEffect(() => {
    const connect = async () => {
      await client.login({ uid, token: null });
      const channel = await client.createChannel(CHANNEL);
      await channel.join();
      channel.on("ChannelMessage", (message, peerId) => {
        if (message.text === "Extending Meeting") {
          setExtendMessage(message.text);
        } else if (message.text === "Yes" || message.text === "No") {
          setmessageBack(message.text);
        } else {
          appendMessage({
            text: message.text,
            uid: peerId,
          });

          setTheirMessages((msg) => [...msg, message.text]);
        }
      });

      setChannel(channel);
      return channel;
    };
    const connection = connect();

    return () => {
      const disconnect = async () => {
        const channel = await connection;
        await channel.leave();
        await client.logout();
      };
      disconnect();
    };
  }, []);

  useEffect(() => {
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [messages]);

  const sendMessage = (e) => {
    if (e) {
      e.preventDefault();
    }

    if (extendMeeting === true) {
      channel.sendMessage({ text: "Extending Meeting", type: "text" });
      setExtendMessage("Extending Meeting");
    }
    if (extendMeetingBack === true) {
      channel.sendMessage({ text: extendMeetingBackMessage, type: "text" });
      setmessageBack(extendMeetingBackMessage);
    }
    // setextendMeeting(true);
    if (text === "") return;
    channel.sendMessage({ text, type: "text" });
    appendMessage({
      text: text,
      uid,
    });
    setText("");
  };

  useEffect(() => {
    if (extendMeeting === true) {
      sendMessage();
    }
  }, [extendMeeting]);

  useEffect(() => {
    if (extendMeetingBack === true) {
      sendMessage();
    }
  }, [extendMeetingBack]);

  return (
    <Box>
      <main
        className="main"
        style={{
          position: "absolute",
          right: "80px",
          bottom: "15px",
          display: display,
        }}
      >
        <div className="panel">
          <div className="messages" ref={messagesRef}>
            <div className="inner">
              {messages.map((message, idx) => (
                <div key={idx} className="message">
                  {message.uid === uid && (
                    <div className="user-self">You:&nbsp;</div>
                  )}
                  {message.uid !== uid && (
                    <div className="user-them">Them:&nbsp;</div>
                  )}
                  <div className="text">{message.text}</div>
                </div>
              ))}
            </div>
          </div>

          <form className="form" onSubmit={sendMessage}>
            <input
              className="input"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button className="button">+</button>
          </form>
        </div>
      </main>
      {dialog}
    </Box>
  );
}
