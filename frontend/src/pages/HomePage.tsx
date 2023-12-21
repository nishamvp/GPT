import { Box } from "@mui/material";
import TypingAnim from "../components/typer/TypingAnim";
import Footer from "../components/footer/footer";

const HomePage = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          justifyContent: "center",
          display: "flex",
        }}
      >
        <TypingAnim />
      </Box>
      <Box
        sx={{
          display: "flex",
          my: 10,
          gap: 5,
          flexDirection: { md: "row", sm: "column", xs: "column" },
        }}
      >
        <img
          style={{ width: "20%", margin: "auto" }}
          src="robot.png"
          alt="robot"
        />
        <img
          className="image-inverted rotate"
          style={{ width: "15%", margin: "auto" }}
          src="openai.png"
          alt="robot"
        />
      </Box>
      <Box sx={{ display: "flex", width: "100%", mx: "auto" }}>
        <img
          style={{
            display: "flex",
            margin: "auto",
            width: "50%",
            boxShadow: "-5px -5px 105px #64f3d5",
            borderRadius: 20,
            marginTop: 20,
            marginBottom: 20,
          }}
          src="chat.png"
          alt="chat"
        />
      </Box>
      <Footer/>
    </Box>
  );
};

export default HomePage;
