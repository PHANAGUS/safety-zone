async function fetchAPI(room_sensor_url, room_id) {
  if (room_id === "") return { message: "กรุณาลองใหม่อีกครั้ง" };
  const full_room_sensor_url = `${room_sensor_url}/get/roomSensor?roomID=${room_id}`;
  // console.log(full_room_sensor_url);

  const response = fetch(full_room_sensor_url)
    .then((res) => res.json())
    .catch((error) => {
      console.log("Error fetching data: ", error);
    });
  return response;
}

// export async function getLatestRecord() {
//   const response = await fetchAPI();
//   const latest_record =
//     response.formattedData[response.formattedData.length - 1];
//   // console.log(new Date(latest_record.timestamp).getHours());
//   return latest_record;
// }

export async function getDateRangeRecords(
  room_sensor_url,
  room_id,
  daysEarlier
) {
  const response = await fetchAPI(room_sensor_url, room_id);
  // const all_records = response.formattedData;
  let all_records;
  try {
    all_records = response.data;
    if (!all_records) {
      throw new Error("Data is undefined or invalid");
    }

    const today = new Date();
    const start_time = new Date(today.setDate(today.getDate() - daysEarlier));
    const end_time = new Date();

    const filtered_records = all_records.filter((x) => {
      const date = new Date(x.recorded_at);
      return date >= start_time && date <= end_time;
    });
    console.log(filtered_records);

    return filtered_records;
  } catch (err) {
    return null;
  }
}
