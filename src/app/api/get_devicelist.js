export async function get_room_devices(room_devices_url, room_id) {
  if (room_id === "") return { message: "กรุณาลองใหม่อีกครั้ง" };
  const full_room_sensor_url = `${room_devices_url}/get/roomDevice?roomID=${room_id}`;
  //   console.log(full_room_sensor_url);

  const response = fetch(full_room_sensor_url)
    .then((res) => res.json())
    .catch((error) => {
      console.log("Error fetching data: ", error);
    });
  //   console.log(response);
  return response;
}

// console.log(await get_room_devices("http://3.25.192.169:3000", 2));
