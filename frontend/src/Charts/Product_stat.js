import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

function Product_stat(props) {
  const [inventory, setInventory] = useState("");
  const [selectedItemIndex, setSelectedItemIndex] = useState(null); // State to store the selected index
  const [displayRange, setdisplayRange] = useState("Unit");

  const topProducts = props.obj1;
  //   console.log("showing obj1 ", props.obj1);

  const handleChange = (event) => {
    setInventory(event.target.value); // Update selected inventory
    console.log(event.target.value);
  };
  const handleMenuItemClick = (index) => () => {
    handle_check(index); // Call handle_check only when the MenuItem is clicked
    // call_graph()
  };

  const call_graph = () => {
    set_graph();
  };

  const set_graph = () => {
    // set graph data here
    const resultArray = [];
    const product = topProducts[selectedItemIndex];
    console.log(`Product: ${product.title}`);
    console.log(`Quantity: ${product.quantity}`);
    console.log(`product detail: ${product}`);
    
    if (displayRange === "Unit") {
      console.log("Created At:");
      for (let j = 0; j < product.created_at.length; j++) {
        const lineItem = product.line_items[j];
        const createdAt = product.created_at[j];
        console.log(createdAt);
        console.log(`Title: ${lineItem.title}, Quantity: ${lineItem.quantity}`);
        
        // Check if createdAt already exists in resultArray
        const existingEntry = resultArray.find(entry => entry.x === createdAt);
        
        if (existingEntry) {
          // If it exists, add the quantity to the existing entry
          existingEntry.y += lineItem.quantity;
        } else {
          // If it doesn't exist, create a new entry
          resultArray.push({ x: createdAt, y: lineItem.quantity });
        }
      }
    } else {
      console.log("Created At:");
      for (let j = 0; j < product.created_at.length; j++) {
        const lineItem = product.line_items[j];
        const createdAt = product.created_at[j];
        console.log(createdAt);
        let total = (lineItem.quantity * lineItem.price).toFixed(2);
        console.log(`Title: ${lineItem.title}, Sales: ${total}`);
        
        // Check if createdAt already exists in resultArray
        const existingEntry = resultArray.find(entry => entry.x === createdAt);
        
        if (existingEntry) {
          // If it exists, add the total sales to the existing entry
          existingEntry.y += parseFloat(total);
        } else {
          // If it doesn't exist, create a new entry
          resultArray.push({ x: createdAt, y: parseFloat(total) });
        }
      }
    }
    
    setData(resultArray);
  };

  const handle_check = (index) => {
    setSelectedItemIndex(index);
    console.log("showing index", index);
    console.log("showing topProducts", topProducts);
  };

  useEffect(() => {
    if (selectedItemIndex !== null) {
      call_graph();
    }
  }, [selectedItemIndex]);

  const [data, setData] = useState([]);

  const options = {
    series: [
      {
        name: "sales",
        data: data,
      },
    ],
    chart: {
      type: "bar",
      height: 180,
    },
    xaxis: {
      type: "category",
      labels: {
        formatter: function (val) {
          return val;
        },
      },
      group: {
        style: {
          fontSize: "10px",
          fontWeight: 700,
        },
        groups: [
          {
            title: "Dates",
            cols: data.length,
          },
        ],
      },
    },
    title: {
      text: "Product Statistics",
    },
    tooltip: {
      x: {
        formatter: function (val) {
          return val;
        },
      },
    },
  };

  return (
    <div id="chart">
      <div>
        <Button variant="outlined" onClick={() => setdisplayRange("Unit")}>
          By Units
        </Button>
        <Button variant="outlined" onClick={() => setdisplayRange("Sales")}>
          By Sales
        </Button>
      </div>
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <FormControl sx={{ m: 1, minWidth: 150, margin: "50px" }}>
          <InputLabel id="demo-simple-select-autowidth-label">
            Products
          </InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={selectedItemIndex}
            onChange={handleChange}
            autoWidth
            label="Inventory"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {topProducts.map((product, index) => (
              <MenuItem
                key={index}
                value={index}
                onClick={handleMenuItemClick(index)}
              >
                {product.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Container>
      <ReactApexChart
        options={options}
        series={[{ data: data }]}
        type="bar"
        height={380}
        width={900}
      />
    </div>
  );
}

export default Product_stat;

// import React, { Component, useRef } from 'react';
// import CanvasJSReact from '@canvasjs/react-charts';
// import { colors } from '@mui/material';
// var CanvasJSChart = CanvasJSReact.CanvasJSChart;

// class ColumnChart extends Component {
// 		render() {
// 		const options = {
// 			title: {
// 				text: "Basic Column Chart"
// 			},
// 			animationEnabled: true,
// 			data: [
// 			{
// 				// Change type to "doughnut", "line", "splineArea", etc.
// 				type: "column",
// 				dataPoints: [
// 					{ label: "Apple",  y: 10 , color: "#61DBFB" },
// 					{ label: "Orange", y: 15  , color: "#61DBFB"},
// 					{ label: "Banana", y: 25  , color: "#61DBFB"},
// 					{ label: "Mango",  y: 30  , color: "#61DBFB"},
// 					{ label: "Grape",  y: 28  , color: "#61DBFB"}
// 				]
// 			}
// 			]
// 		}
// 		// const chartRef = useRef();
// 		return (
// 		<div>
// 			<h1>React Column Chart</h1>
// 			<CanvasJSChart options = {options} dataPointWidth = {2} backgroundColor = "transparent"
// 				//  onRef={ref => this.chart = ref}

// 			/>
// 			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
// 		</div>
// 		);
// 	}
// }

// export default ColumnChart;
