export async function create_new_home(
  add_home_url,
  creator_user_id,
  home_name
) {
  if (creator_user_id === "" || home_name === "")
    return { message: "กรุณาลองใหม่อีกครั้ง" };
  const full_url = `${add_home_url}/post/add_home`;
  // console.log(full_url);

  try {
    const response = await fetch(full_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        add_by_user_id: creator_user_id,
        home_name: home_name,
      }),
    });

    const text = await response.text();

    if (!response.ok) {
      console.log(text);
      return { message: text };
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    console.log(text);
  } catch (error) {
    return { message: String(error) };
    console.error("Error:", error);
  }
}

export async function delete_home(delete_home_url, home_id) {
  if (room_id === "") return { message: "กรุณาลองใหม่อีกครั้ง" };
  const full_url = `${delete_home_url}/delete/delete_homes?home_id=${home_id}`;

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

export async function get_homelist(get_homelist_url, userid) {
  if (userid === "") return { message: "กรุณากรอกชื่อผู้ใช้งานและรหัสผ่าน" };
  const full_homelist_url = `${get_homelist_url}/get/homelist?userID=${userid}`;

  // const full_login_url = get_homelist_url + "userID=" + userid;
  // console.log(full_login_url);
  const response = fetch(full_homelist_url)
    .then((res) => res.json())
    .catch((error) => {
      console.log("Error fetching data: ", error);
    });
  return response;
}

export async function add_user_to_home(
  add_user_to_home_url,
  invited_user_id,
  home_id
) {
  if (invited_user_id === "" || home_id === "")
    return { message: "กรุณาลองใหม่อีกครั้ง" };
  const full_url = `${add_user_to_home_url}/post/add_user_home`;
  // console.log(full_url);

  try {
    const response = await fetch(full_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: invited_user_id,
        home_id: home_id,
      }),
    });

    const text = await response.text();

    if (!response.ok) {
      console.log(text);
      return { message: text };
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    console.log(text);
  } catch (error) {
    return { message: String(error) };
    console.error("Error:", error);
  }
}
