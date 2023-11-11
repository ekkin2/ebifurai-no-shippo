/**
 * App.js
 *
 * This file is the main screen of the application
 * containing the user interface to interact with and
 * communicate with Bao the virtual pet.
 *
 * The user can chat with Bao or interact with him via
 * Hug or Boop actions.
 *
 * Bao responds with variants of derps based on the emotional
 * state of the messages.
 */
import React, { useState } from "react";
import ebifurai from "./images/ebifurai.png";
import hug from "./images/hug.png";
import boop from "./images/boop.png";
import {
  Box,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
} from "@mui/material";

import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";

import BorderLinearProgress from "./components/BorderLinearProgress";
import { generateDerp, getRandomInt } from "./utils/derp";
import "./App.css";

/**
 * @param {string} name text to be displayed on action card
 * @param {Image} img image asset as a local file object to be displayed
 * @param {CallableFunction} onClick callback function on actioncard press
 */
const ActionCard = ({ name, img, onClick }) => {
  return (
    <Card style={{ minWidth: 150, marginRight: 24 }}>
      <CardActionArea onClick={onClick}>
        <CardContent>
          <CardMedia sx={{ height: 140 }} image={img} title="hug" />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography style={{ alignSelf: "center" }}>{name}</Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

function App() {
  const DEFAULT_MESSAGE = {
    message: "hi i'm ebifurai no shippo, but you can call me bao ._.",
    sentTime: "just now",
    sender: "Bao",
  };

  /** Set state variables */
  const [baoIsTyping, setBaoIsTyping] = useState(false);
  const [vibes, setVibes] = useState(50);
  const [messages, setMessages] = useState([DEFAULT_MESSAGE]);

  /**
   * Callback for when message is sent by the user.
   * Will call emotion classifier api and give a response
   * corresponding to the emotion of the message. Also
   * updates vibes according to the emotional state.
   * @param {string} message text input from the user
   */
  const onMessageSend = (message) => {
    setMessages([
      ...messages,
      {
        message: message,
        sentTime: "just now",
        sender: "Me",
        direction: "outgoing",
        position: "normal",
      },
    ]);
    setBaoIsTyping(true);

    // Api call to flask backend (ML emotion model)
    fetch(`http://127.0.0.1:5000/models/${message}`)
      .then((res) => {
        res.json().then((json) => {
          let data = json.data;
          var isSad = false;
          for (let emotionIdx in data) {
            const emotion = data[emotionIdx];

            // Increase vibes if joy is classified
            if (emotion.label === "joy") {
              setVibes(Math.min(100, 1.25 * vibes));
            } else if (emotion.label === "sadness") {
              isSad = true;
              setVibes(0.8 * vibes);
            }
          }

          // Decrease vibes and send energy if sadness is found
          const newDerp = generateDerp();
          setBaoIsTyping(false);
          setMessages([
            ...messages,
            {
              message: message,
              sentTime: "just now",
              sender: "Me",
              direction: "outgoing",
              position: "normal",
            },
            {
              message: isSad ? ";—; (๑;—;)و sending energy ✨" : newDerp,
              sentTime: "just now",
              sender: "Bao",
            },
          ]);
        });
      })
      .catch((err) => {
        // Error on fetch, still show a reply
        console.log("Error fetching emotion...", err);
        const newDerp = generateDerp();
        setBaoIsTyping(false);
        setMessages([
          ...messages,
          {
            message: message,
            sentTime: "just now",
            sender: "Me",
            direction: "outgoing",
            position: "normal",
          },
          {
            message: newDerp,
            sentTime: "just now",
            sender: "Bao",
          },
        ]);
      });
  };

  /**
   * Callback for when hug action card is clicked.
   * Will trigger a derp variant along with two
   * hearts emoji.
   */
  const onHugActionPress = () => {
    /**
     * Choose a random derp output and add it
     * to conversation api
     *
     */
    const newDerp = generateDerp();
    const message = `${newDerp} ${"💕".repeat(getRandomInt(0, 2))}`;
    setBaoIsTyping(true);

    // Set vibes proportional to current vibe
    const newVibes = 1.05 * vibes;
    setVibes(Math.min(100, newVibes));

    // Add derp to conversation, setTimeout to simulate thinking
    setTimeout(() => {
      setBaoIsTyping(false);
      setMessages([
        ...messages,
        {
          message: message,
          sentTime: "just now",
          sender: "Bao",
        },
      ]);
    }, 1500);
  };

  /**
   * Callback for when boop action card is
   * clicked. Will trigger bao to message
   * boop back along with a derp variant.
   */
  const onBoopActionPress = () => {
    const newDerp = generateDerp();
    const message = `boop ${newDerp}`;
    setBaoIsTyping(true);

    // Set timeout to simulate bao thinking
    setTimeout(() => {
      setBaoIsTyping(false);
      setMessages([
        ...messages,
        {
          message: message,
          sentTime: "just now",
          sender: "Bao",
        },
      ]);
    }, 1500);
  };

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "row",
        margin: 12,
      }}
    >
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          padding: 24,
          width: "50%",
          justifyContent: "space-between",
        }}
      >
        {/* FLOATING BAO */}
        <Box>
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: 36,
            }}
          >
            <Typography variant={"h5"} style={{ marginBottom: 24 }}>
              Ebifurai No Shippo (Bao)
            </Typography>
            <img src={ebifurai} className="App-logo" alt="logo" />
          </Box>
          <Box>
            <Typography>Vibes</Typography>
            <BorderLinearProgress variant="determinate" value={vibes} />
          </Box>
        </Box>

        {/* ACTIONS */}
        <Box style={{}}>
          <Typography variant={"h5"}>Actions</Typography>
          <Box style={{ display: "flex", flexDirection: "row" }}>
            <ActionCard name={"Hug"} img={hug} onClick={onHugActionPress} />

            <ActionCard name={"Boop"} img={boop} onClick={onBoopActionPress} />
          </Box>
        </Box>
      </Box>

      {/* CHAT COMPONENT */}
      <Box style={{ height: "100%", width: "50%", padding: 24 }}>
        <MainContainer style={{ height: 800 }}>
          <ChatContainer>
            <MessageList>
              {messages.map((message, idx) => {
                return <Message key={idx} model={message} />;
              })}
            </MessageList>
            <MessageInput
              placeholder="Type a message to Bao here"
              onSend={onMessageSend}
            />
          </ChatContainer>
        </MainContainer>
        {baoIsTyping ? <TypingIndicator content="Bao is musing" /> : <></>}
      </Box>
    </Box>
  );
}

export default App;
