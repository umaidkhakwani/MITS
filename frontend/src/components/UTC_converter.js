

function convertToUTC(timestamp) {
    const originalTime = new Date(timestamp);
    const utcTime = new Date(
      originalTime.getTime() - originalTime.getTimezoneOffset() * 60000
    );
    const value = utcTime.toISOString().toString()
    // console.log("value ", value)
    // return utcTime.toISOString();
    return value;
  }

export default convertToUTC;
