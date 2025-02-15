export async function create_new_user(
  create_user_url,
  firstname,
  lastname,
  username,
  password
) {
  if (firstname === "" || lastname === "" || username === "" || password === "")
    return { message: "กรุณากรอกข้อมูลให้ครบ เพื่อดำเนินการต่อ" };
  const full_url = `${create_user_url}/post/create_user`;
  // console.log(full_url);

  try {
    const response = await fetch(full_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        first_name: firstname,
        last_name: lastname,
      }),
    });

    const text = await response.text(); // อ่านค่าข้อมูลดิบก่อน
    // console.log("Raw Response:", text);

    // let data;
    // try {
    //   data = JSON.parse(text); // แปลงเป็น JSON ถ้าเป็นไปได้
    // } catch (error) {
    //   setErrorMessage("Unexpected response format");
    //   return;
    // }

    if (!response.ok) {
      return { message: text };
      throw new Error(`HTTP error! Status: ${response.status}`);
      //   setErrorMessage(data.message || "Registration failed");
      //   return;
    }
    return { message: text };
    alert("User registered successfully!");
  } catch (error) {
    return { message: String(error) };
    console.error(error);
  }
}

async function test() {
  //   console.log(
  await create_new_user(
    "http://3.25.192.169:3000",
    "pnr",
    "ksr",
    "focus",
    "12345"
  );
  //   );
}

test();
