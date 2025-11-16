import SidechatAPIClient from "./src/classes/SidechatAPIClient.js";

const api = new SidechatAPIClient();

async function login() {
  const phoneNumber = "YOUR_PHONE_HERE";

  console.log("Sending SMS...");
  await api.loginViaSMS(phoneNumber);

  console.log("Enter the code you got in the SMS and rerun this file with it.\n");
}

login();
