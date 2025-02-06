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
