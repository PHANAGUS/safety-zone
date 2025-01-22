const url = process.env.REACT_APP_DATA_URL;

export async function fetchAPI() {
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
  //   console.log(latest_record);
  return latest_record;
}

// getLatestRecord();
