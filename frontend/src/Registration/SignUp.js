import * as React from "react";
import Avatar from "@mui/material/Avatar";

import Button from "@mui/material/Button";
import backgroundImage from "../images/login_background.png";
// import signup_container_background from "../images/signup_container_background.png";
import signup_container_background2 from "../images/signup_container_background2.png";
import MITS_logo from "../images/MITS_logo.png";
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
import axios from "axios";
import { Container, Stack } from "@mui/material";
import ImageSlider from "./imageSlider";
import "../css/styles.css";

import firebase_app from "../Firebase/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


const auth = getAuth(firebase_app);
var API_LINK = "http://localhost:5000/";

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
  const [checkboxChecked, setCheckboxChecked] = useState(false);


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

      alert("User Created Successfully!!!");
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
          <Box
            sx={{
              width: {
                sm: "90vw",
                xs: "90vw",
                md: "60vw",
                lg: "60vw",
                xl: "60vw",
              },
            }}
          >
            <Grid container height="80vh">
              <Grid
                className="signup-container1"
                xs={12}
                sm={12}
                md={6}
                lg={6}
                xl={6}
                minHeight={450}
                sx={{
                  // boxShadow: "0px 4px 18px rgba(0, 0, 0, 0.75)",
                  borderRadius: {
                    xs: "30px",
                    sm: "30px",
                    md: "30px 0 0 30px",
                    lg: "30px 0 0 30px",
                    xl: "30px 0 0 30px",
                  },
                }}
              >
                <Box
                  sx={{
                    // backgroundColor: "rgba(0, 24, 57, 0.2)",
                    opacity: 0.8,
                    backgroundColor: "#FFF",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    borderRadius: {
                      xs: "30px",
                      sm: "30px",
                      md: "30px 0 0 30px",
                      lg: "30px 0 0 30px",
                      xl: "30px 0 0 30px",
                    },
                  }}
                >
                  <Box
                    sx={{
                      my: 8,
                      mx: 4,
                      width: "80%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    {/* ------------------------------------------- SIGNUP  ----------------------------------------------------- */}

                    {/* <Typography component="h1" variant="h5">
                      Sign Up
                    </Typography> */}
                    <Box
                      component="form"
                      noValidate
                      onSubmit={handleSubmit}
                      sx={{
                        mt: 1,
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <TextField
                        className="custom-textfield"
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
                        onChange={(e) =>
                          handle_create_user("fname", e.target.value)
                        }
                        autoFocus
                      />
                      <TextField
                        className="custom-textfield"
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
                        onChange={(e) =>
                          handle_create_user("lname", e.target.value)
                        }
                      />

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
                        onChange={(e) =>
                          handle_create_user("email", e.target.value)
                        }
                      />

                      <TextField
                        className="custom-textfield"
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
                        onChange={(e) =>
                          handle_create_user("password", e.target.value)
                        }
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={checkboxChecked}
                            onChange={(e) =>
                              setCheckboxChecked(e.target.checked)
                            }
                            required
                          />
                        }
                        label="I agree to the terms and conditions"
                      />
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{
                          mt: 3,
                          mb: 2,
                          background:
                            "linear-gradient(45deg, #593993, #9319B5)",
                          boxShadow: "0 3px 5px 2px rgba(147, 25, 181, .3)",
                          color: "white",
                        }}
                        disabled={!checkboxChecked}
                      >
                        Sign Up
                      </Button>
                      <Grid container>
                        <Grid item>
                          <div style={{ whiteSpace: "pre-line" }}>
                            <Link to="/">Already a member? Login</Link>
                          </div>
                        </Grid>
                      </Grid>
                    </Box>
                    {/* ------------------------------------------------------------------------------------------------ */}
                  </Box>
                </Box>
              </Grid>

              {/* ------------------------------------------------  SIDE GRID ---------------------------------------------------- */}

              <Grid
                xs={0}
                sm={0}
                md={6}
                lg={6}
                xl={6}
                minHeight={550}
                sx={{
                  // boxShadow: "0px 4px 18px rgba(0, 0, 0, 0.75)",
                  borderRadius: {
                    xs: "30px",
                    sm: "30px",
                    md: "30px 0 0 30px",
                    lg: "30px 0 0 30px",
                    xl: "30px 0 0 30px",
                  },
                }}
              >
                <Box
                  className="signup-container2"
                  sx={{
                    backgroundImage: `url(${signup_container_background2})`,
                    padding: "20px",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    display: {
                      xs: "none",
                      sm: "none",
                      md: "flex",
                      lg: "flex",
                      xl: "flex",
                    },
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    borderRadius: "0px 30px 30px 0",
                    // boxShadow: "0px 4px 18px rgba(0, 0, 0, 0.75)", // Top and bottom shadows
                    // boxShadow: "4px 0px 18px rgba(0, 0, 0, 0.75)", // Right shadow

                    position: "relative",
                  }}
                >
                  <div
                    id="signup-logo"
                    style={{
                      position: "absolute",
                      top: "20px",
                      left: "20px",
                      zIndex: 1,
                      width: "110px",
                      height: "100px",
                      backgroundImage: `url(${MITS_logo})`, // Set the background image here
                      backgroundRepeat: "no-repeat", // Prevent the background image from repeating
                      backgroundSize: "cover", // Adjust the background size as needed
                    }}
                  ></div>
                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Typography
                      variant="h2"
                      fontWeight="bold"
                      color="whitesmoke"
                      mb={3}
                    >
                      MITS
                    </Typography>

                    <Typography
                            variant="h6"
                      fontWeight="bold"
                      color="whitesmoke"
                      mb={3}
                    >
                      MEPTICS INVENTORY TRACKING SYSTEM
                    </Typography>

                    <ImageSlider />
                  </Box>
                </Box>
              </Grid>

              {/* ---------------------------------------------------------------------------------------------------- */}
            </Grid>
          </Box>
        </Container>
      </Grid>

      {/* <Grid
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
                  onChange={(e) =>
                    handle_create_user("password", e.target.value)
                  }
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
              </Box>
            </Box>
          </Grid>
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
        </Container>
      </Grid> */}
    </ThemeProvider>

    // <ThemeProvider theme={defaultTheme}>
    //   <Grid container component="main" sx={{ height: "100vh" }}>
    //     <CssBaseline />
    //     <Grid
    //       item
    //       xs={false}
    //       sm={4}
    //       md={7}
    //       sx={{
    //         backgroundImage:
    //           "url(https://source.unsplash.com/random?wallpapers)",
    //         backgroundRepeat: "no-repeat",
    //         backgroundColor: (t) =>
    //           t.palette.mode === "light"
    //             ? t.palette.grey[50]
    //             : t.palette.grey[900],
    //         backgroundSize: "cover",
    //         backgroundPosition: "center",
    //       }}
    //     />
    //     <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
    //       <Box
    //         sx={{
    //           my: 8,
    //           mx: 4,
    //           display: "flex",
    //           flexDirection: "column",
    //           alignItems: "center",
    //         }}
    //       >
    //         <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
    //           <LockOutlinedIcon />
    //         </Avatar>
    //         <Typography component="h1" variant="h5">
    //           Sign Up
    //         </Typography>
    //         <Box
    //           component="form"
    //           noValidate
    //           onSubmit={handleSubmit}
    //           sx={{ mt: 1 }}
    //         >
    //           <TextField
    //             error={!!errors.fname}
    //             helperText={errors.fname}
    //             margin="normal"
    //             required
    //             fullWidth
    //             id="fname"
    //             label="First Name"
    //             name="fname"
    //             value={user_create.fname}
    //             autoComplete="fname"
    //             onChange={(e) => handle_create_user("fname", e.target.value)}
    //             autoFocus
    //           />
    //           <TextField
    //             error={!!errors.lname}
    //             helperText={errors.lname}
    //             margin="normal"
    //             required
    //             fullWidth
    //             id="lname"
    //             label="Last Name"
    //             name="lname"
    //             autoComplete="lname"
    //             autoFocus
    //             value={user_create.lname}
    //             onChange={(e) => handle_create_user("lname", e.target.value)}
    //           />

    //           <TextField
    //             error={!!errors.email}
    //             helperText={errors.email}
    //             margin="normal"
    //             required
    //             fullWidth
    //             id="email"
    //             label="Email Address"
    //             name="email"
    //             autoComplete="email"
    //             autoFocus
    //             value={user_create.email}
    //             onChange={(e) => handle_create_user("email", e.target.value)}
    //           />

    //           <TextField
    //             error={!!errors.password}
    //             helperText={errors.password}
    //             margin="normal"
    //             required
    //             fullWidth
    //             name="password"
    //             label="Password"
    //             type="password"
    //             id="password"
    //             autoComplete="current-password"
    //             value={user_create.password}
    //             onChange={(e) => handle_create_user("password", e.target.value)}
    //           />
    //           <Button
    //             type="submit"
    //             fullWidth
    //             variant="contained"
    //             sx={{ mt: 3, mb: 2 }}
    //           >
    //             Sign Up
    //           </Button>
    //           <Grid container>
    //             <Grid item xs>
    //               <Link to="/forget_pass" variant="body2">
    //                 Forgot password?
    //               </Link>
    //             </Grid>
    //             <Grid item>
    //               <Link to="/">Already a member? Login</Link>
    //             </Grid>
    //           </Grid>
    //         </Box>
    //       </Box>
    //     </Grid>
    //   </Grid>
    // </ThemeProvider>

    // <ThemeProvider theme={defaultTheme}>
    //   <CssBaseline />
    //   <Grid
    //     container
    //     component="main"
    //     sx={{
    //       height: "100vh",
    //       backgroundImage: `url(${backgroundImage})`, // Set your background image URL here
    //       backgroundRepeat: "no-repeat",
    //       backgroundSize: "cover",
    //       backgroundPosition: "center",
    //     }}
    //   >
    //     <Container
    //       sx={{
    //         display: "flex",
    //         justifyContent: "center",
    //         alignItems: "center",
    //       }}
    //     >
    //       <Grid
    //         id="login-page"
    //         item
    //         xs={12}
    //         sm={8}
    //         md={5}
    //         component={Paper}
    //         elevation={6}
    //         square
    //       >
    //         <Box
    //           sx={{
    //             my: 8,
    //             mx: 4,
    //             display: "flex",
    //             flexDirection: "column",
    //             alignItems: "center",
    //           }}
    //         >
    //           {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
    //     <LockOutlinedIcon />
    //   </Avatar> */}

    //           <img
    //             id="logo"
    //             src={MITS_logo} // Replace with the image URL you want to use
    //             alt="MITS logo"
    //             // style={{ width: '100px', height: '100px', borderRadius: '50%' }} // Adjust image size and border radius as needed
    //           />
    //           <Typography
    //             id="text"
    //             component="h1"
    //             variant="h5"
    //             sx={{ margin: "10px" }}
    //           >
    //             Welcome to MITS!!!
    //           </Typography>
    //           <Box
    //             component="form"
    //             noValidate
    //             onSubmit={handleSubmit}
    //             sx={{
    //               mt: 1,
    //               display: "flex",
    //               flexDirection: "column",
    //               alignItems: "center",
    //             }}
    //           >
    //             <TextField
    //               error={!!errors.fname}
    //               helperText={errors.fname}
    //               margin="normal"
    //               required
    //               fullWidth
    //               id="fname"
    //               label="First Name"
    //               name="fname"
    //               value={user_create.fname}
    //               autoComplete="fname"
    //               onChange={(e) => handle_create_user("fname", e.target.value)}
    //               autoFocus
    //               sx={{
    //                 borderRadius: "14px",
    //                 background: "#593993",
    //                 width: "400px",
    //                 "& .MuiInputLabel-root": {
    //                   color: "#fff", // Change label color to #fff
    //                 },
    //               }}
    //             />
    //             <TextField
    //               error={!!errors.lname}
    //               helperText={errors.lname}
    //               margin="normal"
    //               required
    //               fullWidth
    //               id="lname"
    //               label="Last Name"
    //               name="lname"
    //               autoComplete="lname"
    //               autoFocus
    //               value={user_create.lname}
    //               onChange={(e) => handle_create_user("lname", e.target.value)}
    //               sx={{
    //                 borderRadius: "14px",
    //                 background: "#593993",
    //                 width: "400px",
    //                 "& .MuiInputLabel-root": {
    //                   color: "#fff", // Change label color to #fff
    //                 },
    //               }}
    //             />

    //             <TextField
    //               error={!!errors.email}
    //               helperText={errors.email}
    //               margin="normal"
    //               required
    //               fullWidth
    //               id="email"
    //               label="Email Address"
    //               name="email"
    //               autoComplete="email"
    //               autoFocus
    //               value={user_create.email}
    //               onChange={(e) => handle_create_user("email", e.target.value)}
    //               sx={{
    //                 borderRadius: "14px",
    //                 background: "#593993",
    //                 width: "400px",
    //                 "& .MuiInputLabel-root": {
    //                   color: "#fff", // Change label color to #fff
    //                 },
    //               }}
    //             />

    //             <TextField
    //               error={!!errors.password}
    //               helperText={errors.password}
    //               margin="normal"
    //               required
    //               fullWidth
    //               name="password"
    //               label="Password"
    //               type="password"
    //               id="password"
    //               autoComplete="current-password"
    //               value={user_create.password}
    //               onChange={(e) =>
    //                 handle_create_user("password", e.target.value)
    //               }
    //               sx={{
    //                 borderRadius: "14px",
    //                 background: "#593993",
    //                 width: "400px",
    //                 "& .MuiInputLabel-root": {
    //                   color: "#fff", // Change label color to #fff
    //                 },
    //               }}
    //             />
    //             <Button
    //               type="submit"
    //               variant="contained"
    //               sx={{
    //                 mt: 3,
    //                 mb: 2,
    //                 background: "linear-gradient(45deg, #593993, #9319B5)",
    //                 boxShadow: "0 3px 5px 2px rgba(147, 25, 181, .3)",
    //                 color: "white",
    //               }}
    //             >
    //               Sign In
    //             </Button>
    //             <Grid container>
    //               <Grid item xs>
    //                 <Link to="/forget_pass" variant="body2">
    //                   Forgot password?
    //                 </Link>
    //               </Grid>
    //               <Grid item>
    //                 <Link to="/">Already a member? Login</Link>
    //               </Grid>
    //             </Grid>
    //           </Box>
    //         </Box>
    //       </Grid>
    //     </Container>
    //   </Grid>
    // </ThemeProvider>
  );
}
