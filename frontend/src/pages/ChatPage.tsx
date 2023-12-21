import { Box, Avatar, Typography, Button, IconButton } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import red from "@mui/material/colors/red";
import ChatItem from "../components/chat/ChatItem";
import { IoMdReturnLeft, IoMdSend } from "react-icons/io";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  clearChats,
  getAllChats,
  sendChatRequest,
} from "../helpers/api-communicator";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ChatPage = () => {
  type Message = {
    role: "assistant" | "user";
    content: string;
  };
  const auth = useAuth();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);

  const handleSubmit = async () => {
    const content = inputRef.current?.value as string;
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
    const newMessages: Message = { role: "user", content };
    setChatMessages((prev) => [...prev, newMessages]);
    const chatData = await sendChatRequest(content);
    setChatMessages([...chatData.chats]);
    console.log(chatData);
  };

  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading("Loading Chats", { id: "loadchats" });
      getAllChats()
        .then(({ data }) => {
          setChatMessages(data);
          toast.success("Chats is loaded successfully..", { id: "loadchats" });
        })
        .catch((error) => {
          console.log(error);
          toast.error("Error occured while loading chats", { id: "loadchats" });
        });
    }
  }, [auth]);

  useEffect(() => {
    if (auth?.isLoggedIn) {
      return navigate("/chat");
    }
    return navigate("/login");
  }, [auth]);

  const handleClearChats = async () => {
    try {
      toast.loading("Loading", { id: "deletechats" });
      const data = await clearChats();
      if (data) {
        setChatMessages([]);
        toast.success("Successfully cleared chat messages", {
          id: "deletechats",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Deleting chats failed", { id: "deletechats" });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%",
        mt: 3,
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: { md: "flex", sm: "none", xs: "none" },
          flex: 0.2,
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            bgcolor: "rgb(17,29,39)",
            mx: 3,
            alignItems: "center",
            borderRadius: 5,
          }}
        >
          <Avatar
            sx={{
              my: 2,
              bgcolor: "white",
              color: "black",
              fontWeight: 700,
            }}
          >
            {auth?.user?.name[0]}
          </Avatar>
          <Typography sx={{ fontFamily: "work sans" }}>
            You are talking to a ChatBot
          </Typography>
          <Typography sx={{ fontFamily: "work sans", my: 4, p: 3 }}>
            You can ask some questions related to
            Knowledge,Business,Advices,Education, etc. But avoid sharing
            personal information
          </Typography>
          <Button
            onClick={handleClearChats}
            sx={{
              width: "200px",

              my: "auto",
              color: "white",
              fontWeight: 700,
              borderRadius: 3,
              bgcolor: red[300],
              ":hover": { bgcolor: red.A400 },
            }}
          >
            Clear Conversations
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: { lg: 0.8, md: 0.8, xs: "none", sm: "none" },
          flexDirection: "column",
          px: 3,
        }}
      >
        <Typography
          sx={{
            fontSize: { md: "35px", lg: "3rem", sm: "30px", xs: "30px" },
            color: "white",
            mb: 2,
            mx: "auto",
          }}
        >
          Model - GPT 3.5 Turbo
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            overflowX: "hidden",
            overflowY: "auto",
            scrollBehavior: "smooth",
            width: "100%",
            height: "60vh",
            borderRadius: 3,
            mx: "auto",
          }}
        >
          {chatMessages?.map((chat, index) => (
            <div>
              <ChatItem
                role={chat.role as "assistant" | "user"}
                content={chat.content}
                key={index}
              />
            </div>
          ))}
        </Box>
        <div
          style={{
            width: "100%",

            borderRadius: 8,
            backgroundColor: "rgb(17,27,39)",
            display: "flex",
          }}
        >
          <input
            style={{
              border: "none",
              width: "100%",
              fontSize: "20px",
              padding: "20px",
              color: "white",
              outline: "none",
              backgroundColor: "transparent",
            }}
            ref={inputRef}
            type="text"
          />

          <IconButton
            sx={{ color: "white", ml: "auto", mx: 1 }}
            onClick={handleSubmit}
          >
            <IoMdSend />
          </IconButton>
        </div>
      </Box>
    </Box>
  );
};

export default ChatPage;
