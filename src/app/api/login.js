export async function fetchAPI(login_url, username, password) {
  const full_login_url =
    login_url + "username=" + username + "&password=" + password;
  console.log(full_login_url);
  const response = fetch(full_login_url)
    .then((res) => res.json())
    .catch((error) => {
      console.log("Error fetching data: ", error);
    });
  return response;
}

// fetchAPI("http://3.25.192.169:3000/get/login?", "eiei", "123");
