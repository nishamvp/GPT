import { Avatar, Box, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import hljs from "highlight.js";


const extraCodeFromString = (message: string) => {
  if (message.includes("```")) {
    const blocks = message.split("```");
    return blocks;
  }
};

const isCodeBlock = (str: string) => {
  if (
    str.includes("=") ||
    str.includes(",") ||
    str.includes("{") ||
    str.includes("}") ||
    str.includes("[") ||
    str.includes("]") ||
    str.includes(",") ||
    str.includes("#") ||
    str.includes("//")
  ) {
    return true;
  }
  return false;
};

const detectLanguage = (code: string) => {
  const result = hljs.highlightAuto(code);
  return result.language || "plaintext";
};

const ChatItem = ({
  role,
  content,
}: {
  role: "user" | "assistant";
  content: string;
}) => {
  
  const auth = useAuth();
  

  const messageBlocks = extraCodeFromString(content);

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
        {!messageBlocks && (
          <Typography sx={{ fontSize: "20px" }}>{content}</Typography>
        )}
        {messageBlocks &&
          messageBlocks.length &&
          messageBlocks.map((block) =>
            isCodeBlock(block) ? (
              <>
                <SyntaxHighlighter
                  language={detectLanguage(block)}
                  style={coldarkDark}
                >
                  {block}
                </SyntaxHighlighter>
              </>
            ) : (
              <>
                <Typography sx={{ fontSize: "20px" }}>{content}</Typography>
              </>
            )
          )}
      </Box>
    </Box>
  );
};

export default ChatItem;
