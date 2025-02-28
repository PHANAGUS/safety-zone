async function get_room_sensor(room_sensor_url, room_id) {
  if (room_id === "") return { message: "กรุณาลองใหม่อีกครั้ง" };
  const full_url = `${room_sensor_url}/get/roomSensor?roomID=${room_id}`;
  // console.log(full_url);

  const response = fetch(full_url)
    .then((res) => res.json())
    .catch((error) => {
      console.log("Error fetching data: ", error);
    });

  return response;
}

async function get_room_sensor_diff_pres(room_sensor_url, room_id) {
  if (room_id === "") return { message: "กรุณาลองใหม่อีกครั้ง" };
  const full_url = `${room_sensor_url}/get/roomSensorWithDiffPressure?roomID=${room_id}`;
  // console.log(full_url);

  const response = fetch(full_url)
    .then((res) => res.json())
    .catch((error) => {
      console.log("Error fetching data: ", error);
    });

  return response;
}

export async function getLatestRecord(room_sensor_url, room_id) {
  const response = await get_room_sensor(room_sensor_url, room_id);

  let all_records;
  try {
    all_records = response.data;
    if (!all_records) {
      throw new Error("Data is undefined or invalid");
    }

    const latest_record = response.data[response.data.length - 1];
    return latest_record;
  } catch (err) {
    return null;
  }
}

export async function getDateRangeRecords(
  room_sensor_url,
  room_id,
  daysEarlier
) {
  const normal_response = await get_room_sensor(room_sensor_url, room_id);
  const diff_response = await get_room_sensor_diff_pres(
    room_sensor_url,
    room_id
  );

  let outside_records;
  let inroom_records;
  let diff_records;
  try {
    outside_records = normal_response.data.filter((x) => x.isOutside == 1);
    inroom_records = normal_response.data.filter((x) => x.isOutside == 0);
    diff_records = diff_response.data;
    if (!outside_records || !inroom_records || !diff_records) {
      throw new Error("Data is undefined or invalid");
    }

    const today = new Date();
    const start_time = new Date(today.setDate(today.getDate() - daysEarlier));
    const end_time = new Date();

    const outside_records_filtered = outside_records.filter((x) => {
      const date = new Date(x.recorded_at);
      return date >= start_time && date <= end_time;
    });

    const inroom_records_filtered = inroom_records.filter((x) => {
      const date = new Date(x.recorded_at);
      return date >= start_time && date <= end_time;
    });

    const diff_records_filtered = diff_records.filter((x) => {
      const date = new Date(x.recorded_at);
      return date >= start_time && date <= end_time;
    });
    // console.log(outside_records_filtered);

    return {
      outside_records: outside_records_filtered,
      inroom_records: inroom_records_filtered,
      diff_records: diff_records_filtered,
    };
  } catch (err) {
    return {
      outside_records: [
        {
          recorded_at: "2025-01-01T00:00:00.000Z",
          pm25: 10,
          co2: 400,
          pressure: 1012,
          temperature: 25,
          humidity: 60,
          device_id: 0,
          isOutside: 1,
        },
      ],
      inroom_records: [
        {
          recorded_at: "2025-01-01T00:00:00.000Z",
          pm25: 10,
          co2: 400,
          pressure: 1012,
          temperature: 25,
          humidity: 60,
          device_id: 0,
          isOutside: 0,
        },
      ],
      diff_records: [
        {
          recorded_at: "2025-01-01T00:00:00.000Z",
          pm25: 10,
          co2: 400,
          diifPressure: 1012,
          temperature: 25,
          humidity: 60,
          device_id: 0,
        },
      ],
    };
  }
}

// const test = async () => {
//   const normal_response = await get_room_sensor("http://3.25.192.169:3000", 22);
//   const diff_response = await get_room_sensor_diff_pres(
//     "http://3.25.192.169:3000",
//     22
//   );

//   const outside_records = normal_response.data.filter((x) => x.isOutside == 1);
//   const inroom_records = normal_response.data.filter((x) => x.isOutside == 0);
//   const diff_records = diff_response.data;

//   console.log(outside_records[outside_records.length - 1].recorded_at);
//   console.log(inroom_records[inroom_records.length - 1].recorded_at);
//   console.log(diff_records[diff_records.length - 1].recorded_at);
// };

// test();
