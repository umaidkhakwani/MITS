import React from "react";
import LocalTimeToISO8601 from "./TimeConverter";
import convertToUTC from "./UTC_converter";

const OrderDetails = ({ rawOrderData }) => {
  var formattedDate;
  var formattedTime;
  // Extract relevant data from rawOrderData
  const originalTime = rawOrderData.created_at;

  const utcTimestamp = convertToUTC(originalTime);

  // Adjust the UTC offset to -4 hours
  // const utcOffsetHours = -4;
  // utcTimestamp.setHours(utcTimestamp.getHours());

  // Format date in 'YYYY-MM-DD' format
  formattedDate = utcTimestamp.split("T")[0];
  formattedTime = utcTimestamp.split("T")[1].split(".")[0];

  const originalTimezoneOffset = rawOrderData.client_details.browser_ip;

  // Parse original time string
  const originalTimestamp = new Date(originalTime);

  // Calculate the offset in minutes based on the provided timezone offset
  const offsetInMinutes = (-parseInt(originalTimezoneOffset) / 100) * 60;

  // Apply the timezone offset to the timestamp
  const convertedTimestamp = new Date(
    originalTimestamp.getTime() + offsetInMinutes * 60000
  );

  // Format the converted timestamp in ISO 8601 with timezone offset
  const iso8601Timestamp = convertedTimestamp.toISOString();

  return (
    <div>
      <h2>Order Details</h2>
      <p>Original Timestamp: {originalTime}</p>
      <p>Converted Timestamp: {iso8601Timestamp}</p>
      <LocalTimeToISO8601 org_time={originalTime} />
    </div>
  );
};

export default OrderDetails;
