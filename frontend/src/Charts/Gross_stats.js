import { Button } from "@mui/material";
import { logBase } from "@syncfusion/ej2-react-charts";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  CartesianGrid,
} from "recharts";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center",
  margin: "50px auto",
};

// const newData = {
//   "2023-11-01": -584204,
//   "2023-11-02": 105725,
//   "2023-11-03": -446832,
//   "2023-11-04": -584204,
//   "2023-11-05": 105725,
//   "2023-11-06": -446832,
//   "2023-11-07": -584204,
//   "2023-11-14": 105725,
//   "2023-11-15": -446832,
//   "2023-11-16": -584204,
//   "2023-11-17": 105725,
//   "2023-11-18": -446832,
// };

// Function to fill missing dates with a value of 0
const fillMissingDates = (data) => {
    // console.log("chartData data is", data);
    if (!data || Object.keys(data).length === 0) {
        return [];
    }

    const dates = Object.keys(data).map((date) => new Date(date));
    dates.sort((a, b) => a - b);

    const startDate = dates[0].toISOString().split("T")[0];
    const endDate = dates[dates.length - 1].toISOString().split("T")[0];
    // console.log("chartData endDate is", typeof (endDate));

    const allDates = [];
    let currentDate = startDate;

    while (currentDate <= endDate) {
        allDates.push(currentDate);
        const nextDate = new Date(currentDate);
        nextDate.setDate(nextDate.getDate() + 1);
        currentDate = nextDate.toISOString().split("T")[0];
        // console.log("chartData currentDate is", currentDate);
    }
    // console.log("chartData allDates is", allDates);

    const filledData = allDates.map((date) => ({
        date,
        value: data[date] || 0,
    }));
    // console.log("chartData filledData 2 is", filledData);

    return filledData;
};


const getColor = (value) => (value < 0 ? "#FF7F7F" : "green");

function Gross_stats(props) {
    const [chartData, setChartData] = useState([]);
    const [buttonState, setButtonState] = useState("weekly");
  
    useEffect(() => {
      // Update chart data based on the selected button
      updateChartData();
      // console.log("props.obj_daySales is ",props.obj_daySales);
      // console.log("chartData is", chartData);
    }, [buttonState, props.obj_daySales]); // Include props.objData in the dependency array
  
    const updateChartData = () => {
      const currentDate = new Date();
      let startDate;
  
      switch (buttonState) {
        case "weekly":
          startDate = new Date(currentDate);
          startDate.setDate(startDate.getDate() - 4);
          break;
        case "monthly":
          startDate = new Date(currentDate);
          startDate.setDate(startDate.getDate() - 27);
          break;
        case "yearly":
          startDate = new Date(currentDate);
          startDate.setDate(startDate.getDate() - 362);
          break;
        default:
          startDate = new Date(currentDate);
          startDate.setDate(startDate.getDate() - 4);
      }
  
      const formattedStartDate = startDate.toISOString().split("T")[0];
      // // console.log("chartData props is ",props.obj_daySales);
      const dataFromProps = fillMissingDates(props.obj_daySales);
  
      // // console.log("chartData dataFromProps is ",dataFromProps);

      const filteredData = dataFromProps.filter(
        (entry) => entry.date >= formattedStartDate
      );
      // // console.log("chartData filteredData is ",filteredData);
  
      setChartData(filteredData);
    };
  
    return (
      <div style={styles}>
        <div style={{  marginBottom: '20px' }}>
          <Button
            onClick={() => setButtonState("weekly")}
            variant={buttonState === "weekly" ? "contained" : "outlined"}
          >
            Weekly
          </Button>
          <Button
            onClick={() => setButtonState("monthly")}
            variant={buttonState === "monthly" ? "contained" : "outlined"}
          >
            Monthly
          </Button>
          <Button
            onClick={() => setButtonState("yearly")}
            variant={buttonState === "yearly" ? "contained" : "outlined"}
          >
            Yearly
          </Button>
        </div>
  
        <LineChart width={600} height={300} data={chartData}>
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="100%" y2="0">
              {chartData.map((entry, index) => (
                <stop
                  key={`color-${index}`}
                  offset={`${(index / (chartData.length - 1)) * 100}%`}
                  stopColor={getColor(entry.value)}
                />
              ))}
            </linearGradient>
          </defs>
  
          <CartesianGrid strokeDasharray="3 3" />
  
          {/* Title */}
          <text
            x="50%"
            y={20}
            textAnchor="middle"
            dominantBaseline="middle"
            fontWeight="bold"
            fontSize="16"
          >
            Gross Profit
          </text>
  
          <Line
            type="monotone"
            dataKey="value"
            stroke="url(#gradient)"
            strokeWidth={3}
            dot={false}
          />
          <XAxis dataKey="date" />
          <YAxis width={100} />
          <Tooltip
            labelFormatter={(value) => `Date: ${value}`}
            formatter={(value) => `Value: ${value}`}
          />
        </LineChart>
      </div>
    );
  }
  
