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

  useEffect(() => {
    const x_axis_data = Array.from(
      Object.keys(props.obj_daySales).reduce((acc, key) => {
        acc.push(key);
        return acc;
      }, [])
    );

    const y_axis_data = Array.from(
      Object.values(props.obj_daySales).reduce((acc, value) => {
        acc.push(parseFloat(value.toFixed(2)));
        return acc;
      }, [])
    );

    setx_axis(x_axis_data.reverse());
    sety_axis(y_axis_data.reverse());

    console.log("y-axis data:: ", y_axis_data);
    console.log("x-axis data:: ", x_axis_data);
  }, [props.obj_daySales]);

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
      console.log("x_axis::", x_axis[0])
      console.log("y_axis::", y_axis[0])
    }
  }, [x_axis, y_axis]);

  return (
    <div id="chart">
      {x_axis.length > 0 && y_axis.length > 0 ? (
        <ReactApexChart
          options={options}
          series={series}
          type="area"
          height={350}
          width={1000}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default Sales_per_day;





