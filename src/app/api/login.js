export async function fetchLoginData(loginUrl, username, password) {
  // console.log(loginUrl)
  if(username === "" || password === "") return { message: "กรุณากรอกชื่อผู้ใช้งานและรหัสผ่าน" };
  const fullUrl = `${loginUrl}/get/login?username=${username}&password=${password}`;
  const response = fetch(fullUrl)
    .then((res) => res.json())
    .catch((error) => {
      console.error("Error fetching login data:", error);
    });
  return response;
}

// fetchAPI("http://3.25.192.169:3000/get/login?", "eiei", "123");
