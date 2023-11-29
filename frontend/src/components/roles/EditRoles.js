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

function EditRoles(props) {
  var warehouse_data = props.warehouse_data;
  var warehouseTitles = warehouse_data.map((item) => item.title);

  // Define the specified titles
  var specifiedTitles = [
    "All Warehouses and POS",
    "Add, View, Edit Role",
    "Add Warehouse and POS",
    "View Warehouse and POS",
    "Add Products",
    "Manage POS",
    "Handle Single POS",
    "View Analytics",
  ];

  // Combine warehouseTitles and specifiedTitles into titlesArray
  var titlesArray = warehouseTitles.concat(specifiedTitles);

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

  const [switchStates, setSwitchStates] = useState(
    titlesArray.map(() => false)
  );

  //   const [switchStates, setSwitchStates] = useState([
  //     false,
  //     false,
  //     false,
  //     false,
  //     false,
  //     false,
  //     false,
  //   ]);
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
  //   console.log("showing company2", company2[0].company);

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

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (index) => {
    const newSwitchStates = [...switchStates];
    newSwitchStates[index] = !newSwitchStates[index];
    setSwitchStates(newSwitchStates);
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
        const resultArray = switchStates.map((state) => (state ? 1 : 0));
        // console.log("Switch Values:", resultArray);
        // console.log("Text Field Values:", formData);

        const requestData = {
          fname: formData.fname,
          lname: formData.lname,
          email: formData.email,
          password: formData.password,
          company: company2[0].company,
          userToken: resultArray.join(""),
        };
        // console.log("Request Data:", requestData);

        await axios
          .post(API_LINK + "updateUser", requestData)
          .then((response) => {
            if (response.data) {
              console.log("send data to backend :: ", response.data);
            }
          })
          .catch((err) => console.error(err));

        resetSwitchStates();
        // setSwitchStates([false, false, false, false, false, false, false]);

        setFormData({
          fname: "",
          lname: "",
          email: "",
          password: "",
          company: "",
        });
        set_form_validity(false);
      }
    }
  };

  useEffect(() => {
    console.log("Switch States:", titlesArray);
  }, []);

  //------------------------------------------------------------------------------------------------------------

  //   var email = "";

  //   const shopify_store_addProduct = async () => {
  //     console.log("into shopify store");
  //   };

  //   const displaySelectedStores = () => {
  //     console.log("stores", selectedStores);

  //     if (selectedStores === "Shopify") {
  //       shopify_store_addProduct();
  //     } else if (selectedStores === "other") {
  //       console.log("selected store == other");
  //       // WooCommerceFunction();
  //     }
  //   };
  //   const handle_create_warehouse = (field, value) => {
  //     setroles((prevItem) => ({
  //       ...prevItem,
  //       [field]: value,
  //     }));
  //     console.log("showing created products", roles);
  //   };

  const resetSwitchStates = () => {
    const initialStates = titlesArray.map(() => false);
    setSwitchStates(initialStates);
  };

  const isFormValid = () => {
    const requiredProperties = ["fname", "lname", "email", "password"];
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
  // if (
  //   roles.title !== "" &&
  //   roles.address !== "" &&
  //   roles.city !== "" &&
  //   roles.country !== ""
  // ) {
  //   set_form_validity(true);
  //   console.log("showing form validity", form_validity);
  //   console.log("showing ----------- ",roles.title);
  // } else {
  //   set_form_validity(false);
  //   console.log("showing form validity", form_validity);
  // }
  //   };

  //   const timeSetting = () => {
  //     const currentDate = new Date();

  //     const utcTimestamp = convertToUTC(currentDate);
  //     // Format date in 'YYYY-MM-DD' format
  //     formattedDate = utcTimestamp.split("T")[0];
  //     // formattedDate = currentDate
  //     formattedTime = utcTimestamp.split("T")[1].split(".")[0];

  //     console.log(
  //       `showing origional ${utcTimestamp}, formatted date and time ${formattedDate}, ${formattedTime}`
  //     );
  //   };

  //   const handleSubmit = async (event) => {
  //     event.preventDefault();
  //     if (form_validity) {
  //       displaySelectedStores();
  //       // console.log(isFormValid());

  //       // Get the current user
  //       const user = auth.currentUser;

  //       if (user) {
  //         email = user.email;
  //         try {
  //           await handle_create_warehouse("email", email);
  //           console.log("Current user's email:", email);
  //         } catch (error) {
  //           console.error("Error handling warehouse creation:", error);
  //         }
  //       } else {
  //         console.log("No user is currently signed in.");
  //       }

  //       timeSetting();

  //       const requestData = {
  //         product: {
  //           email: email,
  //           title: roles.title,
  //           address: roles.address,
  //           city: roles.city,
  //           country: roles.country,
  //           association: selectedStores,
  //           date: formattedDate,
  //           time: formattedTime,
  //         },
  //       };

  //       console.log("into handle submit", requestData);

  //       axios
  //         .post(API_LINK + "create_warehouse", requestData)
  //         .then((response) => {
  //           console.log("send data to backend :: ", response.data);
  //           console.log(typeof response.data);
  //         })
  //         .catch((err) => console.error(err));

  //       setroles({
  //         title: "",
  //         address: "",
  //         city: "",
  //         country: "",
  //       });
  //       set_form_validity(false);
  //     }
  //   };

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
          Edit Users
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
                sx={{ width: "80%" }}
              />
            </div>
            <div>
              <TextField
                error={!!errors.lname}
                helperText={errors.lname}
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
                sx={{ width: "80%" }}
              />
            </div>
            <div>
              <TextField
                error={!!errors.email}
                helperText={errors.email}
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
                sx={{ width: "80%" }}
              />
            </div>
            <div>
              <TextField
                error={!!errors.password}
                helperText={errors.password}
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
                sx={{ width: "80%" }}

                //   onChange={handleTextFieldChange("password")}
              />
            </div>
            {/* <div>
                    <TextField
                      label="Company"
                      variant="outlined"
                      value={formData.company}
                      onChange={(e) => {
                        handleTextFieldChange("company", e.target.value);
                        isFormValid();
                      }}
                      required
                      sx={{ width: "80%" }}
                    />
                  </div> */}
          </Grid>
          <Grid item xs={4}>
            {/* <Container>
                {switchStates.map((checked, index) => (
                      <div
                        key={index}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <Switch
                          checked={checked}
                          onChange={() => handleChange(index)}
                          color="secondary"
                        />
                        <span style={{ color: "#593993" , fontSize:"18px", fontWeight:"bold"}}>
                          Switch  {index + 1}
                        </span>
                      </div>
                    ))}
                
              </Container> */}
            <Container>
              {titlesArray
                .slice(0, warehouse_data.length)
                .map((title, index) => (
                  <div
                    key={index}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <Switch
                      checked={switchStates[index]}
                      onChange={() => handleChange(index)}
                      color="secondary"
                    />
                    <span
                      style={{
                        color: "#593993",
                        fontSize: "18px",
                        fontWeight: "bold",
                      }}
                    >
                      {title}
                    </span>
                  </div>
                ))}
            </Container>
          </Grid>
          <Grid item xs={4}>
            <Container>
              {titlesArray
                .slice(warehouse_data.length, titlesArray.length)
                .map((title, index) => (
                  <div
                    key={index}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <Switch
                      checked={switchStates[index + warehouse_data.length]}
                      onChange={() =>
                        handleChange(index + warehouse_data.length)
                      }
                      color="secondary"
                    />
                    <span
                      style={{
                        color: "#593993",
                        fontSize: "18px",
                        fontWeight: "bold",
                      }}
                    >
                      {title}
                    </span>
                  </div>
                ))}
              {/* {switchStates.map((checked, index) => (
                      <div
                        key={index}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <Switch
                          checked={checked}
                          onChange={() => handleChange(index)}
                          color="secondary"
                        />
                        <span style={{ color: "#593993" , fontSize:"18px", fontWeight:"bold"}}>
                          Switch hgftdhjghfbhygy gvvgtcvhfctgj {index + 1}
                        </span>
                      </div>
                    ))} */}
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
            </Container>
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

export default EditRoles;
