const url = process.env.REACT_APP_DATA_URL;

async function fetchAPI() {
  const response = fetch(url)
    .then((res) => res.json())
    .catch((error) => {
      console.log("Error fetching data: ", error);
    });
  return response;
}

async function getDate() {
  const response = await fetchAPI();

  const all_records = response.formattedData;
  // console.log(all_records);

  const all_timestamps = all_records.map((x) =>
    new Date(x.timestamp).toLocaleString("th-TH", {
      timeZone: "Asia/Bangkok",
    })
  );
  console.log(all_timestamps);
  // console.log(typeof all_timestamps[0]);

  // const all_timestamps = all_records.map((x) =>
  //   new Date(x.timestamp).toLocaleString("th-TH", {
  //     timeZone: "Asia/Bangkok",
  //   })
  // );
  // console.log(all_timestamps);
  // console.log(typeof all_timestamps[0]);

  // const th_time = "2024-12-27T14:53:39+07:00";
  // const th_todate = new Date(th_time);
  // console.log(th_todate);
  // console.log(typeof th_todate);

  // const today = new Date();
  // const start_time = new Date(today.setDate(today.getDate() - 30));
  // const end_time = new Date();

  // console.log(start_time + " ถึง " + end_time);

  // const filtered_records = all_records.filter((x) => {
  //   const date = new Date(x.timestamp);
  //   return date >= start_time && date <= end_time;
  // });

  // console.log("records ที่อยู่ในช่วง: ", filtered_records);

  //   const th_time = all_timestamps.map((x) =>
  //     x.toLocaleString("th-TH", {
  //       timeZone: "Asia/Bangkok",
  //     })
  //   );
  //   console.log(th_time);

  //   const latest_record = all_records[all_records.length - 1];
  //   console.log(latest_record.timestamp);
  //   console.log(typeof latest_record.timestamp);

  //   console.log(typeof all_records);
  //   return latest_record;
}

getDate();
