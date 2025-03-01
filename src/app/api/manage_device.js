export async function get_room_devices(room_devices_url, room_id) {
  if (room_id === "") return { message: "กรุณาลองใหม่อีกครั้ง" };
  const full_url = `${room_devices_url}/get/roomDevice?roomID=${room_id}`;

  const response = fetch(full_url)
    .then((res) => res.json())
    .catch((error) => {
      console.log("Error fetching data: ", error);
    });
  return response;
}

export async function get_unassigned_devices(
  get_unassigned_devices_url,
  user_id
) {
  if (user_id === "") return { message: "กรุณาลองใหม่อีกครั้ง" };
  const full_url = `${get_unassigned_devices_url}/get/unassigned_devices?user_id=${user_id}`;

  const response = fetch(full_url)
    .then((res) => res.json())
    .catch((error) => {
      console.log("Error fetching data: ", error);
    });
  return response;
}

export async function add_new_device(
  add_new_device_url,
  room_id,
  device_name,
  is_sensor,
  is_outside,
  device_type
) {
  if (room_id === -1 || device_name === "" || is_sensor === null)
    return { message: "กรุณาลองใหม่อีกครั้ง" };
  const full_url = `${add_new_device_url}/post/add_room_device`;
  // console.log(full_url);

  try {
    const response = await fetch(full_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roomID: room_id,
        deviceName: device_name,
        isSensor: is_sensor,
        isOutside: is_outside,
        deviceType: device_type,
      }),
    });

    const text = await response.text();

    if (!response.ok) {
      console.log(text);
      return { message: text };
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    console.log(text);
    return { message: text };

    // const data = await response.json();
    // console.log(data);
  } catch (error) {
    console.error("Error:", error);
    return { message: String(error) };
  }
}

export async function add_new_sensor_device(
  add_new_device_url,
  room_id,
  device_name,
  is_outside
) {
  if (room_id === -1 || device_name === "")
    return { message: "กรุณาลองใหม่อีกครั้ง" };
  const full_url = `${add_new_device_url}/post/add_room_device`;
  // console.log(full_url);

  try {
    const response = await fetch(full_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roomID: room_id,
        deviceName: device_name,
        isSensor: 1,
        isOutside: is_outside,
        deviceType: "Sensor",
      }),
    });

    const text = await response.text();

    if (!response.ok) {
      console.log(text);
      return { message: text };
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    console.log(text);
    return { message: text };

    // const data = await response.json();
    // console.log(data);
  } catch (error) {
    console.error("Error:", error);
    return { message: String(error) };
  }
}

export async function add_new_elctrical_device(
  add_new_device_url,
  room_id,
  device_name,
  device_type
) {
  if (room_id === -1 || device_name === "")
    return { message: "กรุณาลองใหม่อีกครั้ง" };
  const full_url = `${add_new_device_url}/post/add_room_device`;
  // console.log(full_url);

  try {
    const response = await fetch(full_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roomID: room_id,
        deviceName: device_name,
        isSensor: 0,
        isOutside: 0,
        deviceType: device_type,
      }),
    });

    const text = await response.text();

    if (!response.ok) {
      console.log(text);
      return { message: text };
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    console.log(text);
    return { message: text };

    // const data = await response.json();
    // console.log(data);
  } catch (error) {
    console.error("Error:", error);
    return { message: String(error) };
  }
}

export async function update_device_status(
  update_device_status_url,
  device_id,
  device_status
) {
  if (device_id === "" || device_status === null)
    return { message: "กรุณาลองใหม่อีกครั้ง" };
  const full_url = `${update_device_status_url}/put/update_device_status`;

  try {
    const response = await fetch(full_url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        deviceID: device_id,
        deviceStatus: device_status,
      }),
    });

    const text = await response.text();

    if (!response.ok) {
      return { message: text };
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return { message: text };
  } catch (error) {
    return { message: String(error) };
    console.error("Error:", error);
  }
}

export async function place_unassigned_device(
  place_unassigned_device_url,
  device_id,
  room_id
) {
  // console.log(`device_id= ${device_id} , room_id= ${room_id}`);
  if (device_id === "" || room_id === "")
    return { message: "กรุณาลองใหม่อีกครั้ง" };
  const full_url = `${place_unassigned_device_url}/put/update_unassigned_device`;

  try {
    const response = await fetch(full_url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        deviceID: device_id,
        room_id: room_id,
      }),
    });

    const text = await response.text();

    if (!response.ok) {
      return { message: text };
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return { message: text };
  } catch (error) {
    return { message: String(error) };
    console.error("Error:", error);
  }
}

export async function rename_device(
  rename_device_url,
  device_id,
  new_device_name
) {
  if (device_id === "" || new_device_name === "")
    return { message: "กรุณาลองใหม่อีกครั้ง" };
  const full_url = `${rename_device_url}/put/rename_device`;

  try {
    const response = await fetch(full_url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        deviceID: device_id,
        deviceName: new_device_name,
      }),
    });

    const text = await response.text();

    if (!response.ok) {
      return { message: text };
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return { message: text };
  } catch (error) {
    return { message: String(error) };
    console.error("Error:", error);
  }
}
