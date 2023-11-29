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
import List_ftn from "../../containers/List_ftn";
import List_ftn_all from "../../containers/List_ftn_all";
import List_ftn_pos from "../../containers/List_ftn_pos";

import { useSelector } from "react-redux";

const auth = getAuth(firebase_app);

var API_LINK = "http://191.101.233.66:5000/";
var sortedCustomers = "";
var formattedDate;
var formattedTime;

function POS_inventory({ warehouse_name }) {
  const [warehouse_options, set_warehouse_options] = useState("");
  const [responseData_customers, setresponseData_customers] = useState(null);
  const [page_options, set_page_options] = useState("");
  const [form_validity, set_form_validity] = useState(false);
  const [warehouse_data, set_warehouse_data] = React.useState("");
  const [selectedItemIndex, setSelectedItemIndex] = useState(null); // State to store the selected index
  const [productCount, setProductCount] = useState(0);
  const [warehouseTotal, setWarehouseTotal] = useState([]);
  const [warehouseDetail, setWarehouseDetail] = useState([]);
  const [selectedStores, setSelectedStores] = useState([]);
  const [combinedData, setcombinedData] = useState([]);
  const [data_warehouse, setdata_warehouse] = useState([]);
  const [InventoryProducts, setInventoryProducts] = useState([
    {
      email: "",
      warehouse: "",
      title: "",
      description: "",
      picture_url: "",
      cost_price: "",
      retail_price: "",
      quantity: "",
      SKU: "",
      barcode: "",
      weight: "",
      size: "",
      color: "",
    },
  ]);

  console.log("warehouse_name", warehouse_name);
  const company2 = useSelector((state) => state.users);
  console.log("showing company2 in POS 1", company2[0]);

  // const warehouse_name_value = props.warehouse_name;
  const warehouse_name_value = "";
  var email = "";
  const user = auth.currentUser;
  var warehouse_total_products = [];
  //   var combinedData =[];

  // const handle_combine = async (warehouseTotal, warehouseDetail) => {
  //   console.log("warehouseDetail", warehouseDetail);
  //   console.log("warehouseTotal", warehouseTotal);
  //   const data_detail = await warehouseTotal.map((totalItem) => {
  //     const matchingDetailItem = warehouseDetail.find(
  //       (detailItem) => detailItem.title === totalItem.warehouse
  //     );
  //     if (matchingDetailItem) {
  //       return {
  //         title: matchingDetailItem.title,
  //         SKU: totalItem.SKU,
  //         Quantity: totalItem.quantity,
  //         address: matchingDetailItem.address,
  //         city: matchingDetailItem.city,
  //         Country: matchingDetailItem.country,
  //       };
  //     }

  //     // Handle cases where there is no matching detail item
  //     return {
  //       title: totalItem.warehouse,
  //       SKU: totalItem.SKU,
  //       address: "N/A",
  //       city: "N/A",
  //       Quantity: 0,
  //       Country: "N/A",
  //     };
  //   });

  //   const categorizedData = [];

  //   // ---------------------------------------------------------------------------------------------------------

  //   // Loop through the data and categorize it by warehouse title
  //   data_detail.forEach((item) => {
  //     const warehouseTitle = item.title;

  //     // If the warehouse title is not in the categorizedData object, initialize it
  //     if (!categorizedData[warehouseTitle]) {
  //       categorizedData[warehouseTitle] = {
  //         title: "",
  //         SKU: 0,
  //         Quantity: 0,
  //         address: "",
  //         city: "",
  //         Country: "",

  //         // items: [],
  //       };
  //     }

  //     // Update the categorizedData object with SKU and Quantity information
  //     categorizedData[warehouseTitle].title = item.title;
  //     categorizedData[warehouseTitle].address = item.address;
  //     categorizedData[warehouseTitle].city = item.city;
  //     categorizedData[warehouseTitle].Country = item.Country;
  //     categorizedData[warehouseTitle].SKU += 1;
  //     categorizedData[warehouseTitle].Quantity += item.Quantity;
  //     // categorizedData[warehouseTitle].items.push(item);
  //   });

  //   // converting categorized data to [0:{}, 1:{}...]
  //   var final_data = [];

  //   // Loop through the values of categorizedData
  //   for (const warehouseData of Object.values(categorizedData)) {
  //     final_data.push(warehouseData);
  //   }

  //   console.log("Final Data:", final_data);
  //   // ---------------------------------------------------------------------------------------------------------

  //   setcombinedData(final_data);
  //   setdata_warehouse(data_detail);
  //   // setcombinedData(data_detail);

  //   // {<List_ftn combinedData ={combinedData}/>}

  //   //   data_detail.map((totalItem) => {
  //   //       console.log("combinedData 2 ", totalItem.title);
  //   //   })
  // };

  const fetchProductCount = async () => {
    console.log("iam in fetchProductCount");
    let warehouse_by_company = [];
    if (user) {
      email = user.email;
      try {
        console.log("Current user's email:", email);
        console.log("Current warehouse name:", warehouse_name_value);
      } catch (error) {
        console.error("Error handling warehouse creation:", error);
      }
    } else {
      console.log("No user is currently signed in.");
    }

    const requestData = {
      email: email,
    };
    const filteredCompanies = company2.filter(
      (company) => company.email === email
    );
    console.log("filtered companiesin POS_inventory", filteredCompanies[0]);

    let updatedWarehouseProducts = [];
    let updatedWarehouseProducts_filtered = [];
    console.log("requestData:: ", requestData);
    await axios
      .post(API_LINK + "get_company_products", requestData)
      .then((response) => {
        warehouse_total_products = response.data[0];
        console.log(
          "showing data from warehouse products :: ",
          warehouse_total_products
        );

        const requestData2 = {
          company: filteredCompanies[0].company,
        };

        axios
          .post(API_LINK + "get_warehouse_byCompany", requestData2)
          .then((response) => {
            warehouse_by_company = response.data[0];
            // warehouse_by_company.push(response.data[0]) ;
            console.log(
              "showing data from warehouse_by_company :: ",
              warehouse_by_company
            );
            updatedWarehouseProducts = warehouse_by_company.filter(
              (product) => {
                return product.warehouse === warehouse_name;
              }
            );
            updatedWarehouseProducts_filtered = warehouse_total_products.filter(
              (product) => {
                // Check if SKU matches the SKU of the product in updatedWarehouseProducts
                const matchingProduct = updatedWarehouseProducts.find(
                  (updatedProduct) => updatedProduct.SKU === product.SKU
                );

                if (matchingProduct) {
                  // Attach the quantity from the matching product
                  product.quantity = matchingProduct.quantity;
                  return true;
                }

                return false;
              }
            );
            // console.log("updatedWarehouseProducts_filtered", updatedWarehouseProducts_filtered);
            // console.log("updatedWarehouseProducts", updatedWarehouseProducts);
            // setWarehouseTotal(warehouse_total_products);
            setWarehouseTotal(updatedWarehouseProducts_filtered);
            console.log("warehouse_total_products", warehouse_total_products);
            console.log("updatedWarehouseProducts", updatedWarehouseProducts);
            console.log(
              "updatedWarehouseProducts_filtered",
              updatedWarehouseProducts_filtered
            );

            const filteredData = updatedWarehouseProducts_filtered.map(
              ({
                SKU,
                barcode,
                company,
                title,
                retail_price,
                quantity,
                weight,
                size,
                color,
              }) => ({
                SKU,
                barcode,
                company,
                title,
                retail_price,
                quantity,
                weight,
                size,
                color,
              })
            );
            console.log("filteredData in POS 1", filteredData);

            setcombinedData(filteredData);
            // setcombinedData(warehouse_total_products);

            console.log(typeof response.data);
            let total = 0;

            for (let i = 0; i < warehouse_total_products.length; i++) {
              total += warehouse_total_products[i].quantity;
              console.log(
                "warehouse_total_products:",
                warehouse_total_products[i].quantity
              );
            }
            console.log("Total quantity:", total);
            // console.log("Total entries:", warehouse_total_products.length);
            setProductCount(total);
          })
          .catch((err) => {
            console.error(err);
            alert("Error fetching product data");
          });
        // const updatedWarehouseTotalProducts = warehouse_total_products.map((product) => {
        //   const warehouseQuantity = warehouse_by_company.find((item) => item.product_id === product.product_id)?.quantity || 0;
        //   return { ...product, warehouseQuantity };
        // });

        // const filteredData = warehouse_total_products.map(
      })
      .catch((err) => {
        console.error(err);
        alert("Error fetching product data");
      });

    //   await axios
    //     .post(API_LINK + "get_warehouse", requestData)
    //     .then((response) => {
    //       // console.log("send data to backend :: ", response.data);
    //       // console.log(typeof response.data);
    //       setWarehouseDetail(response.data);
    //     })
    //     .catch((err) => console.error(err));

    // -------------------- COMBINING RESULTS ------------------------------------------------------------

    // console.log("combinedData", data_detail[0].title);

    // -----------------------------------------------------------------------------------------
  };
  useEffect(() => {
    //   if (warehouseDetail && warehouseTotal)
    // handle_combine(warehouseTotal, warehouseDetail);
  }, [warehouseTotal, warehouseDetail]);

  useEffect(() => {
    fetchProductCount();
    // fetchProductDetails();
    combinedData.map((totalItem) => {
      console.log("combinedData", totalItem);
    });
  }, [warehouse_name]);

  //   console.log("tttttt ", combinedData)

  return (
    <div>
      {/* <h1>{warehouse_name}</h1> */}
      <Container sx={{ maxHeight: "100px", margin: "20px" }}>
        {combinedData.length > 0 && combinedData[0].city != "N/A" ? (
          <List_ftn_all
            combinedData={combinedData}
            warehouse_name={warehouse_name}
          />
        ) : (
          ""
        )}
        <div></div>
      </Container>
    </div>
  );
}

export default POS_inventory;
