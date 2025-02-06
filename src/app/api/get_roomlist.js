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
