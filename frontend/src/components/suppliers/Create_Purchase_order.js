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
    TextField,
    Typography,
  } from "@mui/material";
  import axios from "axios";
  import React, { useEffect, useState } from "react";
  import firebase_app from "../../Firebase/firebase";
  import { getAuth, onAuthStateChanged } from "firebase/auth";
  
  
  const auth = getAuth(firebase_app);
  
  var API_LINK = "http://191.101.233.66:5000/";
  var sortedCustomers = "";
  
  function Create_Purchase_order() {
    const [form_validity, set_form_validity] = useState(false);
  
    const [create_Purchase_order, setcreate_Purchase_order] = useState([
      {
        name: "",
        email: "",
        phone_number: "",
      //   company: "",
        category: "",
        city: "",
        address: "",
        country: "",
      },
    ]);
  
    var email = "";
  
  
    const handle_create_supplier = (field, value) => {
      setcreate_Purchase_order((prevItem) => ({
        ...prevItem,
        [field]: value,
      }));
      console.log("showing created products", create_Purchase_order);
      isFormValid();
    };
  
    const isFormValid = () => {
      const requiredProperties = [
        "name",
        "phone_number",
      //   "company",
        "category",
        "city",
        "address",
        "country",
      ];
      for (const property of requiredProperties) {
        if (!create_Purchase_order[property]) {
          console.log(`property is ${property} :: ${create_Purchase_order[property]}`);
          set_form_validity(false);
          console.log("showing form validity", form_validity);
          return;
        }
        console.log(
          `in true ,property is ${property} :: ${create_Purchase_order[property]}`
        );
      }
  
      set_form_validity(true);
      console.log("showing form validity", form_validity);
    };
   
  
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      if (form_validity) {
  
        // Get the current user
        const user = auth.currentUser;
  
        if (user) {
          email = user.email;
          try {
            await handle_create_supplier("email", email);
            console.log("Current user's email:", email);
          } catch (error) {
            console.error("Error handling supplier creation:", error);
          }
        } else {
          console.log("No user is currently signed in.");
        }
        
  
        const requestData = {
          supplier: {
            name: create_Purchase_order.name,
            email: email,
            phone_number: create_Purchase_order.phone_number,
          //   company: create_Purchase_order.company,
            category: create_Purchase_order.category,
            city: create_Purchase_order.city,
            address: create_Purchase_order.address,
            country: create_Purchase_order.country,
          },
        };
  
        console.log("into handle submit", requestData);
  
        axios
          .post(API_LINK + "create_supplier", requestData)
          .then((response) => {
            console.log("send data to backend :: ", response.data);
            console.log(typeof response.data);
          })
          .catch((err) => console.error(err));
  
        setcreate_Purchase_order({
          name: "",
          email: "",
          phone_number: "",
          // company: "",
          category: "",
          city: "",
          address: "",
          country: "",
        });
        set_form_validity(false);
      }
    };
  
    return (
      <div>
        <Container sx={{ height: "88vh" }}>

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
                  marginTop: "20px",
                }}
              >
                Create Purchase Order
              </Typography>
  
              <Grid item lg={6} sx={{ width: "50%" }}>
                <ul>
                  <form onSubmit={handleSubmit}>
                    <Stack
                      direction="column"
                      spacing={4}
                      sx={{ justifyContent: "center", alignItems: "center" }}
                    >
                      <TextField
                        id="standard-basic-name"
                        label="Name"
                        variant="standard"
                        value={create_Purchase_order.name}
                        onChange={(e) =>
                          handle_create_supplier("name", e.target.value)
                        }
                        required
                        sx={{ width: "100%" }}
                      />
  
                      <TextField
                        id="standard-basic-email"
                        label="Email"
                        variant="standard"
                        value={create_Purchase_order.email}
                        onChange={(e) =>
                          handle_create_supplier("email", e.target.value)
                        }
                        required
                        sx={{ width: "100%" }}
                      />
  
                      <TextField
                        id="standard-basic-phone_number"
                        label="Phone Number"
                        variant="standard"
                        value={create_Purchase_order.phone_number}
                        onChange={(e) =>
                          handle_create_supplier("phone_number", e.target.value)
                        }
                        required
                        sx={{ width: "100%" }}
                      />
  
                      {/* <TextField
                        id="standard-basic-company"
                        label="Company"
                        variant="standard"
                        value={create_Purchase_order.company}
                        onChange={(e) =>
                          handle_create_supplier("company", e.target.value)
                        }
                        required
                        sx={{ width: "100%" }}
                      /> */}
  
                      <TextField
                        id="standard-basic-category"
                        label="Category"
                        variant="standard"
                        value={create_Purchase_order.category}
                        onChange={(e) =>
                          handle_create_supplier("category", e.target.value)
                        }
                        required
                        sx={{ width: "100%" }}
                      />
  
                      <TextField
                        id="standard-basic-city"
                        label="City"
                        variant="standard"
                        value={create_Purchase_order.city}
                        onChange={(e) =>
                          handle_create_supplier("city", e.target.value)
                        }
                        required
                        sx={{ width: "100%" }}
                      />
  
                      <TextField
                        id="standard-basic-address"
                        label="Address"
                        variant="standard"
                        value={create_Purchase_order.address}
                        onChange={(e) => {
                          handle_create_supplier("address", e.target.value);
                          isFormValid();
                        }}
                        required
                        sx={{ width: "100%" }}
                      />
  
                      <TextField
                        id="standard-basic-country"
                        label="Country"
                        variant="standard"
                        value={create_Purchase_order.country}
                        onChange={(e) =>
                          handle_create_supplier("country", e.target.value)
                        }
                        required
                        sx={{ width: "100%" }}
                      />
  
                      {form_validity ? (
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
                            width: "50%",
                            borderRadius: "12px",
                          }}
                        >
                          Create
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          sx={{
                            mt: 3,
                            mb: 2,
                            background:
                              "linear-gradient(45deg, #593993, #9319B5)",
                            boxShadow: "0 3px 5px 2px rgba(147, 25, 181, .3)",
                            color: "white",
                            width: "50%",
                            borderRadius: "12px",
                          }}
                          // onClick={handleSubmit}
                          disabled={!form_validity}
                        >
                          Create
                        </Button>
                      )}
                    </Stack>
                  </form>
                </ul>
              </Grid>
            </Grid>
        
        </Container>
      </div>
    );
  }
  
  export default Create_Purchase_order;
  