export default Gross_stats;

// import { Button } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import ReactApexChart from "react-apexcharts";

// function Gross_stats(props) {
//   const [y_axis, sety_axis] = useState([]);
//   const [x_axis, setx_axis] = useState([]);
//   const [options, setOptions] = useState({});
//   const [series, setSeries] = useState([
//     {
//       name: props.name,
//       data: y_axis,
//     },
//   ]);

//   const [dateRange, setDateRange] = useState("weekly");

//   function getWeekNumber(date) {
//     date = new Date(date);
//     date.setHours(0, 0, 0, 0);
//     date.setDate(date.getDate() + 4 - (date.getDay() || 7));
//     const yearStart = new Date(date.getFullYear(), 0, 1);
//     const weekNumber = Math.ceil(((date - yearStart) / 86400000 + 1) / 7);
//     return weekNumber;
//   }

//   useEffect(() => {
//     //   // const newData = getDataBasedOnDateRange(props.obj_daySales, dateRange);
//     //   // const x_axis_data = Array.from(newData.keys());
//     //   // const y_axis_data = Array.from(newData.values());
//     // // console.log("sorted chart", props.obj_daySales);

//     // const x_data = Array.from(
//     //   Object.keys(props.obj_daySales).reduce((acc, key) => {
//     //     acc.push(key);
//     //     return acc;
//     //   }, [])
//     // );

//     // const y_data = Array.from(
//     //   Object.values(props.obj_daySales).reduce((acc, value) => {
//     //     acc.push(parseFloat(value.toFixed(2)));
//     //     return acc;
//     //   }, [])
//     // );

//     // // console.log("obj_daySales is ", props.obj_daySales);

//     const x_data = Array.from(Object.keys(props.obj_daySales)).sort();
//     var y_data = [];
//     for (let x in x_data) {
//       // // // console.log("x_data is ",x_data[x]);
//       y_data.push(props.obj_daySales[x_data[x]]);
//     }
//     // // // console.log("y_data is ",y_data);
//     // const y_data = Array.from(Object.values(props.obj_daySales).map(value => parseFloat(value.toFixed(2))));

//     // // // console.log("Sorted x_data:", x_data);
//     // // // console.log("Sorted y_data:", y_data);

//     // Sort x_data and keep y_data values aligned
//     // x_data.sort((a, b) => a.localeCompare(b));
//     // y_data.sort((a, b) => {
//     //   const aIndex = x_data.indexOf(a);
//     //   const bIndex = x_data.indexOf(b);
//     //   return aIndex - bIndex;
//     // });

//     // if(props.obj_daySales)
//     //   // // console.log('x',x_axis_data,'y',y_axis_data )
//     //   // console.log("showing range ", dateRange)

//     //   setx_axis(x_axis_data.reverse());
//     //   sety_axis(y_axis_data.reverse());

//     //   // console.log("y-axis data:: ", y_axis_data);
//     //   // console.log("x-axis data:: ", x_axis_data);
//     // }, [props.obj_daySales, dateRange]);
//     const calculateData = (range) => {
//       const dataMap = new Map();
//       const currentDate = new Date();
//       // // console.log("currentDate is ",x_data.sort());
//       for (let i = 0; i < x_data.length; i++) {
//         const date = new Date(x_data[i]);
//         let key;
//         // // console.log("date is in sales chart",date);

//         if (range === "weekly") {
//           const daysDiff = Math.floor(
//             (currentDate - date) / (24 * 60 * 60 * 1000)
//           );
//           if (daysDiff >= 0 && daysDiff <= 7) {
//             key = date.toISOString().split("T")[0];
//             // // console.log("weekly key is ",key)
//           }
//         } else if (range === "monthly") {
//           const daysDiff = Math.floor(
//             (currentDate - date) / (24 * 60 * 60 * 1000)
//           );
//           // console.log("daysDiff is ", date);
//           if (daysDiff >= 0 && daysDiff < 30) {
//             key = date.toISOString().split("T")[0];
//             // // console.log("monthly key is ",key)
//           }
//         } else if (range === "yearly") {
//           const monthsDiff =
//             (currentDate.getFullYear() - date.getFullYear()) * 12 +
//             (currentDate.getMonth() - date.getMonth());
//           if (monthsDiff >= 0 && monthsDiff < 12) {
//             key = `${date.getFullYear()}-${date.getMonth() + 1}`;
//             // // console.log("yearly key is ",key)
//           }
//         }

