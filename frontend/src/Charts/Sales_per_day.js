import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

function Sales_per_day(props) {
  const [y_axis, sety_axis] = useState([]);
  const [x_axis, setx_axis] = useState([]);
  const [options, setOptions] = useState({});
  const [series, setSeries] = useState([
    {
      name: props.name,
      data: y_axis,
    },
  ]);

  const [dateRange, setDateRange] = useState("weekly");

  function getWeekNumber(date) {
    date = new Date(date);
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 4 - (date.getDay() || 7));
    const yearStart = new Date(date.getFullYear(), 0, 1);
    const weekNumber = Math.ceil(((date - yearStart) / 86400000 + 1) / 7);
    return weekNumber;
  }
  

  useEffect(() => {
  //   // const newData = getDataBasedOnDateRange(props.obj_daySales, dateRange);
  //   // const x_axis_data = Array.from(newData.keys());
  //   // const y_axis_data = Array.from(newData.values());

    const x_data = Array.from(
      Object.keys(props.obj_daySales).reduce((acc, key) => {
        acc.push(key);
        return acc;
      }, [])
    );

    const y_data = Array.from(
      Object.values(props.obj_daySales).reduce((acc, value) => {
        acc.push(parseFloat(value.toFixed(2)));
        return acc;
      }, [])
    );
  //   console.log('x',x_axis_data,'y',y_axis_data )
  //   console.log("showing range ", dateRange)

  //   setx_axis(x_axis_data.reverse());
  //   sety_axis(y_axis_data.reverse());

  //   console.log("y-axis data:: ", y_axis_data);
  //   console.log("x-axis data:: ", x_axis_data);
  // }, [props.obj_daySales, dateRange]);
  const calculateData = (range) => {
    const dataMap = new Map();
    const currentDate = new Date();
    for (let i = 0; i < x_data.length; i++) {
      const date = new Date(x_data[i]);
      let key;
  
      if (range === "weekly") {
        const daysDiff = Math.floor((currentDate - date) / (24 * 60 * 60 * 1000));
        if (daysDiff >= 0 && daysDiff <= 7) {
          key = date.toISOString().split("T")[0];
          console.log("weekly key is ",key)
        }
      } else if (range === "monthly") {
        const daysDiff = Math.floor((currentDate - date) / (24 * 60 * 60 * 1000));
        if (daysDiff >= 0 && daysDiff < 30) {
          key = date.toISOString().split("T")[0];
          console.log("monthly key is ",key)

        }
      } else if (range === "yearly") {
        const monthsDiff = (currentDate.getFullYear() - date.getFullYear()) * 12 + (currentDate.getMonth() - date.getMonth());
        if (monthsDiff >= 0 && monthsDiff < 12) {
          key = `${date.getFullYear()}-${date.getMonth() + 1}`;
          console.log("yearly key is ",key)

        }
      }
  
      if (key) {
        if (dataMap.has(key)) {
          dataMap.set(key, dataMap.get(key) + y_data[i]);
        } else {
          dataMap.set(key, y_data[i]);
        }
      }
    }
    return dataMap;
  };
  
  
  const newData = calculateData(dateRange);
  const x_axis_data = Array.from(newData.keys());
  const y_axis_data = Array.from(newData.values());

  setx_axis(x_axis_data.reverse());
  sety_axis(y_axis_data.reverse());
}, [dateRange]);
  

  useEffect(() => {
    if (x_axis.length > 0 && y_axis.length > 0) {
      const maxYValue = Math.ceil(Math.max(...y_axis) / 20000) * 20000;

      setOptions({
        chart: {
          type: "area",
          stacked: false,
          height: 350,
          zoom: {
            type: "x",
            enabled: true,
            autoScaleYaxis: true,
          },
          toolbar: {
            autoSelected: "zoom",
          },
        },
        dataLabels: {
          enabled: false,
        },
        markers: {
          size: 0,
        },
        title: {
          text: "Sales Per Day",
          align: "left",
        },
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.5,
            opacityTo: 0,
            stops: [0, 90, 100],
          },
        },
        yaxis: {
          min: 0,
          max: maxYValue,
        },
        xaxis: {
          type: "datetime",
          categories: x_axis,
        },
      });

      setSeries([
        {
          name: props.name,
          data: y_axis,
        },
      ]);
      console.log("x_axis::", x_axis[0]);
      console.log("y_axis::", y_axis[0]);
    }
  }, [x_axis, y_axis]);

  const getDataBasedOnDateRange = (x, y, range) => {
    let newData = new Map();
  
    if (range === "weekly") {
      // Calculate weekly data
      for (let i = 0; i < x.length; i++) {
        const currentDate = new Date(x[i]);
        const startOfWeek = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate() - currentDate.getDay()
        ).toISOString().split("T")[0];
  
        if (newData.has(startOfWeek)) {
          newData.set(startOfWeek, newData.get(startOfWeek) + y[i]);
        } else {
          newData.set(startOfWeek, y[i]);
        }
      }
    } else if (range === "monthly") {
      // Calculate monthly data
      for (let i = 0; i < x.length; i++) {
        const currentDate = new Date(x[i]);
        const startOfMonth = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          1
        ).toISOString().split("T")[0];
  
        if (newData.has(startOfMonth)) {
          newData.set(startOfMonth, newData.get(startOfMonth) + y[i]);
        } else {
          newData.set(startOfMonth, y[i]);
        }
      }
    } else if (range === "yearly") {
      // Calculate yearly data
      for (let i = 0; i < x.length; i++) {
        const currentDate = new Date(x[i]);
        const startOfYear = new Date(currentDate.getFullYear(), 0, 1).toISOString().split("T")[0];
  
        if (newData.has(startOfYear)) {
          newData.set(startOfYear, newData.get(startOfYear) + y[i]);
        } else {
          newData.set(startOfYear, y[i]);
        }
      }
    }
  
    return newData;
  };

  return (
    <div id="chart">
      <div>
        <Button variant="outlined" onClick={() => setDateRange("weekly")}>Weekly</Button>
        <Button variant="outlined" onClick={() => setDateRange("monthly")}>Monthly</Button>
        <Button variant="outlined" onClick={() => setDateRange("yearly")}>Yearly</Button>
      </div>
      {x_axis.length > 0 && y_axis.length > 0 ? (
        <ReactApexChart
          options={options}
          series={series}
          type="area"
          height={350}
          width={900}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default Sales_per_day;
