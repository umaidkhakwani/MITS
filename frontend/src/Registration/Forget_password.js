import * as React from "react";
import backgroundImage from "../images/login_background.png";
import MITS_logo from "../images/MITS_logo.png";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link, useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import firebase_app from "../Firebase/firebase";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Button, Container, CssBaseline } from "@mui/material";

const defaultTheme = createTheme();

export default function Forget_password() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const [user_create, setUser_create] = useState([
    {
      email: "",
    },
  ]);
  const [errors, setErrors] = useState({
    email: "",
  });

  const auth = getAuth(firebase_app);

  const handle_create_user = (field, value) => {
    // setInventory(event.target.value);
    // console.log("showing", event.target.value);
    setUser_create((prevItem) => ({
      ...prevItem,
      [field]: value,
    }));
    console.log("showing created products", value);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!user_create.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(user_create.email)) {
      newErrors.email = "Invalid email format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setUser_create({
      email: data.get("email"),
    });

    if (validateForm()) {
      // Handle form submission here
      console.log("correct user details :: ", user_create);
      handle_reset_pass();
    }

    console.log({
      email: data.get("email"),
    });
  };

  const handle_reset_pass = async () => {
    try {
      await sendPasswordResetEmail(auth, user_create.email);
      setEmailSent(true);
      console.log("forget pass email sent successfully!");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (


    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Grid
        container
        component="main"
        sx={{
          height: "100vh",
          backgroundImage: `url(${backgroundImage})`, // Set your background image URL here
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid
            id="login-page"
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar> */}

              <img
                id="logo"
                src={MITS_logo} // Replace with the image URL you want to use
                alt="MITS logo"
                // style={{ width: '100px', height: '100px', borderRadius: '50%' }} // Adjust image size and border radius as needed
              />
              <Typography
                id="text"
                component="h1"
                variant="h5"
                sx={{ margin: "10px" }}
              >
                Welcome to MITS!!!
              </Typography>
              <Typography component="h1" variant="h5">
                Forgotton Password
              </Typography>
              {emailSent ? (
                  <p>An email with reset instructions has been sent to your email address.</p>
                ) : (
                  <div>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{
                  mt: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <TextField
                  className="custom-textfield"
                  error={!!errors.email}
                  helperText={errors.email}
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={user_create.email}
                  onChange={(e) => handle_create_user("email", e.target.value)}
                  
                />

                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    background: "linear-gradient(45deg, #593993, #9319B5)",
                    boxShadow: "0 3px 5px 2px rgba(147, 25, 181, .3)",
                    color: "white",
                  }}
                >
                  Send
                </Button>
                <Grid item xs>
                  <Link to="/signup" style={{ textAlign: "center" }}>
                    Don't have an account? Sign Up
                  </Link>
                </Grid>
              </Box>
              </div>)}
            </Box>
          </Grid>
        </Container>
      </Grid>
    </ThemeProvider>

  );
}