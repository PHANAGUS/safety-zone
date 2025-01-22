const url = process.env.REACT_APP_DATA_URL;

async function fetchAPI() {
  const response = fetch(url)
    .then((res) => res.json())
    .catch((error) => {
      console.log("Error fetching data: ", error);
    });
  return response;
}

export async function getLatestRecord() {
  const response = await fetchAPI();
  const latest_record =
    response.formattedData[response.formattedData.length - 1];
  // console.log(new Date(latest_record.timestamp).getHours());
  return latest_record;
}

export async function getDateRangeRecords(daysEarlier) {
  const response = await fetchAPI();
  // const all_records = response.formattedData;
  let all_records;
  try {
    all_records = response.formattedData;
    if (!all_records) {
      throw new Error("Data is undefined or invalid");
    }

    const today = new Date();
    const start_time = new Date(today.setDate(today.getDate() - daysEarlier));
    const end_time = new Date();

    const filtered_records = all_records.filter((x) => {
      const date = new Date(x.timestamp);
      return date >= start_time && date <= end_time;
    });

    return filtered_records;
  } catch (err) {
    return null;
  }
}
