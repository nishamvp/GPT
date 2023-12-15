import { Avatar, Box, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";

const ChatItem = ({
  role,
  content,
  
}: {
  role: "user" | "assistant";
  content: string;
}) => {
  const auth = useAuth();

  return (
    <Box
 
      sx={{
        display: "flex",
        mt: 3,
        bgcolor: role === "assistant" ? "#004d5612" : "#004d56",
        p: 2,
        borderRadius: 3,
        my: 2,
        gap: 2,
        alignItems: "center",
      }}
    >
      <Avatar
        sx={{
          ml: "0",
          bgcolor: role === "user" ? "black" : "",
          color: role === "user" ? "white" : "",
        }}
      >
        {role === "assistant" ? (
          <img
            style={{ objectFit: "cover", width: "30px" }}
            src="openai.png"
            alt="assistant"
          />
        ) : (
          <span> {auth?.user?.name[0]}</span>
        )}
      </Avatar>
      <Box>
        <Typography sx={{ fontSize: "20px" }}>{content}</Typography>
      </Box>
    </Box>
  );
};

export default ChatItem;
