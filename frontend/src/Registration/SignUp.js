import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import firebase_app from "../Firebase/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import axios from "axios";

// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

// // TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
  const [user_create, setUser_create] = useState([
    {
      fname: "",
      lname: "",
      email: "",
      password: "",
    },
  ]);
  const [errors, setErrors] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });

  const auth = getAuth(firebase_app);
  var API_LINK = "http://localhost:5000/";

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
    if (!user_create.fname) {
      newErrors.fname = "first name is required";
    }
    if (!user_create.lname) {
      newErrors.lname = "last name is required";
    }
    if (!user_create.password) {
      newErrors.password = "password is required";
    } else if (user_create.password.length < 8) {
      newErrors.password = "Password should be more than 8 characters";
    }

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
      fname: data.get("fname"),
      lname: data.get("lname"),
      email: data.get("email"),
      password: data.get("password"),
    });

    if (validateForm()) {
      // Handle form submission here
      console.log("correct user details :: ", user_create);
      handleSignUp();
    }

    console.log({
      fname: data.get("fname"),
      lname: data.get("lname"),
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        user_create.email,
        user_create.password
      );
      console.log("User created successfully!");
      axios
      .post(API_LINK + "register", user_create)
      .then((response) => {
        // setProducts(response.data.products);
        console.log("send data to backend :: ", response.data);
        console.log(typeof response.data);
      })
      .catch((err) => console.error(err));

      alert("User Created Successfully!!!")
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                error={!!errors.fname}
                helperText={errors.fname}
                margin="normal"
                required
                fullWidth
                id="fname"
                label="First Name"
                name="fname"
                value={user_create.fname}
                autoComplete="fname"
                onChange={(e) => handle_create_user("fname", e.target.value)}
                autoFocus
              />
              <TextField
                error={!!errors.lname}
                helperText={errors.lname}
                margin="normal"
                required
                fullWidth
                id="lname"
                label="Last Name"
                name="lname"
                autoComplete="lname"
                autoFocus
                value={user_create.lname}
                onChange={(e) => handle_create_user("lname", e.target.value)}
              />

              <TextField
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

              <TextField
                error={!!errors.password}
                helperText={errors.password}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={user_create.password}
                onChange={(e) => handle_create_user("password", e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="/forget_pass" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/">Already a member? Login</Link>
                </Grid>
              </Grid>
              {/* <Copyright sx={{ mt: 5 }} /> */}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
