export async function get_homelist(get_homelist_url, userid) {
  const full_login_url = get_homelist_url + "userID=" + userid;
  console.log(full_login_url);
  const response = fetch(full_login_url)
    .then((res) => res.json())
    .catch((error) => {
      console.log("Error fetching data: ", error);
    });
  return response;
}
