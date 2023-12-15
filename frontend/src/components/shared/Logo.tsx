import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
const Logo = () => {
  return (
    <div
      style={{
        display: "flex",
        marginRight: "auto",
        alignItems: "center",
        gap: "10px",
        marginTop:"5px"
      }}
    >
      <Link to={"/"}>
        <img
          src="openai.png"
          alt="openAi"
          width={"40px"}
          height={"40px"}
          className="image-inverted"
        />
      </Link>
        <Typography
          sx={{
            display: { md: "block", sm: "none", xs: "none" },
            mr: "auto",
            fontWeight: "800px",
            textShadow: "2px 2px 20px #000",
          }}
        >
          <span style={{ fontSize: "2rem" }}>BOT</span>
          -GPT
        </Typography>
    </div>
  );
};

export default Logo;
