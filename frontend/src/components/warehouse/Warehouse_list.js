import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import firebase_app from "../../Firebase/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Inventory_ftn from "./Inventory";
import Transfer_Stock from "./Transfer_Stock";
import List_ftn from "../../containers/List_ftn";

const auth = getAuth(firebase_app);

var API_LINK = "http://localhost:5000/";
var sortedCustomers = "";

function Warehouse_list(props) {

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

  const warehouse_name_value = props.warehouse_name;
  var email = "";
  const user = auth.currentUser;
  var warehouse_total_products = [];
//   var combinedData =[];

const handle_combine = async (warehouseTotal,warehouseDetail) =>{
    const data_detail = await (warehouseTotal.map((totalItem) => {
        const matchingDetailItem = warehouseDetail.find(
          (detailItem) => detailItem.title === totalItem.warehouse
        );
        if (matchingDetailItem) {
          return {
            title: matchingDetailItem.title,
            SKU: totalItem.SKU,
            Quantity: totalItem.quantity,
            city: matchingDetailItem.city,
            Country: matchingDetailItem.country,
          };
        }
  
        // Handle cases where there is no matching detail item
        return {
          title: totalItem.warehouse,
          SKU: totalItem.SKU,
          title: totalItem.warehouse,
          SKU: totalItem.SKU,
          city: "N/A",
          Quantity: "N/A",
          Country: "N/A",
        };
      }));
  
      setcombinedData(data_detail)
  
      // {<List_ftn combinedData ={combinedData}/>}
  
  
    //   data_detail.map((totalItem) => {
    //       console.log("combinedData 2 ", totalItem.title);
    //   })
  
}



  const fetchProductCount = async () => {
    console.log("iam in fetchProductCount");
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
    await axios
      .post(API_LINK + "get_all_warehouse_products", requestData)
      .then((response) => {
        warehouse_total_products = response.data[0];
        // console.log(
        //   "showing data from warehouse products :: ",
        //   warehouse_total_products
        // );
        setWarehouseTotal(warehouse_total_products);

        console.log(typeof response.data);
        let total = 0;

        for (let i = 0; i < warehouse_total_products.length; i++) {
          total += warehouse_total_products[i].quantity;
        }
        // console.log("Total quantity:", total);
        // console.log("Total entries:", warehouse_total_products.length);
        setProductCount(total);
      })
      .catch((err) => {
        console.error(err);
        alert("Error fetching product data");
      });

    await axios
      .post(API_LINK + "get_warehouse", requestData)
      .then((response) => {
        // console.log("send data to backend :: ", response.data);
        // console.log(typeof response.data);
        setWarehouseDetail(response.data);
      })
      .catch((err) => console.error(err));

    // -------------------- COMBINING RESULTS ------------------------------------------------------------

   
    // console.log("combinedData", data_detail[0].title);

    // -----------------------------------------------------------------------------------------
  };
  useEffect(() => {
    if(warehouseDetail && warehouseTotal)
     handle_combine(warehouseTotal,warehouseDetail)
  }, [warehouseTotal,warehouseDetail]);

  useEffect(() => {
    fetchProductCount();
    // fetchProductDetails();
    combinedData.map((totalItem) => {
        console.log("combinedData", totalItem.title);
    })
  }, []);



//   console.log("tttttt ", combinedData)

  return (
    <div>
      <Container>
      {combinedData.length > 0 ? <List_ftn combinedData ={combinedData} /> : ""}
        <div>
      {/* <ul>
        {combinedData.map((item, index) => (
          <li key={index}>
          <p>showing item : {item.title}</p>
            <strong>Title:</strong> {item.title}<br />
            <strong>SKU:</strong> {item.SKU}<br />
            <strong>City:</strong> {item.city}<br />
            Add more properties here as needed
          </li>
        ))}
      </ul> */}
          {/* {warehouseTotal.map((totalProduct, index) => {
            const matchingDetailProduct = warehouseDetail.find(
              (detailProduct) => detailProduct.title === totalProduct.warehouse
            );

            if (matchingDetailProduct) {
              return (
                <div key={index}>
                  <h2>Product Title: {totalProduct.warehouse}</h2>
                  <p>SKU: {totalProduct.SKU}</p>
                  <p>Quantity: {totalProduct.quantity}</p>
                  <p>City: {matchingDetailProduct.city}</p>
                  <p>Country: {matchingDetailProduct.country}</p>
                  <br />
                </div>
              );
            }

            return null; // If no matching detail product is found
          })} */}
        </div>
      </Container>
    </div>
  );
}

export default Warehouse_list;