import { Box, Button, Typography } from "@mui/material";
import CustomizedInput from "../components/shared/CustomizedInput.tsx";
import { IoIosLogIn } from "react-icons/io";
import { useAuth } from "../context/AuthContext.tsx";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const SignupPage = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as String;
    const email = formData.get("email") as String;
    const password = formData.get("password") as String;
    try {
      toast.loading("Signing Up", { id: "signup" });
      await auth?.signup(name, email, password);
      navigate("/");
      toast.success("Signed Up Successfully..", { id: "signup" });
    } catch (error) {
      console.log(error);
      toast.error("Signed Up Failed..", { id: "signup" });
    }
  };
  useEffect(() => {
    if (auth?.isLoggedIn) {
      return navigate("/");
    }
  }, [auth]);
  return (
    <Box width={"100%"} height={"100%"} display={"flex"} flex={1}>
      <Box display={{ md: "flex", sm: "none", xs: "none" }} padding={8} mt={8}>
        <img src="airobot.png" alt="" style={{ width: "400px" }} />
      </Box>
      <Box
        display={"flex"}
        flex={{ xs: 1, md: 0.5 }}
        justifyContent={"center"}
        alignItems={"center"}
        padding={2}
        ml={"auto"}
        mt={16}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            margin: "auto",
            padding: "30px",
            boxShadow: "10px 10px 20px #000",
            borderRadius: "10px",
            border: "none",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h4"
              textAlign="center"
              padding={2}
              fontWeight="600"
            >
              Signup
            </Typography>
            <CustomizedInput name="name" type="text" label="Name" />
            <CustomizedInput name="email" type="email" label="Email" />
            <CustomizedInput name="password" type="password" label="Password" />
            <Button
              type="submit"
              endIcon={<IoIosLogIn />}
              sx={{
                px: 2,
                py: 1,
                mt: 2,
                width: "400px",
                borderRadius: 2,
                bgcolor: "#00fffc",
                color: "white",
                ":hover": { bgcolor: "white", color: "black" },
              }}
            >
              Signup
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default SignupPage;
