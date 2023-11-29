import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

import convertToUTC from "../UTC_converter";
import Dashboard_Cards from "../../containers/cards";
import firebase_app from "../../Firebase/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Create_pos from "../POS/Create_POS";

import { useSelector } from "react-redux";

const auth = getAuth(firebase_app);

var API_LINK = "http://127.0.0.1:5000/";
var sortedCustomers = "";
var formattedDate;
var formattedTime;

const label = { inputProps: { "aria-label": "Color switch demo" } };

function User_update() {
  const [form_validity, set_form_validity] = useState(false);
  const [selectedStores, setSelectedStores] = useState(["other"]);


  const [roles, setroles] = useState([
    {
      email: "",
      title: "",
      address: "",
      city: "",
      country: "",
      association: "",
      date: "",
      time: "",
    },
  ]);

  //------------------------------------------------------------------------------------------------------------

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });

  const company2 = useSelector((state) => state.users);
    // console.log("showing company2", company2[0]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fname) {
      newErrors.fname = "first name is required";
    }
    if (!formData.lname) {
      newErrors.lname = "last name is required";
    }
    if (!formData.password) {
      newErrors.password = "password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password should be more than 8 characters";
    }

    // if (!formData.email) {
    //   newErrors.email = "Email is required";
    // } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    //   newErrors.email = "Invalid email format";
    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleTextFieldChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = async () => {
    if (form_validity) {
      if (validateForm()) {
        // console.log("Switch Values:", resultArray);
        // console.log("Text Field Values:", formData);

        const requestData = {
          fname: formData.fname,
          lname: formData.lname,
          email: company2[0].email,
          password: formData.password,
        //   company: company2[0].company,
        };
        // console.log("Request Data:", requestData);

        await axios
          .post(API_LINK + "updateAdminUser", requestData)
          .then((response) => {
            if (response.data) {
              console.log("send data to backend :: ", response.data);
            }
          })
          .catch((err) => console.error(err));

        // setSwitchStates([false, false, false, false, false, false, false]);

        setFormData({
          fname: "",
          lname: "",
        //   email: "",
          password: "",
        //   company: "",
        });
        set_form_validity(false);
      }
    }
  };

  const isFormValid = () => {
    const requiredProperties = ["fname", "lname", "password"];
    for (const property of requiredProperties) {
      if (!formData[property]) {
        console.log(`property is ${property} :: ${formData[property]}`);
        set_form_validity(false);
        console.log("showing form validity", form_validity);
        return;
      }
      //   console.log(`in true ,property is ${property} :: ${formData[property]}`);
    }

    set_form_validity(true);
    // console.log("showing form validity", form_validity);
  };

  return (
    <div>
      {/* <Container sx={{ height: "88vh" }}> */}

      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          sx={{
            color: "#593993",
            fontWeight: "bold",
            fontSize: "28px",
            margin: "20px",
          }}
        >
          Update Profile
        </Typography>
        <Grid
          container
          spacing={4}
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={4}>
            <div>
              <TextField
                error={!!errors.fname}
                helperText={errors.fname}
                fullWidth
                margin="normal"
                id="fname"
                label="First Name"
                name="fname"
                autoComplete="fname"
                variant="outlined"
                value={formData.fname}
                onChange={(e) => {
                  handleTextFieldChange("fname", e.target.value);
                  isFormValid();
                }}
                autoFocus
                required
                // sx={{ width: "80%" }}
              />
            </div>
            <div>
              <TextField
                error={!!errors.lname}
                helperText={errors.lname}
                fullWidth
                margin="normal"
                id="lname"
                name="lname"
                label="Last Name"
                variant="outlined"
                autoComplete="lname"
                value={formData.lname}
                onChange={(e) => {
                  handleTextFieldChange("lname", e.target.value);
                  isFormValid();
                }}
                autoFocus
                required
                // sx={{ width: "80%" }}
              />
            </div>
            {/* <div>
              <TextField
                error={!!errors.email}
                helperText={errors.email}
                fullWidth
                label="Email"
                margin="normal"
                id="email"
                variant="outlined"
                autoComplete="email"
                autoFocus
                value={formData.email}
                onChange={(e) => {
                  handleTextFieldChange("email", e.target.value);
                  isFormValid();
                }}
                required
                // sx={{ width: "80%" }}
              />
            </div> */}
            <div>
              <TextField
                error={!!errors.password}
                helperText={errors.password}
                fullWidth
                label="Password"
                margin="normal"
                type="password"
                variant="outlined"
                value={formData.password}
                onChange={(e) => {
                  handleTextFieldChange("password", e.target.value);
                  isFormValid();
                }}
                required

                //   onChange={handleTextFieldChange("password")}
              />
            </div>
            <div style={{ textAlign: "center" }}>
              {form_validity ? (
                <Button
                  //   type="submit"
                  onClick={handleSubmit}
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    background: "linear-gradient(45deg, #593993, #9319B5)",
                    boxShadow: "0 3px 5px 2px rgba(147, 25, 181, .3)",
                    color: "white",
                    width: "50%",
                    borderRadius: "12px",
                  }}
                >
                  Submit
                </Button>
              ) : (
                <Button
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    background: "linear-gradient(45deg, #593993, #9319B5)",
                    boxShadow: "0 3px 5px 2px rgba(147, 25, 181, .3)",
                    color: "white",
                    width: "50%",
                    borderRadius: "12px",
                  }}
                  // onClick={handleSubmit}
                  disabled={!form_validity}
                >
                  Submit
                </Button>
              )}
            </div>
          </Grid>
        </Grid>

        {/* <div> */}

        {/* </div> */}
      </Grid>
      {/* </Container> */}
    </div>
    // </div>
  );
}

export default User_update;
