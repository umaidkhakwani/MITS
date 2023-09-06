import React, { useState, useEffect } from "react";
import convertToUTC from "./UTC_converter";

function LocalTimeToISO8601(props) {
  const [localTimestamp, setLocalTimestamp] = useState("");
  const [localTimestamp2, setLocalTimestamp2] = useState("");

  const originalTime = props.org_time;


//   function convertToUTC(timestamp) {
//     const originalTime = new Date(timestamp);
//     const utcTime = new Date(
//       originalTime.getTime() - originalTime.getTimezoneOffset() * 60000
//     );
//     const value = utcTime.toISOString().toString()
//     console.log("value ", value)
//     // return utcTime.toISOString();
//     return value;
//   }

//   const handle_ftn = () => {
//     const utcTimestamp1 = convertToUTC(originalTime);
//     const utcTimestamp2 = convertToUTC(localTimestamp);

//     // Display the UTC timestamps
//     console.log("UTC Timestamp 1:", utcTimestamp1);
//     console.log("UTC Timestamp 2:", utcTimestamp2);
//   };

  useEffect(() => {
    // Get the current local time
    const currentLocalTime = new Date();
    setLocalTimestamp2(`showing :: ${currentLocalTime}`);

    // Get the timezone offset in minutes
    const timezoneOffsetMinutes = currentLocalTime.getTimezoneOffset();

    // Convert local time to ISO 8601 format with timezone offset (excluding milliseconds)
    const iso8601Timestamp = currentLocalTime.toISOString().split(".")[0];

    // Create the timezone offset string (+/-HH:mm)
    const timezoneOffsetHours = Math.abs(
      Math.floor(timezoneOffsetMinutes / 60)
    );
    const timezoneOffsetMinutesPart = String(
      Math.abs(timezoneOffsetMinutes % 60)
    ).padStart(2, "0");
    const timezoneOffsetString = `${
      timezoneOffsetMinutes >= 0 ? "-" : "+"
    }${timezoneOffsetHours}:${timezoneOffsetMinutesPart}`;

    // Combine the timestamp and timezone offset
    const timestampWithOffset = `${iso8601Timestamp}${timezoneOffsetString}`;

    // Set the local timestamp in state
    setLocalTimestamp(timestampWithOffset);
    console.log("timestampWithOffset  ", timestampWithOffset)

    const utcTimestamp1 = convertToUTC(originalTime);
    const utcTimestamp2 = convertToUTC(currentLocalTime);

    // Display the UTC timestamps
    console.log("UTC Timestamp 1:", utcTimestamp1);
    // console.log("UTC Timestamp 2:", originalTime);
    console.log("UTC Timestamp 2:", utcTimestamp2);

  }, []);

  return (
    <div>
      {/* <h2>Local Time in ISO 8601 Format (without milliseconds)</h2> */}
      <p>{localTimestamp}</p>
      <p>{localTimestamp2}</p>
    </div>
  );
}

export default LocalTimeToISO8601;