//         if (key) {
//           if (dataMap.has(key)) {
//             dataMap.set(key, dataMap.get(key) + y_data[i]);
//           } else {
//             dataMap.set(key, y_data[i]);
//           }
//         }
//       }
//       return dataMap;
//     };

//     const newData = calculateData(dateRange);
//     const x_axis_data = Array.from(newData.keys());
//     const y_axis_data = Array.from(newData.values());

//     setx_axis(x_axis_data.reverse());
//     sety_axis(y_axis_data.reverse());
//   }, [dateRange]);

//   useEffect(() => {
//     if (x_axis.length > 0 && y_axis.length > 0) {
//       const maxYValue = Math.ceil(Math.max(...y_axis) / 20000) * 20000;
//       const minYValue = Math.floor(Math.min(...y_axis) / 20000) * 20000;

//       setOptions({
//         chart: {
//           type: "area",
//           stacked: false,
//           height: 350,
//           zoom: {
//             type: "x",
//             enabled: true,
//             autoScaleYaxis: true,
//           },
//           toolbar: {
//             autoSelected: "zoom",
//           },
//         },
//         dataLabels: {
//           enabled: false,
//         },
//         markers: {
//           size: 0,
//         },
//         stroke: {
//           curve: "straight",
//         },
//         title: {
//           text: "Sales Per Day",
//           align: "left",
//         },
//         fill: {
//           type: "gradient",
//           gradient: {
//             shadeIntensity: 1,
//             inverseColors: false,
//             opacityFrom: 0.5,
//             opacityTo: 0,
//             stops: [0, 90, 100],
//           },
//         },
//         yaxis: {
//           min: minYValue,
//           max: maxYValue,
//         },
//         xaxis: {
//           type: "datetime",
//           categories: x_axis,
//         },
//         colors:['#9C27B0','#F44336', '#E91E63' ]
//       });

//       setSeries([
//         {
//           name: props.name,
//           data: y_axis,
//         },
//       ]);
//       // console.log("x_axis::", x_axis[0]);
//       // console.log("y_axis::", y_axis[0]);
//     }
//   }, [x_axis, y_axis]);

//   const getDataBasedOnDateRange = (x, y, range) => {
//     let newData = new Map();

//     if (range === "weekly") {
//       // Calculate weekly data
//       for (let i = 0; i < x.length; i++) {
//         const currentDate = new Date(x[i]);
//         const startOfWeek = new Date(
//           currentDate.getFullYear(),
//           currentDate.getMonth(),
//           currentDate.getDate() - currentDate.getDay()
//         )
//           .toISOString()
//           .split("T")[0];

//         if (newData.has(startOfWeek)) {
//           newData.set(startOfWeek, newData.get(startOfWeek) + y[i]);
//         } else {
//           newData.set(startOfWeek, y[i]);
//         }
//       }
//     } else if (range === "monthly") {
//       // Calculate monthly data
//       for (let i = 0; i < x.length; i++) {
//         const currentDate = new Date(x[i]);
//         const startOfMonth = new Date(
//           currentDate.getFullYear(),
//           currentDate.getMonth(),
//           1
//         )
//           .toISOString()
//           .split("T")[0];

//         if (newData.has(startOfMonth)) {
//           newData.set(startOfMonth, newData.get(startOfMonth) + y[i]);
//         } else {
//           newData.set(startOfMonth, y[i]);
//         }
//       }
//     } else if (range === "yearly") {
//       // Calculate yearly data
//       for (let i = 0; i < x.length; i++) {
//         const currentDate = new Date(x[i]);
//         const startOfYear = new Date(currentDate.getFullYear(), 0, 1)
//           .toISOString()
//           .split("T")[0];

//         if (newData.has(startOfYear)) {
//           newData.set(startOfYear, newData.get(startOfYear) + y[i]);
//         } else {
//           newData.set(startOfYear, y[i]);
//         }
//       }
//     }

//     return newData;
//   };

//   return (
//     <div id="chart">
//       <div>
//         <Button variant="outlined" onClick={() => setDateRange("weekly")}>
//           Weekly
//         </Button>
//         <Button variant="outlined" onClick={() => setDateRange("monthly")}>
//           Monthly
//         </Button>
//         <Button variant="outlined" onClick={() => setDateRange("yearly")}>
//           Yearly
//         </Button>
//       </div>
//       {x_axis.length > 0 && y_axis.length > 0 ? (
//         <ReactApexChart
//           options={options}
//           series={series}
//           type="area"
//           height={350}
//           width={900}
//         />
//       ) : (
//         ""
//       )}
//     </div>
//   );
// }

// export default Gross_stats;
