export async function create_new_room(add_room_url, home_id, room_name) {
  if (home_id === "" || room_name === "")
    return { message: "กรุณาลองใหม่อีกครั้ง" };
  const full_url = `${add_room_url}/post/add_room`;
  // console.log(full_url);

  try {
    const response = await fetch(full_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        home_ID: home_id,
        room_name: room_name,
      }),
    });

    const text = await response.text();

    if (!response.ok) {
      console.log(text);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    console.log(text);

    // const data = await response.json();
    // console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function delete_room(delete_room_url, room_id) {
  if (room_id === "") return { message: "กรุณาลองใหม่อีกครั้ง" };
  const full_url = `${delete_room_url}/delete/delete_rooms?room_id=${room_id}`;

  try {
    const response = await fetch(full_url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Deleted:", data);
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function rename_room(rename_room_url, room_id, new_room_name) {
  if (room_id === "" || new_room_name === "")
    return { message: "กรุณาลองใหม่อีกครั้ง" };
  const full_url = `${rename_room_url}/put/rename_room`;

  try {
    const response = await fetch(full_url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        room_id: room_id,
        room_name: new_room_name,
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

export async function get_roomlist(get_roomlist_url, homeid) {
  if (homeid === "") return { message: "กรุณาลองใหม่อีกครั้ง" };
  const full_roomlist_url = `${get_roomlist_url}/get/roomList?homeID=${homeid}`;

  // const full_login_url = get_homelist_url + "userID=" + userid;
  // console.log(full_login_url);
  const response = fetch(full_roomlist_url)
    .then((res) => res.json())
    .catch((error) => {
      console.log("Error fetching data: ", error);
    });
  return response;
}

export async function update_room_setting(
  update_room_setting_url,
  room_id,
  update_by,
  diffPressure_threshold,
  temperature_threshold,
  humidity_threshold,
  pm25_threshold,
  co2_threshold,
  auto_control_enabled
) {
  if (room_id === "" || update_by === "")
    return { message: "กรุณาลองใหม่อีกครั้ง" };
  const full_url = `${update_room_setting_url}/put/update_room_setting`;

  try {
    const response = await fetch(full_url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        room_id: room_id,
        update_by: update_by,
        diffPressure_threshold: diffPressure_threshold,
        temperature_threshold: temperature_threshold,
        humidity_threshold: humidity_threshold,
        pm25_threshold: pm25_threshold,
        co2_threshold: co2_threshold,
        auto_control_enabled: auto_control_enabled,
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
